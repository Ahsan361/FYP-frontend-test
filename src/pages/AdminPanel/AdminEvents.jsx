import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, Grid, TableCell, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Calendar, MapPin, Users, DollarSign, CheckCircle, Edit } from 'lucide-react';

// Import the reusable AdminTable component
import AdminTable from '../../components/ui/AdminTable';

// Import services
import { getEvents, createEvent, updateEvent, deleteEvent, getEventStats } from '../../services/EventService';

// Import constants
import { EVENT_TYPES, EVENT_STATUSES, TARGET_AUDIENCES } from '../../constants/enum';

// Import context
import { UserContext } from "../../contexts/UserContext";

// Colors for event types and statuses
const eventTypeColors = {
  [EVENT_TYPES.CONFERENCE]: 'primary',
  [EVENT_TYPES.WORKSHOP]: 'success',
  [EVENT_TYPES.SEMINAR]: 'info',
  [EVENT_TYPES.EXHIBITION]: 'warning',
  [EVENT_TYPES.OTHER]: 'secondary',
};

const statusColors = {
  [EVENT_STATUSES.UPCOMING]: '#2196F3',
  [EVENT_STATUSES.ONGOING]: '#4CAF50',
  [EVENT_STATUSES.COMPLETED]: '#9E9E9E',
};

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    revenueGenerated: 0,
  });
  const [eventTypeData, setEventTypeData] = useState([]);
  const { user } = useContext(UserContext);
  const token = user?.token;

  // Fetch events and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getEvents(user.token);
        setEvents(eventsData);

        const statsData = await getEventStats(user.token);
        setStats({
          totalEvents: eventsData.length,
          upcomingEvents: statsData.upcomingEvents,
          totalRegistrations: statsData.totalRegistrations,
          revenueGenerated: statsData.revenueGenerated.toFixed(2),
        });
        setEventTypeData(statsData.typeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Format date helper
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // Table columns configuration
  const tableColumns = [
    { field: 'title', label: 'Title' },
    { field: 'event_type', label: 'Event Type' },
    { field: 'status', label: 'Status' },
    { field: 'start_datetime', label: 'Start Date' },
    { field: 'location', label: 'Location' },
    { field: 'registrations', label: 'Registrations', align: 'center' },
    { field: 'registration_fee', label: 'Fee', align: 'center' },
  ];

  // Form fields configuration
  const formFields = [
    { name: 'title', label: 'Title', required: true, gridSize: { xs: 12 } },
    { name: 'description', label: 'Description', multiline: true, rows: 4, gridSize: { xs: 12 } },
    { 
      name: 'event_type', 
      label: 'Event Type', 
      type: 'select', 
      required: true,
      options: Object.values(EVENT_TYPES).map(type => ({ value: type, label: type })),
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      required: true,
      options: Object.values(EVENT_STATUSES).map(status => ({ value: status, label: status })),
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'start_datetime', 
      label: 'Start Date & Time', 
      type: 'datetime-local', 
      required: true, 
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'end_datetime', 
      label: 'End Date & Time', 
      type: 'datetime-local', 
      required: true, 
      gridSize: { xs: 12, md: 6 }
    },
    { name: 'location', label: 'Location', gridSize: { xs: 12 } },
    { name: 'max_attendees', label: 'Max Attendees', type: 'number', gridSize: { xs: 12, md: 6 } },
    { 
      name: 'registration_fee', 
      label: 'Registration Fee', 
      type: 'number', 
      gridSize: { xs: 12, md: 6 },
      disabled: (formData) => formData.is_free
    },
    { 
      name: 'target_audience', 
      label: 'Target Audience', 
      type: 'select',
      options: Object.values(TARGET_AUDIENCES).map(audience => ({ value: audience, label: audience })),
      gridSize: { xs: 12, md: 6 }
    },
    { name: 'banner_image_url', label: 'Banner Image URL', gridSize: { xs: 12, md: 6 } },
    { 
      name: 'is_free', 
      label: 'Is Free', 
      type: 'select',
      options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
      gridSize: { xs: 12, md: 6 },
      onChange: (value, setFormData, formData) => {
        setFormData({ ...formData, is_free: value, registration_fee: value ? 0 : formData.registration_fee });
      }
    },
    { 
      name: 'requires_registration', 
      label: 'Requires Registration', 
      type: 'select',
      options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
      gridSize: { xs: 12, md: 6 }
    },
  ];

  // Stats data configuration
  const statsData = [
    { label: 'Total Events', value: stats.totalEvents, icon: Calendar },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: CheckCircle },
    { label: 'Total Registrations', value: stats.totalRegistrations, icon: Users },
    { label: 'Revenue Generated', value: `Rs. ${stats.revenueGenerated}`, icon: DollarSign },
  ];

  // Validation functions
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};
    const now = new Date();

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.start_datetime) {
      newErrors.start_datetime = "Start date & time is required";
    } else {
      const startDate = new Date(formData.start_datetime);
      if (isNaN(startDate.getTime())) {
        newErrors.start_datetime = "Invalid start date & time";
      } else if (startDate <= now) {
        newErrors.start_datetime = "Start date must be in the future";
      }
    }

    if (!formData.end_datetime) {
      newErrors.end_datetime = "End date & time is required";
    } else {
      const endDate = new Date(formData.end_datetime);
      const startDate = new Date(formData.start_datetime);
      if (isNaN(endDate.getTime())) {
        newErrors.end_datetime = "Invalid end date & time";
      } else if (formData.start_datetime && endDate <= startDate) {
        newErrors.end_datetime = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = "";

    if (name === "title" && !value?.trim()) {
      error = "Title is required";
    }

    if (name === "start_datetime") {
      if (!value) {
        error = "Start date & time is required";
      } else {
        const now = new Date();
        const startDate = new Date(value);
        if (isNaN(startDate.getTime())) {
          error = "Invalid start date & time";
        } else if (startDate <= now) {
          error = "Start date must be in the future";
        }
      }
    }

    if (name === "end_datetime") {
      if (!value) {
        error = "End date & time is required";
      } else {
        const endDate = new Date(value);
        const startDate = new Date(formData.start_datetime);
        if (isNaN(endDate.getTime())) {
          error = "Invalid end date & time";
        } else if (formData.start_datetime && endDate <= startDate) {
          error = "End date must be after start date";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        const updatedEvent = await updateEvent(selectedItem._id, formData, token);
        setEvents(events.map(event => event._id === updatedEvent._id ? updatedEvent : event));
      } else {
        const newEvent = await createEvent(formData, token);
        setEvents([...events, newEvent]);
      }
      // Refresh stats
      const statsData = await getEventStats(user.token);
      setStats({
        totalEvents: events.length + (isEditMode ? 0 : 1),
        upcomingEvents: statsData.upcomingEvents,
        totalRegistrations: statsData.totalRegistrations,
        revenueGenerated: statsData.revenueGenerated.toFixed(2),
      });
      setEventTypeData(statsData.typeData);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  // Handle menu actions
  const handleMenuAction = async (action, item) => {
    if (action === 'delete') {
      try {
        await deleteEvent(item._id, token);
        setEvents(events.filter(event => event._id !== item._id));
        // Refresh stats
        const statsData = await getEventStats(user.token);
        setStats({
          totalEvents: events.length - 1,
          upcomingEvents: statsData.upcomingEvents,
          totalRegistrations: statsData.totalRegistrations,
          revenueGenerated: statsData.revenueGenerated.toFixed(2),
        });
        setEventTypeData(statsData.typeData);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  // Custom table row renderer
  const renderTableRow = (event) => (
    <>
      <TableCell>
        <Box>
          <Typography variant="subtitle2" fontWeight="medium">
            {event.title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {event.description?.substring(0, 50) || 'N/A'}...
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={event.event_type}
          color={eventTypeColors[event.event_type]}
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={event.status}
          sx={{
            backgroundColor: `${statusColors[event.status]}20`,
            color: statusColors[event.status],
            fontWeight: 'medium',
          }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2">{formatDate(event.start_datetime)}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MapPin size={16} style={{ marginRight: 4 }} />
          <Typography variant="body2">{event.location || 'N/A'}</Typography>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">
          {event.current_registrations}/{event.max_attendees || '∞'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">
          {event.is_free ? 'Free' : `Rs. ${event.registration_fee}`}
        </Typography>
      </TableCell>
    </>
  );

  // Custom details dialog renderer
  const renderDetailsDialog = (event, onClose, onEdit) => (
    <>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Event Details
          </Typography>
          <Chip
            label={event.event_type}
            color={eventTypeColors[event.event_type]}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ space: 3 }}>
              {[
                { label: "Title", value: event.title },
                { label: "Description", value: event.description || 'N/A' },
                { label: "Organizer", value: event.organizer_id?.username || event.organizer_id || 'N/A' },
                { label: "Start Date", value: formatDate(event.start_datetime) },
                { label: "End Date", value: formatDate(event.end_datetime) },
                { label: "Location", value: event.location || 'N/A' },
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
                { label: "Current Registrations", value: event.current_registrations },
                { label: "Max Attendees", value: event.max_attendees || 'Unlimited' },
                { label: "Registration Fee", value: event.is_free ? 'Free' : `Rs. ${event.registration_fee}` },
                { label: "Requires Registration", value: event.requires_registration ? 'Yes' : 'No' },
                { label: "Target Audience", value: event.target_audience },
                { label: "Banner Image", value: event.banner_image_url || 'N/A' },
                { label: "Created At", value: formatDate(event.created_at) },
              ].map((field, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {field.label}
                  </Typography>
                  <Typography variant="body2" sx={{ textTransform: field.label === "Target Audience" ? 'capitalize' : 'none' }}>
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
        <Button variant="contained" startIcon={<Edit size={16} />} onClick={onEdit}>
          Edit Event
        </Button>
      </DialogActions>
    </>
  );

  return (
    <AdminTable
      title="Events Management"
      subtitle="Monitor and manage events"
      createButtonText="Create Event"
      createButtonIcon={<Calendar size={20} />}
      chartData={eventTypeData}
      chartType="bar"
      chartDataKey="count"
      chartTitle="Event Type Distribution"
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={events}
      searchFields={['title', 'description']}
      filterOptions={[
        {
          label: 'Event Type',
          field: 'event_type',
          options: ['All', ...Object.values(EVENT_TYPES)],
        },
        {
          label: 'Status',
          field: 'status',
          options: ['All', ...Object.values(EVENT_STATUSES)],
        },
      ]}
      onFormSubmit={handleFormSubmit}
      onMenuAction={handleMenuAction}
      renderTableRow={renderTableRow}
      renderDetailsDialog={renderDetailsDialog}
      formFields={formFields}
      validateForm={validateForm}
      validateField={validateField}
      statusColors={statusColors}
      categoryColors={eventTypeColors}
    />
  );
}

export default AdminEvents;