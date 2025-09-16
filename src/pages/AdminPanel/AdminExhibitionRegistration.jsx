import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, TableCell, Grid, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Ticket, User, CheckCircle, Clock, CreditCard } from 'lucide-react';

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
  // Removed unused paymentDistribution
  const [exhibitions, setExhibitions] = useState([]);
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
      // Removed paymentDistribution assignment
    } catch (error) {
      console.error("Error fetching exhibition registrations/stats:", error);
    }
  };

  // Table configuration
  const tableColumns = [
    { field: 'userName', label: 'Attendee' },
    { field: 'exhibitionName', label: 'Exhibition' },
    { field: 'confirmation_code', label: 'Confirmation Code' },
    { field: 'registration_status', label: 'Registration Status', align: 'center' },
    { field: 'payment_status', label: 'Payment Status', align: 'center' },
    { field: 'entryFee', label: 'Price', align: 'center' },
    { field: 'registration_date', label: 'Registration Date' },
  ];

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
      gridSize: { xs: 12, md: 6 }
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = "";

    if ((name === "exhibition_id" || name === "user_id" || name === "registration_status" || name === "payment_status") && !value) {
      error = `${name.replace('_', ' ')} is required`;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        await updateExhibitionRegistration(selectedItem._id, formData, user.token);
      } else {
        await createExhibitionRegistration(formData, user.token);
      }
      await fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  // Handle menu actions including cancel and payment
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
        // Removed redundant 'cancel' case since we're using onCancel prop
        default:
          return;
      }
      await fetchData(); 
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  // Handle cancel action (matching events implementation)
  const handleCancel = async (item) => {
    try {
      await cancelExhibitionRegistration(item._id, user.token);
      await fetchData();
    } catch (error) {
      console.error('Error cancelling registration:', error);
    }
  };

  // Handle payment action (matching events implementation)
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
          {registration.entryFee ? `$${registration.entryFee.toFixed(2)}` : 'N/A'}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {formatDate(registration.registration_date)}
        </Typography>
      </TableCell>
    </>
  );

  // Custom details dialog renderer (matching events implementation)
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ space: 3 }}>
              {[
                { label: "Attendee Name", value: registration.userName || registration.user_id?.username || 'N/A' },
                { label: "Email", value: registration.userEmail || registration.user_id?.email || 'N/A' },
                { label: "Exhibition", value: registration.exhibitionName || registration.exhibition_id?.title || 'N/A' },
                { label: "Confirmation Code", value: registration.confirmation_code },
                { label: "Registration Date", value: formatDate(registration.registration_date) },
                { label: "Special Requirements", value: registration.special_requirements || 'None' },
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ space: 3 }}>
              {[
                { label: "Registration Status", value: registration.registration_status },
                { label: "Payment Status", value: registration.payment_status },
                { label: "Entry Fee", value: registration.entryFee ? `$${registration.entryFee.toFixed(2)}` : 'N/A' },
                { label: "Exhibition Date", value: registration.exhibitionDate ? new Date(registration.exhibitionDate).toLocaleDateString() : 'N/A' },
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
      
      // Chart data
      chartData={registrationTrends}
      chartType="area"
      chartDataKey="registrations"
      chartXAxisKey="date"
      chartTitle="Registration Trends & Revenue"
      
      // Registration status pie chart
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
      onPayment={handlePayment}  // Added missing onPayment prop
      showCancel={true}
      showPayment={true}
    />
  );
}

export default AdminExhibitionRegistration;