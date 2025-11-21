import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Typography, Grid, Box, Container, Grow, Slide, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, FormHelperText, Alert,
  Chip, Divider, LinearProgress
} from '@mui/material';
import { Event, ArrowForward, CalendarToday, LocationOn, People, CheckCircle, X } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';

// Custom components
import { Card, Button, Badge } from '../../components/ui';

// User context
import { UserContext } from '../../contexts/UserContext';

function GenericSection({ 
  title, 
  subtitle, 
  fetchItems, 
  createRegistration, 
  getMyRegistrations,
  itemType = 'item', // 'exhibition' or 'event'
  registrationIdField = 'exhibition_id' // 'exhibition_id' or 'event_id'
}) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [submittingRegistration, setSubmittingRegistration] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogError, setDialogError] = useState('');
  const [registrationData, setRegistrationData] = useState({
    special_requirements: '',
    spots_requested: 1,
    attendees: [{ name: '', cnic: '', age: '' }]
  });
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user, loading: contextLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch data when context finishes loading
  useEffect(() => {  
    if (contextLoading) return; 
    
    try {
      fetchData();
      fetchMyRegistrations();
    } catch(error) {
      console.log(`Error while fetching ${itemType}s data`, error);
    }
  }, [contextLoading]); 

  const fetchData = async () => {
    try {
      const itemsData = await fetchItems();
      // Transform backend data to match frontend structure
      const transformedData = itemsData.map((item, index) => {
        const startDate = item.start_date ? new Date(item.start_date) : null;
        const endDate = item.end_date ? new Date(item.end_date) : null;
        const dates = startDate && endDate 
          ? `${startDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} – ${endDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}`
          : '';

        return {
          ...item, // Keep all original data
          id: item._id || index + 1,
          title: item.title || `Untitled ${itemType}`,
          type: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : itemType,
          dates: dates || 'Dates TBD',
          status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown',
          statusColor: item.status === 'upcoming' ? 'info' : item.is_featured ? 'success' : 'default',
          image: item.exhibitionImage.url || item.exhibitionImage.url  || 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
          description: item.description || (item.category ? `Explore the ${item.category} ${itemType}${item.curator_id?.username ? ` curated by ${item.curator_id.username}` : ''}.` : 'No description available.'),
        };
      });
      setItems(transformedData);
    } catch (error) {
      console.error(`Error fetching ${itemType}s:`, error);
      if (error.response?.status === 401) {
        setAlert({
          show: true,
          message: `Please log in to view ${itemType}s`,
          severity: 'warning'
        });
      }
    }
  };

  const fetchMyRegistrations = async () => {
    if (!user) return;
    try {
      const registrations = await getMyRegistrations(user.token);
      setMyRegistrations(registrations);
    } catch (error) {
      console.error('Error fetching my registrations:', error);
      if (error.response?.status === 401) {
        setAlert({
          show: true,
          message: 'Please log in to view your registrations',
          severity: 'warning'
        });
      }
    }
  };

  const handleLearnMore = (item) => {
    setSelectedItem(item);
    setOpenDetailsDialog(true);
  };

  const handleRegisterClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Check if already registered
    const existingRegistration = myRegistrations.find(
      reg => reg[registrationIdField]._id === selectedItem._id || reg[registrationIdField] === selectedItem._id
    );

    if (existingRegistration) {
      setAlert({
        show: true,
        message: `You are already registered for this ${itemType}`,
        severity: 'warning'
      });
      return;
    }

    // Check capacity for default 1 spot
    if (selectedItem.max_capacity && selectedItem.current_bookings >= selectedItem.max_capacity) {
      setAlert({
        show: true,
        message: `This ${itemType} is fully booked`,
        severity: 'error'
      });
      return;
    }

    setOpenDetailsDialog(false);
    setOpenRegistrationDialog(true);
    setRegistrationData({ 
      special_requirements: '',
      spots_requested: 1,
      attendees: [{ name: '', cnic: '', age: '' }]
    });
    setErrors({});
  };

  const handleRegistrationSubmit = async () => {
    if (!validateRegistrationForm()) {
      return;
    }

    setSubmittingRegistration(true);
    setErrors({});

    try {
      // Double-check on frontend before submitting
      const existingRegistration = myRegistrations.find(
        reg => reg[registrationIdField]._id === selectedItem._id || reg[registrationIdField] === selectedItem._id
      );

      if (existingRegistration) {
        setAlert({
          show: true,
          message: `You are already registered for this ${itemType}`,
          severity: 'warning'
        });
        setSubmittingRegistration(false);
        return;
      }

      // Check capacity for requested spots
      const availableSpots = getAvailableSpots(selectedItem);
      if (availableSpots && registrationData.spots_requested > availableSpots) {
        setAlert({
          show: true,
          message: `Only ${availableSpots} spots available, you requested ${registrationData.spots_requested}`,
          severity: 'error'
        });
        setSubmittingRegistration(false);
        return;
      }

      const registrationPayload = {
        [registrationIdField]: selectedItem._id,
        spots_requested: registrationData.spots_requested,
        attendees: registrationData.attendees,
        special_requirements: registrationData.special_requirements || undefined
      };

      const result = await createRegistration(registrationPayload, user.token);
      
      const totalAmount = (selectedItem.entry_fee || 0) * registrationData.spots_requested;
      
      setAlert({
        show: true,
        message: `Successfully registered ${registrationData.spots_requested} spot(s)!${totalAmount > 0 ? ` Total amount: ${totalAmount}` : ''}`,
        severity: 'success'
      });
      
      setOpenRegistrationDialog(false);
      await fetchMyRegistrations(); // Refresh registrations
      await fetchData(); // Refresh items to update current bookings
      
    } catch (error) {
      console.error('Registration error:', error);
       const backendMsg = error.response?.data?.message;

      // Save error for dialog
      setDialogError(backendMsg || 'Registration failed. Please try again.');
    } finally {
      setSubmittingRegistration(false);
    }
  };

  const handleSpotsChange = (newSpots) => {
    const spots = Math.max(1, Math.min(10, parseInt(newSpots) || 1));
    
    // Check if enough spots are available
    const availableSpots = getAvailableSpots(selectedItem);
    if (availableSpots && spots > availableSpots) {
      setAlert({
        show: true,
        message: `Only ${availableSpots} spots available`,
        severity: 'warning'
      });
      return;
    }

    // Create attendee array based on spots
    const currentAttendees = registrationData.attendees || [];
    let newAttendees = [...currentAttendees];

    if (spots > currentAttendees.length) {
      // Add new empty attendee objects
      const attendeesToAdd = spots - currentAttendees.length;
      for (let i = 0; i < attendeesToAdd; i++) {
        newAttendees.push({ name: '', cnic: '', age: '' });
      }
    } else if (spots < currentAttendees.length) {
      // Remove excess attendees
      newAttendees = newAttendees.slice(0, spots);
    }

    setRegistrationData({
      ...registrationData,
      spots_requested: spots,
      attendees: newAttendees
    });
  };

  const handleAttendeeChange = (index, field, value) => {
    const newAttendees = [...registrationData.attendees];
    newAttendees[index] = {
      ...newAttendees[index],
      [field]: value
    };
    
    setRegistrationData({
      ...registrationData,
      attendees: newAttendees
    });

    // Clear specific errors when user starts typing
    if (errors[`attendee_${index}_${field}`]) {
      setErrors({
        ...errors,
        [`attendee_${index}_${field}`]: ''
      });
    }
  };

  const validateRegistrationForm = () => {
    const newErrors = {};
    
    // Validate spots
    if (!registrationData.spots_requested || registrationData.spots_requested < 1) {
      newErrors.spots_requested = 'At least 1 spot is required';
    }

    // Check age restriction
    const minAge = selectedItem.age_restriction ? parseInt(selectedItem.age_restriction) : 0;
    
    // Validate each attendee
    registrationData.attendees.forEach((attendee, index) => {
      if (!attendee.name.trim()) {
        newErrors[`attendee_${index}_name`] = 'Name is required';
      }
      
      if (!attendee.cnic.trim()) {
        newErrors[`attendee_${index}_cnic`] = 'CNIC is required';
      } else if (!/^\d{5}-\d{7}-\d{1}$/.test(attendee.cnic)) {
        newErrors[`attendee_${index}_cnic`] = 'Invalid CNIC format (use: 12345-1234567-1)';
      }
      
      if (!attendee.age || attendee.age < 1) {
        newErrors[`attendee_${index}_age`] = 'Valid age is required';
      } else if (minAge && attendee.age < minAge) {
        newErrors[`attendee_${index}_age`] = `Age must be at least ${minAge} years`;
      } else if (attendee.age > 120) {
        newErrors[`attendee_${index}_age`] = 'Age must not exceed 120 years';
      }
    });

    // Check for duplicate CNICs
    const cnics = registrationData.attendees.map(a => a.cnic).filter(c => c.trim());
    const duplicates = cnics.filter((cnic, index) => cnics.indexOf(cnic) !== index);
    if (duplicates.length > 0) {
      duplicates.forEach(cnic => {
        registrationData.attendees.forEach((attendee, index) => {
          if (attendee.cnic === cnic) {
            newErrors[`attendee_${index}_cnic`] = 'Duplicate CNIC found';
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFullyBooked = (item) => {
    return item.max_capacity && item.current_bookings >= item.max_capacity;
  };

  const isRegistered = (itemId) => {
    return myRegistrations.some(
      reg => reg[registrationIdField]._id === itemId || reg[registrationIdField] === itemId
    );
  };

  const getAvailableSpots = (item) => {
    if (!item || item.max_capacity == null) return null;
    return item.max_capacity - (item.current_bookings || 0);
  };

  // Show loading state while context is initializing
  if (contextLoading) {
    return (
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Loading {itemType}s...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 } }}>
      {alert.show && (
        <Alert 
          severity={alert.severity} 
          onClose={() => setAlert({ show: false })}
          sx={{ mb: 3 }}
        >
          {alert.message}
        </Alert>
      )}

      <Slide direction="up" in={true} timeout={800}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            {subtitle}
          </Typography>
        </Box>
      </Slide>

      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Grow in={true} timeout={1200 + index * 100}>
              <Card
                image={item.image}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {/* Status Badge */}
                {item.status && item.status !== 'Unknown' && (
                  <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                    <Badge
                      label={item.status}
                      color={item.statusColor}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.background,
                        backdropFilter: 'blur(4px)',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                )}

                {/* Registration Status Badge */}
                {isRegistered(item._id) && (
                  <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                    <Chip
                      label="Registered"
                      icon={<CheckCircle sx={{ fontSize: 16 }} />}
                      size="small"
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                )}

                {/* Fully Booked Badge */}
                {isFullyBooked(item) && (
                  <Box sx={{ position: 'absolute', top: isRegistered(item._id) ? 56 : 16, left: 16, zIndex: 2 }}>
                    <Chip
                      label="Fully Booked"
                      size="small"
                      color="error"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                )}

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  {item.type && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Event sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                      <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                        {item.type.toUpperCase()}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                    {item.title}
                  </Typography>

                  {item.dates && item.dates !== 'Dates TBD' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                      {item.dates}
                    </Typography>
                  )}

                  {item.description && item.description !== 'No description available.' && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3, //show only 3 lines for description
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description}
                    </Typography>
                  )}

                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    endIcon={<ArrowForward />}
                    sx={{ mt: 1 }}
                    onClick={() => handleLearnMore(item)}
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Details Dialog */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={() => setOpenDetailsDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundImage: selectedItem?.image ? `url(${selectedItem.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        }}
      >
        {selectedItem && (
          <>
            <Box 
              sx={{ 
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                color: 'white',
                p: 3
              }}
            >
              <DialogTitle sx={{ p: 0, color: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {selectedItem.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={selectedItem.type} size="small" />
                      <Chip 
                        label={selectedItem.status} 
                        size="small" 
                        color={selectedItem.statusColor}
                      />
                      {isRegistered(selectedItem._id) && (
                        <Chip
                          label="You're Registered"
                          icon={<CheckCircle sx={{ fontSize: 16 }} />}
                          size="small"
                          color="success"
                        />
                      )}
                      {isFullyBooked(selectedItem) && (
                        <Chip
                          label="Fully Booked"
                          size="small"
                          color="error"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </DialogTitle>
              
              <DialogContent sx={{ p: 0, color: 'white' }}>
                <Grid container spacing={3}>
                  <Grid size={{xs:12, md:8}}>
                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {selectedItem.description}
                    </Typography>
                  </Grid>
                  
                  <Grid size={{xs:12, md:4}}>
                    <Box sx={{ space: 2 }}>
                      {selectedItem.dates && selectedItem.dates !== 'Dates TBD' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{selectedItem.dates}</Typography>
                        </Box>
                      )}
                      
                      {selectedItem.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{selectedItem.location}</Typography>
                        </Box>
                      )}
                      
                      {selectedItem.max_capacity && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <People sx={{ mr: 1, fontSize: 20 }} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2">
                              {getAvailableSpots(selectedItem)} of {selectedItem.max_capacity} spots available
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(selectedItem.current_bookings / selectedItem.max_capacity) * 100}
                              sx={{
                                mt: 1,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getAvailableSpots(selectedItem) > 0 ? '#4caf50' : '#f44336'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      )}

                      {selectedItem.entry_fee && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Entry Fee: Rs. {selectedItem.entry_fee}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              
              <DialogActions sx={{ p: 0, pt: 3 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setOpenDetailsDialog(false)}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleRegisterClick();
                  }}
                  disabled={user && (isRegistered(selectedItem._id) || isFullyBooked(selectedItem))}
                  sx={{ 
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' }
                  }}
                >
                  {!user
                    ? 'Login to Register'
                    : isRegistered(selectedItem._id)
                      ? 'Already Registered'
                      : isFullyBooked(selectedItem)
                        ? 'Fully Booked'
                        : 'Register Now'}
                </Button>

              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>

      {/* Registration Dialog */}
      <Dialog 
        open={openRegistrationDialog} 
        onClose={() => setOpenRegistrationDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { maxHeight: '90vh' }
        }}
      >
        <DialogTitle>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Register for {itemType}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {selectedItem?.title}
            </Typography>
            {selectedItem?.age_restriction && (
              <Chip 
                label={`Minimum age: ${selectedItem.age_restriction} years`}
                size="small" 
                color="info" 
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ py: 2 }}>
          <Grid container spacing={3}>
            {/* Spots Selection */}
            <Grid size={{xs:12, md:4}}>
              <TextField
                fullWidth
                label="Number of Spots"
                type="number"
                value={registrationData.spots_requested}
                onChange={(e) => handleSpotsChange(e.target.value)}
                error={!!errors.spots_requested}
                helperText={errors.spots_requested || `Max: ${getAvailableSpots(selectedItem) || '10'} spots`}
                inputProps={{ min: 1, max: Math.min(10, getAvailableSpots(selectedItem) || 10) }}
                sx={{ mb: 2 }}
              />
              
              {selectedItem?.entry_fee && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Total Cost:</strong> ${(selectedItem.entry_fee * registrationData.spots_requested).toFixed(2)}
                    <br />
                    <small>({registrationData.spots_requested} spots × ${selectedItem.entry_fee})</small>
                  </Typography>
                </Alert>
              )}
            </Grid>

            {/* Attendee Details */}
            <Grid size={{xs:12, md:8}}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Attendee Details
              </Typography>
              
              <Box sx={{ maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
                {registrationData.attendees.map((attendee, index) => (
                  <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                      Attendee {index + 1}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid size={{xs:12}}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={attendee.name}
                          onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                          error={!!errors[`attendee_${index}_name`]}
                          helperText={errors[`attendee_${index}_name`]}
                          placeholder="Enter full name"
                        />
                      </Grid>
                      
                      <Grid size={{xs:12, md:6}}>
                        <TextField
                          fullWidth
                          label="CNIC"
                          value={attendee.cnic}
                          onChange={(e) => {
                            // Auto-format CNIC
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 5) value = value.slice(0, 5) + '-' + value.slice(5);
                            if (value.length >= 13) value = value.slice(0, 13) + '-' + value.slice(13, 14);
                            handleAttendeeChange(index, 'cnic', value);
                          }}
                          error={!!errors[`attendee_${index}_cnic`]}
                          helperText={errors[`attendee_${index}_cnic`] || "Format: 12345-1234567-1"}
                          placeholder="12345-1234567-1"
                          inputProps={{ maxLength: 15 }}
                        />
                      </Grid>
                      
                      <Grid size={{xs:12, md:6}}>
                        <TextField
                          fullWidth
                          label="Age"
                          type="number"
                          value={attendee.age}
                          onChange={(e) => handleAttendeeChange(index, 'age', parseInt(e.target.value) || '')}
                          error={!!errors[`attendee_${index}_age`]}
                          helperText={errors[`attendee_${index}_age`] || (selectedItem?.age_restriction ? `Min: ${selectedItem.age_restriction} years` : '')}
                          inputProps={{ min: 1, max: 120 }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Grid>
           {dialogError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {dialogError}
              </Typography>
            )}
            
            {/* Special Requirements */}
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Special Requirements (Optional)"
                multiline
                rows={3}
                value={registrationData.special_requirements}
                onChange={(e) => setRegistrationData({
                  ...registrationData,
                  special_requirements: e.target.value
                })}
                error={!!errors.special_requirements}
                helperText={errors.special_requirements}
                placeholder="Any accessibility needs, dietary requirements, or other special requests..."
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
          
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => setOpenRegistrationDialog(false)}
            disabled={submittingRegistration}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleRegistrationSubmit}
            disabled={submittingRegistration}
            sx={{ minWidth: 120 }}
          >
            {submittingRegistration ? 'Registering...' : `Register ${registrationData.spots_requested} Spot${registrationData.spots_requested > 1 ? 's' : ''}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View All Button */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{ px: 4, py: 1.5 }}
        >
          View All {title}
        </Button>
      </Box>
    </Container>
  );
}

export default GenericSection;