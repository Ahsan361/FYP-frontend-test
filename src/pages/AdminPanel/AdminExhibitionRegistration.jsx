import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, TableCell, Grid, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Ticket, User, CheckCircle, Clock, CreditCard, UserPlus, Trash2, XCircle } from 'lucide-react';

// Import the reusable custom components
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';

// API services
import { getExhibitions } from '../../services/exhibitionService';
import { getAllUsers } from '../../services/userService';

import { 
  getAllExhibitionRegistrations, 
  createExhibitionRegistration, 
  updateExhibitionRegistration, 
  deleteExhibitionRegistration,
  confirmExhibitionRegistration, 
  processExhibitionPayment, 
  cancelExhibitionRegistration, 
  getExhibitionRegistrationStats 
} from "../../services/exhibitionRegistrationService";

// Constants
import { REGISTRATION_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS, REGISTRATION_STATUS_COLORS, PAYMENT_STATUS_COLORS } from '../../constants/enum';

// Context
import { UserContext } from "../../contexts/UserContext";

function AdminExhibitionRegistration() {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmed: 0,
    pending: 0,
    revenue: 0,
  });
  const [registrationTrends, setRegistrationTrends] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const registrationsData = await getAllExhibitionRegistrations(user.token);
      setRegistrations(registrationsData);

      const statsData = await getExhibitionRegistrationStats(user.token);
      setStats({
        totalBookings: statsData.totalBookings,
        confirmed: statsData.confirmed,
        pending: statsData.pending,
        revenue: statsData.revenue.toFixed(2),
      });
      
      const [exhibitionsData, usersData] = await Promise.all([
        getExhibitions(user.token),
        getAllUsers(user.token)
      ]);
      setExhibitions(exhibitionsData);
      setUsers(usersData);

      setRegistrationTrends(statsData.registrationTrends);
      setStatusDistribution(statsData.statusDistribution);
    } catch (error) {
      console.error("Error fetching exhibition registrations/stats:", error);
    }
  };

  // Table configuration
  const tableColumns = [
    { field: 'userName', label: 'User' },
    { field: 'exhibitionName', label: 'Exhibition' },
    { field: 'spots_requested', label: 'Spots', align: 'center' },
    { field: 'confirmation_code', label: 'Code' },
    { field: 'registration_status', label: 'Status', align: 'center' },
    { field: 'payment_status', label: 'Payment', align: 'center' },
    { field: 'total_amount', label: 'Total', align: 'center' },
    { field: 'registration_date', label: 'Date' },
  ];

  // CNIC formatting helper
  const formatCNIC = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 12) return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 12)}-${numbers.slice(12, 13)}`;
  };

  // Custom attendee fields component
  const AttendeeFields = ({ formData, setFormData, errors }) => {
    const spotsRequested = parseInt(formData.spots_requested) || 1;
    const attendees = formData.attendees || [];

    const addAttendee = () => {
      if (attendees.length < spotsRequested) {
        setFormData(prev => ({
          ...prev,
          attendees: [...attendees, { name: '', cnic: '', age: '' }]
        }));
      }
    };

    const removeAttendee = (index) => {
      setFormData(prev => ({
        ...prev,
        attendees: attendees.filter((_, i) => i !== index)
      }));
    };

    const updateAttendee = (index, field, value) => {
      const updatedAttendees = [...attendees];
      if (field === 'cnic') {
        value = formatCNIC(value);
      }
      updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
      setFormData(prev => ({ ...prev, attendees: updatedAttendees }));
    };

    return (
      <Box sx={{ mt: 2 }}>
        {/* Add this new conditional error banner for attendees */}
        {errors?.attendees && (
          <Box sx={{ mb: 2, p: 2, bgcolor: 'error.lighter', border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
            <Typography variant="body2" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
              <XCircle size={16} style={{ marginRight: 8, color: 'error.main' }} />  {/* Optional icon for "mismatch" */}
              {errors.attendees}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Attendees ({attendees.length}/{spotsRequested})
          </Typography>
          {attendees.length < spotsRequested && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<UserPlus size={16} />}
              onClick={addAttendee}
            >
              Add Attendee
            </Button>
          )}
        </Box>

        {attendees.map((attendee, index) => (
          <Box key={index} sx={{ 
            p: 2, 
            mb: 2, 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            position: 'relative'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Attendee {index + 1}</Typography>
              <Button
                variant="text"
                size="small"
                color="error"
                startIcon={<Trash2 size={14} />}
                onClick={() => removeAttendee(index)}
              >
                Remove
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Full Name"
                  value={attendee.name || ''}
                  onChange={(e) => updateAttendee(index, 'name', e.target.value)}
                  fullWidth
                  required
                  error={!!errors[`attendee_${index}_name`]}
                  helperText={errors[`attendee_${index}_name`]}
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="CNIC"
                  value={attendee.cnic || ''}
                  onChange={(e) => updateAttendee(index, 'cnic', e.target.value)}
                  fullWidth
                  required
                  placeholder="12345-1234567-1"
                  error={!!errors[`attendee_${index}_cnic`]}
                  helperText={errors[`attendee_${index}_cnic`] || "Format: 12345-1234567-1"}
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Age"
                  type="number"
                  value={attendee.age || ''}
                  onChange={(e) => updateAttendee(index, 'age', e.target.value)}
                  fullWidth
                  required
                  error={!!errors[`attendee_${index}_age`]}
                  helperText={errors[`attendee_${index}_age`]}
                  inputProps={{ min: 1, max: 120 }}
                />
              </Grid>
            </Grid>
          </Box>
        ))}

        {attendees.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
            No attendees added yet. Click "Add Attendee" to begin.
          </Box>
        )}
      </Box>
    );
  };

  // Form fields configuration
  const formFields = [
    { 
      name: 'exhibition_id', 
      label: 'Exhibition', 
      type: 'select', 
      required: true,
      options: exhibitions.map(exhibition => ({ 
        value: exhibition._id || exhibition.id, 
        label: exhibition.title 
      })),
      gridSize: { xs: 12, md: 6 },
      onChange: (value, setFormData, formData) => {
        const selectedExhibition = exhibitions.find(e => e._id === value || e.id === value);
        if (selectedExhibition) {
          const totalAmount = (selectedExhibition.entry_fee || 0) * (formData.spots_requested || 1);
          setFormData(prev => ({ ...prev, total_amount: totalAmount }));
        }
      }
    },
    { 
      name: 'user_id', 
      label: 'User', 
      type: 'select', 
      required: true,
      options: users.map(user => ({ 
        value: user._id || user.id, 
        label: user.username || user.name || user.email 
      })),
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'spots_requested', 
      label: 'Spots Requested', 
      type: 'number', 
      required: true,
      gridSize: { xs: 12, md: 6 },
      onChange: (value, setFormData, formData) => {
        const spots = parseInt(value) || 1;
        const exhibition = exhibitions.find(e => e._id === formData.exhibition_id || e.id === formData.exhibition_id);
        const totalAmount = exhibition ? (exhibition.entry_fee || 0) * spots : 0;
        
        // Adjust attendees array to match spots
        const currentAttendees = formData.attendees || [];
        let newAttendees = [...currentAttendees];
        
        if (spots > currentAttendees.length) {
          // Add empty attendees
          const toAdd = spots - currentAttendees.length;
          for (let i = 0; i < toAdd; i++) {
            newAttendees.push({ name: '', cnic: '', age: '' });
          }
        } else if (spots < currentAttendees.length) {
          // Remove extra attendees
          newAttendees = newAttendees.slice(0, spots);
        }
        
        setFormData(prev => ({ 
          ...prev, 
          spots_requested: spots,
          attendees: newAttendees,
          total_amount: totalAmount 
        }));
      }
    },
    { 
      name: 'attendees',
      label: 'Attendees',
      type: 'custom',
      render: (formData, setFormData, errors) => (
        <AttendeeFields formData={formData} setFormData={setFormData} errors={errors} />
      ),
      gridSize: { xs: 12 }
    },
    { 
      name: 'registration_status', 
      label: 'Registration Status', 
      type: 'select', 
      required: true,
      options: REGISTRATION_STATUS_OPTIONS.map(status => ({ value: status, label: status })),
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'payment_status', 
      label: 'Payment Status', 
      type: 'select', 
      required: true,
      options: PAYMENT_STATUS_OPTIONS.map(status => ({ value: status, label: status })),
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'total_amount', 
      label: 'Total Amount', 
      type: 'number', 
      gridSize: { xs: 12, md: 6 },
      disabled: () => true // Auto-calculated
    },
    { name: 'special_requirements', label: 'Special Requirements', multiline: true, rows: 3, gridSize: { xs: 12 } },
  ];

  // Stats data for the component
  const statsData = [
    { label: 'Total Bookings', value: stats.totalBookings, icon: Ticket },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle },
    { label: 'Pending Payment', value: stats.pending, icon: Clock },
    { label: 'Revenue', value: `$${stats.revenue}`, icon: CreditCard },
  ];

  // Format date helper
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // Validation functions
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

    // Required fields
    if (!formData.exhibition_id) {
      newErrors.exhibition_id = "Exhibition is required";
    }

    if (!formData.user_id) {
      newErrors.user_id = "User is required";
    }

    if (!formData.registration_status) {
      newErrors.registration_status = "Registration status is required";
    }

    if (!formData.payment_status) {
      newErrors.payment_status = "Payment status is required";
    }

    // Spots validation
    const spots = parseInt(formData.spots_requested);
    if (!spots || spots < 1 || spots > 10) {
      newErrors.spots_requested = "Spots requested must be between 1 and 10";
    }

    // Attendees validation
    const attendees = formData.attendees || [];
    
    if (attendees.length !== spots) {
      newErrors.attendees = `Number of attendees (${attendees.length}) must match spots requested (${spots})`;
    }

    // Validate each attendee
    attendees.forEach((attendee, index) => {
      if (!attendee.name || attendee.name.trim().length === 0) {
        newErrors[`attendee_${index}_name`] = "Name is required";
      } else if (attendee.name.length > 100) {
        newErrors[`attendee_${index}_name`] = "Name must be less than 100 characters";
      }

      if (!attendee.cnic || !cnicRegex.test(attendee.cnic)) {
        newErrors[`attendee_${index}_cnic`] = "Invalid CNIC format. Use: 12345-1234567-1";
      }

      const age = parseInt(attendee.age);
      if (!age || age < 1 || age > 120) {
        newErrors[`attendee_${index}_age`] = "Age must be between 1 and 120";
      }

      // Age restriction check
      const exhibition = exhibitions.find(e => e._id === formData.exhibition_id || e.id === formData.exhibition_id);
      if (exhibition?.age_restriction) {
        const minAge = parseInt(exhibition.age_restriction);
        if (age < minAge) {
          newErrors[`attendee_${index}_age`] = `Attendee must be at least ${minAge} years old`;
        }
      }
    });

    // Check for duplicate CNICs
    const cnics = attendees.map(a => a.cnic).filter(Boolean);
    const duplicateCNICs = cnics.filter((cnic, index) => cnics.indexOf(cnic) !== index);
    if (duplicateCNICs.length > 0) {
      newErrors.attendees = "Duplicate CNICs found in the same registration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = "";
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

    if ((name === "exhibition_id" || name === "user_id" || name === "registration_status" || name === "payment_status") && !value) {
      error = `${name.replace('_', ' ')} is required`;
    }

    if (name === "spots_requested") {
      const spots = parseInt(value);
      if (!spots || spots < 1 || spots > 10) {
        error = "Spots must be between 1 and 10";
      }
    }

    // Attendee field validation
    if (name.startsWith('attendee_')) {
      const parts = name.split('_');
      const index = parseInt(parts[1]);
      const field = parts[2];
      
      if (field === 'name' && (!value || value.trim().length === 0)) {
        error = "Name is required";
      } else if (field === 'name' && value.length > 100) {
        error = "Name must be less than 100 characters";
      } else if (field === 'cnic' && !cnicRegex.test(value)) {
        error = "Invalid CNIC format";
      } else if (field === 'age') {
        const age = parseInt(value);
        if (!age || age < 1 || age > 120) {
          error = "Age must be between 1 and 120";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      const submitData = {
        ...formData,
        spots_requested: parseInt(formData.spots_requested) || 1,
        attendees: formData.attendees || []
      };

      if (isEditMode) {
        await updateExhibitionRegistration(selectedItem._id, submitData, user.token);
      } else {
        await createExhibitionRegistration(submitData, user.token);
      }
      await fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle backend errors
      if (error.response?.data?.message) {
        setErrors({ generalError: error.response.data.message });
      }
      throw error;
    }
  };

  // Handle menu actions
  const handleMenuAction = async (action, item) => {
    try {
      switch (action) {
        case 'delete':
          await deleteExhibitionRegistration(item._id, user.token);
          break;
        case 'confirm':
          await confirmExhibitionRegistration(item._id, user.token);
          break;
        case 'process_payment':
          await processExhibitionPayment(item._id, user.token);
          break;
        default:
          return;
      }
      await fetchData(); 
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  // Handle cancel action
  const handleCancel = async (item) => {
    try {
      await cancelExhibitionRegistration(item._id, user.token);
      await fetchData();
    } catch (error) {
      console.error('Error cancelling registration:', error);
    }
  };

  // Handle payment action
  const handlePayment = async (item) => {
    try {
      await processExhibitionPayment(item._id, user.token);
      await fetchData();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  // Custom table row renderer
  const renderTableRow = (registration) => (
    <>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            backgroundColor: '#1B4332', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mr: 2
          }}>
            <User size={20} color="white" />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight="medium">
              {registration.userName || registration.user_id?.username || 'N/A'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {registration.userEmail || registration.user_id?.email || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          <Typography variant="subtitle2" fontWeight="medium">
            {registration.exhibitionName || registration.exhibition_id?.title || 'N/A'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {registration.exhibitionDate ? new Date(registration.exhibitionDate).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={registration.spots_requested || 1}
          color="primary"
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
          {registration.confirmation_code}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={registration.registration_status}
          color={REGISTRATION_STATUS_COLORS[registration.registration_status]}
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>

      <TableCell align="center">
        <Chip
          label={registration.payment_status}
          color={PAYMENT_STATUS_COLORS[registration.payment_status]}
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2" fontWeight="medium">
          ${registration.total_amount?.toFixed(2) || '0.00'}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {formatDate(registration.registration_date)}
        </Typography>
      </TableCell>
    </>
  );

  // Custom details dialog renderer
  const renderDetailsDialog = (registration, onClose, onEdit) => (
    <>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Registration Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={registration.registration_status}
              color={REGISTRATION_STATUS_COLORS[registration.registration_status]}
              sx={{ textTransform: 'capitalize' }}
            />
            <Chip
              label={registration.payment_status}
              color={PAYMENT_STATUS_COLORS[registration.payment_status]}
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ space: 3 }}>
              {[
                { label: "User", value: registration.userName || registration.user_id?.username || 'N/A' },
                { label: "Email", value: registration.userEmail || registration.user_id?.email || 'N/A' },
                { label: "Exhibition", value: registration.exhibitionName || registration.exhibition_id?.title || 'N/A' },
                { label: "Spots Requested", value: registration.spots_requested || 1 },
                { label: "Confirmation Code", value: registration.confirmation_code },
                { label: "Total Amount", value: `$${registration.total_amount?.toFixed(2) || '0.00'}` },
              ].map((field, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {field.label}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {field.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ space: 3 }}>
              {[
                { label: "Registration Status", value: registration.registration_status },
                { label: "Payment Status", value: registration.payment_status },
                { label: "Registration Date", value: formatDate(registration.registration_date) },
                { label: "Special Requirements", value: registration.special_requirements || 'None' },
                { label: "Created At", value: formatDate(registration.createdAt) },
                { label: "Last Updated", value: formatDate(registration.updatedAt) },
              ].map((field, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {field.label}
                  </Typography>
                  <Typography variant="body2">
                    {field.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Attendees Section */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Attendees
            </Typography>
            {registration.attendees?.map((attendee, index) => (
              <Box key={index} sx={{ 
                p: 2, 
                mb: 2, 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1 
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="textSecondary">Name</Typography>
                    <Typography variant="body2" fontWeight="medium">{attendee.name}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="textSecondary">CNIC</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{attendee.cnic}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="textSecondary">Age</Typography>
                    <Typography variant="body2">{attendee.age} years</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        {registration.registration_status === 'pending' && (
          <Button 
            variant="contained" 
            startIcon={<CheckCircle size={16} />}
            onClick={() => {
              handleMenuAction('confirm', registration);
              onClose();
            }}
          >
            Confirm Registration
          </Button>
        )}
        {registration.payment_status === 'unpaid' && (
          <Button 
            variant="contained" 
            startIcon={<CreditCard size={16} />}
            onClick={() => {
              handleMenuAction('process_payment', registration);
              onClose();
            }}
          >
            Process Payment
          </Button>
        )}
      </DialogActions>
    </>
  );

  return (
    <AdminTable
      title="Exhibition Bookings"
      subtitle="Manage exhibition registrations and attendee information"
      createButtonText="Manual Registration"
      createButtonIcon={<Ticket size={20} />}
      
      chartData={registrationTrends}
      chartType="area"
      chartDataKey="registrations"
      chartXAxisKey="date"
      chartTitle="Registration Trends & Revenue"
      
      additionalCharts={[
        {
          data: statusDistribution,
          type: "pie",
          title: "Registration Status",
          dataKey: "value"
        }
      ]}
      
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={registrations}
      searchFields={['userName', 'exhibitionName', 'confirmation_code', 'userEmail']}
      filterOptions={[
        {
          label: 'Registration Status',
          field: 'registration_status',
          options: ['All', ...REGISTRATION_STATUS_OPTIONS]
        },
        {
          label: 'Payment Status',
          field: 'payment_status',
          options: ['All', ...PAYMENT_STATUS_OPTIONS]
        }
      ]}
      onFormSubmit={handleFormSubmit}
      onMenuAction={handleMenuAction}
      renderTableRow={renderTableRow}
      renderDetailsDialog={renderDetailsDialog}
      formFields={formFields}
      validateForm={validateForm}
      validateField={validateField}
      statusColors={REGISTRATION_STATUS_COLORS}
      categoryColors={PAYMENT_STATUS_COLORS}
      onCancel={handleCancel}
      onPayment={handlePayment} 
      showCancel={true}
      showPayment={true}
      errors={errors} 
      setErrors={setErrors}
    />
  );
}

export default AdminExhibitionRegistration;