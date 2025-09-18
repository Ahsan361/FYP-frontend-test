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

// API services
import { getExhibitions } from '../../services/exhibitionService';
import { createExhibitionRegistration, getMyExhibitionRegistrations } from '../../services/exhibitionRegistrationService';

// User context
import { UserContext } from '../../contexts/UserContext';

function ExhibitionsEventsSection() {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [submittingRegistration, setSubmittingRegistration] = useState(false); // Renamed for clarity
  const [errors, setErrors] = useState({});
  const [registrationData, setRegistrationData] = useState({
    special_requirements: '',
    spots_requested: 1,
    attendees: [{ name: '', cnic: '', age: '' }]
  });
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user, loading: contextLoading } = useContext(UserContext); // Renamed for clarity
  const navigate = useNavigate();

  // Fetch data when context finishes loading
  useEffect(() => {  
      try {
        fetchData();
        fetchMyRegistrations();
      } catch(error) {
        console.log('Error while fetching exhibitions data', error);
      }
  }, []); // Dependencies are correct

  const fetchData = async () => {
    try {
      const exhibitionsData = await getExhibitions();
      // Transform backend data to match frontend structure
      const transformedData = exhibitionsData.map((item, index) => {
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
          title: item.title || 'Untitled Exhibition',
          type: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Exhibition',
          dates: dates || 'Dates TBD',
          status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown',
          statusColor: item.status === 'upcoming' ? 'info' : item.is_featured ? 'success' : 'default',
          image: item.banner_image_url || 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
          description: item.description || (item.category ? `Explore the ${item.category} exhibition${item.curator_id?.username ? ` curated by ${item.curator_id.username}` : ''}.` : 'No description available.'),
        };
      });
      setExhibitions(transformedData);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
      if (error.response?.status === 401) {
        setAlert({
          show: true,
          message: 'Please log in to view exhibitions',
          severity: 'warning'
        });
      }
    }
  };

  const fetchMyRegistrations = async () => {
    if (!user) return;
    try {
      const registrations = await getMyExhibitionRegistrations(user.token);
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

  const handleLearnMore = (exhibition) => {
    setSelectedExhibition(exhibition);
    setOpenDetailsDialog(true);
  };

  const handleRegisterClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Check if already registered
    const existingRegistration = myRegistrations.find(
      reg => reg.exhibition_id._id === selectedExhibition._id || reg.exhibition_id === selectedExhibition._id
    );

    if (existingRegistration) {
      setAlert({
        show: true,
        message: 'You are already registered for this exhibition',
        severity: 'warning'
      });
      return;
    }

    // Check capacity for default 1 spot
    if (selectedExhibition.max_capacity && selectedExhibition.current_bookings >= selectedExhibition.max_capacity) {
      setAlert({
        show: true,
        message: 'This exhibition is fully booked',
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

    setSubmittingRegistration(true); // Use renamed state
    setErrors({});

    try {
      // Double-check on frontend before submitting
      const existingRegistration = myRegistrations.find(
        reg => reg.exhibition_id._id === selectedExhibition._id || reg.exhibition_id === selectedExhibition._id
      );

      if (existingRegistration) {
        setAlert({
          show: true,
          message: 'You are already registered for this exhibition',
          severity: 'warning'
        });
        setSubmittingRegistration(false);
        return;
      }

      // Check capacity for requested spots
      const availableSpots = getAvailableSpots(selectedExhibition);
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
        exhibition_id: selectedExhibition._id,
        spots_requested: registrationData.spots_requested,
        attendees: registrationData.attendees,
        special_requirements: registrationData.special_requirements || undefined
      };

      const result = await createExhibitionRegistration(registrationPayload, user.token);
      
      const totalAmount = (selectedExhibition.entry_fee || 0) * registrationData.spots_requested;
      
      setAlert({
        show: true,
        message: `Successfully registered ${registrationData.spots_requested} spot(s)! Confirmation code: ${result.confirmation_code}${totalAmount > 0 ? `. Total amount: ${totalAmount}` : ''}`,
        severity: 'success'
      });
      
      setOpenRegistrationDialog(false);
      await fetchMyRegistrations(); // Refresh registrations
      await fetchData(); // Refresh exhibitions to update current bookings
      
    } catch (error) {
      console.error('Registration error:', error);
      setAlert({
        show: true,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
        severity: 'error'
      });
    } finally {
      setSubmittingRegistration(false);
    }
  };

  const handleSpotsChange = (newSpots) => {
    const spots = Math.max(1, Math.min(10, parseInt(newSpots) || 1));
    
    // Check if enough spots are available
    const availableSpots = getAvailableSpots(selectedExhibition);
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
    const minAge = selectedExhibition.age_restriction ? parseInt(selectedExhibition.age_restriction) : 0;
    
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

  const isFullyBooked = (exhibition) => {
    return exhibition.max_capacity && exhibition.current_bookings >= exhibition.max_capacity;
  };

  const isRegistered = (exhibitionId) => {
    return myRegistrations.some(
      reg => reg.exhibition_id._id === exhibitionId || reg.exhibition_id === exhibitionId
    );
  };

  const getAvailableSpots = (exhibition) => {
      if (!exhibition || exhibition.max_capacity == null) return null;
      return exhibition.max_capacity - (exhibition.current_bookings || 0);
  };

  // Show loading state while context is initializing
  if (contextLoading) {
    return (
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Loading exhibitions...
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
            Exhibitions 
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our current and upcoming exhibitions that bring history and heritage to life
          </Typography>
        </Box>
      </Slide>

      <Grid container spacing={3}>
        {exhibitions.map((exhibition, index) => (
          <Grid key={exhibition.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Grow in={true} timeout={1200 + index * 100}>
              <Card
                image={exhibition.image}
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
                {exhibition.status && exhibition.status !== 'Unknown' && (
                  <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                    <Badge
                      label={exhibition.status}
                      color={exhibition.statusColor}
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
                {isRegistered(exhibition._id) && (
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
                {isFullyBooked(exhibition) && (
                  <Box sx={{ position: 'absolute', top: isRegistered(exhibition._id) ? 56 : 16, left: 16, zIndex: 2 }}>
                    <Chip
                      label="Fully Booked"
                      size="small"
                      color="error"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                )}

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  {exhibition.type && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Event sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                      <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                        {exhibition.type.toUpperCase()}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                    {exhibition.title}
                  </Typography>

                  {exhibition.dates && exhibition.dates !== 'Dates TBD' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                      {exhibition.dates}
                    </Typography>
                  )}

                  {exhibition.description && exhibition.description !== 'No description available.' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      {exhibition.description}
                    </Typography>
                  )}

                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    endIcon={<ArrowForward />}
                    sx={{ mt: 1 }}
                    onClick={() => handleLearnMore(exhibition)}
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
            backgroundImage: selectedExhibition?.image ? `url(${selectedExhibition.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        }}
      >
        {selectedExhibition && (
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
                      {selectedExhibition.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={selectedExhibition.type} size="small" />
                      <Chip 
                        label={selectedExhibition.status} 
                        size="small" 
                        color={selectedExhibition.statusColor}
                      />
                      {isRegistered(selectedExhibition._id) && (
                        <Chip
                          label="You're Registered"
                          icon={<CheckCircle sx={{ fontSize: 16 }} />}
                          size="small"
                          color="success"
                        />
                      )}
                      {isFullyBooked(selectedExhibition) && (
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
                  <Grid xs={12} md={8}>
                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {selectedExhibition.description}
                    </Typography>
                  </Grid>
                  
                  <Grid xs={12} md={4}>
                    <Box sx={{ space: 2 }}>
                      {selectedExhibition.dates && selectedExhibition.dates !== 'Dates TBD' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{selectedExhibition.dates}</Typography>
                        </Box>
                      )}
                      
                      {selectedExhibition.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{selectedExhibition.location}</Typography>
                        </Box>
                      )}
                      
                      {selectedExhibition.max_capacity && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <People sx={{ mr: 1, fontSize: 20 }} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2">
                              {getAvailableSpots(selectedExhibition)} of {selectedExhibition.max_capacity} spots available
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(selectedExhibition.current_bookings / selectedExhibition.max_capacity) * 100}
                              sx={{
                                mt: 1,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getAvailableSpots(selectedExhibition) > 0 ? '#4caf50' : '#f44336'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      )}

                      {selectedExhibition.entry_fee && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Entry Fee: ${selectedExhibition.entry_fee}
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
                  disabled={user && (isRegistered(selectedExhibition._id) || isFullyBooked(selectedExhibition))}
                  sx={{ 
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' }
                  }}
                >
                  {!user
                    ? 'Login to Register'
                    : isRegistered(selectedExhibition._id)
                      ? 'Already Registered'
                      : isFullyBooked(selectedExhibition)
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
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Register for Exhibition
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {selectedExhibition?.title}
          </Typography>
          {selectedExhibition?.age_restriction && (
            <Chip 
              label={`Minimum age: ${selectedExhibition.age_restriction} years`}
              size="small" 
              color="info" 
              sx={{ mt: 1 }}
            />
          )}
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
                helperText={errors.spots_requested || `Max: ${getAvailableSpots(selectedExhibition) || '10'} spots`}
                inputProps={{ min: 1, max: Math.min(10, getAvailableSpots(selectedExhibition) || 10) }}
                sx={{ mb: 2 }}
              />
              
              {selectedExhibition?.entry_fee && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Total Cost:</strong> ${(selectedExhibition.entry_fee * registrationData.spots_requested).toFixed(2)}
                    <br />
                    <small>({registrationData.spots_requested} spots × ${selectedExhibition.entry_fee})</small>
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
                          helperText={errors[`attendee_${index}_age`] || (selectedExhibition?.age_restriction ? `Min: ${selectedExhibition.age_restriction} years` : '')}
                          inputProps={{ min: 1, max: 120 }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Grid>

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
          View All Exhibitions 
        </Button>
      </Box>
    </Container>
  );
}

export default ExhibitionsEventsSection;