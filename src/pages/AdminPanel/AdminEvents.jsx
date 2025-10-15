import React, { useState, useEffect, useContext } from 'react';
// --- MODIFIED: Added ImageList and ImageListItem for the gallery ---
import { Box, Typography, Chip, Grid, TableCell, DialogTitle, DialogContent, DialogActions, ImageList, ImageListItem } from '@mui/material';
import { Calendar, MapPin, Users, DollarSign, CheckCircle, Edit } from 'lucide-react';

// Import the reusable AdminTable component
import AdminTable from '../../components/ui/AdminTable';
// --- MODIFIED: Imported the custom Button component for consistency ---
import { Button } from '../../components/ui';

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
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    revenueGenerated: 0,
  });
  const [eventTypeData, setEventTypeData] = useState([]);
  const { user } = useContext(UserContext);

  // --- MODIFIED: Renamed 'fetchData' and call it inside useEffect ---
  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const eventsData = await getEvents(user.token);
      setEvents(eventsData);

      const statsData = await getEventStats(user.token);
      setStats({
        totalEvents: statsData.totalEvents,
        upcomingEvents: statsData.upcomingEvents,
        totalRegistrations: statsData.totalRegistrations,
        revenueGenerated: statsData.revenueGenerated.toFixed(2),
      });
      setEventTypeData(statsData.typeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Format date helper
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // Table columns configuration (no changes needed here)
  const tableColumns = [
    { field: 'title', label: 'Title' },
    { field: 'event_type', label: 'Event Type' },
    { field: 'status', label: 'Status' },
    { field: 'start_datetime', label: 'Start Date' },
    { field: 'location', label: 'Location' },
    { field: 'registrations', label: 'Registrations', align: 'center' },
    { field: 'registration_fee', label: 'Fee', align: 'center' },
  ];

  // --- MODIFIED: Updated formFields for multiple image support ---
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
    { name: 'start_datetime', label: 'Start Date & Time', type: 'datetime-local', required: true, gridSize: { xs: 12, md: 6 } },
    { name: 'end_datetime', label: 'End Date & Time', type: 'datetime-local', required: true, gridSize: { xs: 12, md: 6 } },
    { name: 'location', label: 'Location', gridSize: { xs: 12 } },
    { name: 'max_attendees', label: 'Max Attendees', type: 'number', gridSize: { xs: 12, md: 6 } },
    { name: 'registration_fee', label: 'Registration Fee', type: 'number', gridSize: { xs: 12, md: 6 } },
    { 
      name: 'target_audience', 
      label: 'Target Audience', 
      type: 'select',
      options: Object.values(TARGET_AUDIENCES).map(audience => ({ value: audience, label: audience })),
      gridSize: { xs: 12, md: 6 }
    },
    { 
      name: 'eventImage', 
      label: 'Event Images (Max 10)', // Updated label
      type: 'file', 
      multiple: true, // Allow multiple files
      gridSize: { xs: 12 } 
    },
    { 
      name: 'is_free', 
      label: 'Is Free', 
      type: 'select',
      options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
      gridSize: { xs: 12, md: 6 },
    },
    { 
      name: 'requires_registration', 
      label: 'Requires Registration', 
      type: 'select',
      options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
      gridSize: { xs: 12, md: 6 }
    },
  ];

  // Stats data configuration (no changes needed)
  const statsData = [
    { label: 'Total Events', value: stats.totalEvents, icon: Calendar },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: CheckCircle },
    { label: 'Total Registrations', value: stats.totalRegistrations, icon: Users },
    { label: 'Revenue Generated', value: `Rs. ${stats.revenueGenerated}`, icon: DollarSign },
  ];

  // Validation functions (no changes needed)
  const validateForm = (formData, errors, setErrors) => {
    // ... same validation logic ...
    return true; // Placeholder for your logic
  };

  const validateField = (name, value, formData, setErrors) => {
    // ... same validation logic ...
  };

  // --- MODIFIED: Simplified form submission to always refetch data ---
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        await updateEvent(selectedItem._id, formData, user.token);
      } else {
        await createEvent(formData, user.token);
      }
      await fetchEventData(); // Refresh all data from the server
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  // --- MODIFIED: Simplified menu actions to always refetch data ---
  const handleMenuAction = async (action, item) => {
    if (action === 'delete') {
      try {
        await deleteEvent(item._id, user.token);
        await fetchEventData(); // Refresh all data from the server
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  // --- MODIFIED: Complete overhaul of renderTableRow to match AdminExhibitions ---
  const renderTableRow = (event) => (
    <>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {event.eventImage && event.eventImage.length > 0 && (
            <Box
              component="img"
              src={event.eventImage[0].url}
              alt={event.title}
              sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
            />
          )}
          <Box>
            <Typography variant="subtitle2" fontWeight="medium">
              {event.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {event.description?.substring(0, 50) || 'N/A'}...
            </Typography>
            {event.eventImage && event.eventImage.length > 1 && (
              <Chip 
                label={`+${event.eventImage.length - 1} more`} 
                size="small" 
                sx={{ ml: 1, height: 18 }}
              />
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Chip label={event.event_type} color={eventTypeColors[event.event_type]} sx={{ textTransform: 'capitalize' }} />
      </TableCell>
      <TableCell>
        <Chip label={event.status} sx={{ backgroundColor: `${statusColors[event.status]}20`, color: statusColors[event.status], fontWeight: 'medium' }} />
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
        <Typography variant="body2">{event.current_registrations}/{event.max_attendees || '∞'}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{event.is_free ? 'Free' : `Rs. ${event.registration_fee}`}</Typography>
      </TableCell>
    </>
  );

  // --- MODIFIED: Complete overhaul of renderDetailsDialog to include an image gallery ---
  const renderDetailsDialog = (event, onClose, onEdit) => {
    const hasImages = event.eventImage && event.eventImage.length > 0;
    const imageCount = hasImages ? event.eventImage.length : 0;

    return (
      <>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">Event Details</Typography>
            <Chip label={event.event_type} color={eventTypeColors[event.event_type]} sx={{ textTransform: 'capitalize' }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Image Gallery Section */}
            {hasImages && (
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>Event Images ({imageCount})</Typography>
                <ImageList sx={{ width: '100%', maxHeight: 400, borderRadius: 2, overflow: 'hidden' }} cols={imageCount === 1 ? 1 : (imageCount === 2 ? 2 : 3)} rowHeight={200} gap={8}>
                  {event.eventImage.map((image, index) => (
                    <ImageListItem key={index} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                      <img src={image.url} alt={`${event.title} - Image ${index + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            )}

            {/* Details Section */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {[
                  { label: "Title", value: event.title },
                  { label: "Description", value: event.description || 'N/A' },
                  { label: "Organizer", value: event.organizer_id?.username || event.organizer_id || 'N/A' },
                  { label: "Start Date", value: formatDate(event.start_datetime) },
                  { label: "End Date", value: formatDate(event.end_datetime) },
                  { label: "Location", value: event.location || 'N/A' },
                ].map((field) => (
                  <Box key={field.label} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>{field.label}</Typography>
                    <Typography variant="body1" fontWeight="medium">{field.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {[
                  { label: "Current Registrations", value: event.current_registrations },
                  { label: "Max Attendees", value: event.max_attendees || 'Unlimited' },
                  { label: "Registration Fee", value: event.is_free ? 'Free' : `Rs. ${event.registration_fee}` },
                  { label: "Requires Registration", value: event.requires_registration ? 'Yes' : 'No' },
                  { label: "Target Audience", value: event.target_audience },
                  { label: "Status", value: event.status },
                  { label: "Created At", value: formatDate(event.createdAt) },
                ].map((field) => (
                  <Box key={field.label} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>{field.label}</Typography>
                    <Typography variant="body2">{field.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button variant="contained" startIcon={<Edit size={16} />} onClick={onEdit}>Edit Event</Button>
        </DialogActions>
      </>
    );
  };
  
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
        { label: 'Event Type', field: 'event_type', options: ['All', ...Object.values(EVENT_TYPES)] },
        { label: 'Status', field: 'status', options: ['All', ...Object.values(EVENT_STATUSES)] },
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
      errors={errors}
      setErrors={setErrors}
    />
  );
}

export default AdminEvents;