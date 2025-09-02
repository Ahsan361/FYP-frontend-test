import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Select, MenuItem as SelectMenuItem, FormControl, InputLabel 
} from '@mui/material';
import { MoreVertical, Edit, Trash2, Eye, Calendar, MapPin, Users, DollarSign, CheckCircle, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Import custom UI components
import { Card, Input } from '../../components/ui';

//importing services
import { getEvents, createEvent, updateEvent, deleteEvent, getEventStats } from '../../services/EventService';

//importing constants for event types and statuses
import { EVENT_TYPES, EVENT_STATUSES, TARGET_AUDIENCES } from '../../constants/enum';

//importing context for user data here
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: EVENT_TYPES.OTHER,
    status: EVENT_STATUSES.UPCOMING,
    start_datetime: '',
    end_datetime: '',
    location: '',
    max_attendees: '',
    registration_fee: 0,
    is_free: false,
    requires_registration: true,
    target_audience: TARGET_AUDIENCES.ALL,
    banner_image_url: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
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
        // Fetch events
        const eventsData = await getEvents();
        setEvents(eventsData);

        // ✅ Fetch stats from backend instead of recalculating
        const statsData = await getEventStats();
        setStats({
          totalEvents: eventsData.length,   // or include in backend if you prefer
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

  const handleMenuClick = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const refreshData = async () => {
    try { 
      // Refresh stats
      const statsData = await getEventStats();
      setStats({
        totalEvents: events.length + (isEditMode ? 0 : 1),
        upcomingEvents: statsData.upcomingEvents,
        totalRegistrations: statsData.totalRegistrations,
        revenueGenerated: statsData.revenueGenerated.toFixed(2),
      });
      setEventTypeData(statsData.typeData);
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  const handleFormOpen = (event = null) => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        event_type: event.event_type,
        status: event.status,
        start_datetime: new Date(event.start_datetime).toISOString().slice(0, 16),
        end_datetime: new Date(event.end_datetime).toISOString().slice(0, 16),
        location: event.location || '',
        max_attendees: event.max_attendees || '',
        registration_fee: event.registration_fee || 0,
        is_free: event.is_free,
        requires_registration: event.requires_registration,
        target_audience: event.target_audience,
        banner_image_url: event.banner_image_url || '',
      });
      setIsEditMode(true);
    } else {
      setFormData({
        title: '',
        description: '',
        event_type: EVENT_TYPES.OTHER,
        status: EVENT_STATUSES.UPCOMING,
        start_datetime: '',
        end_datetime: '',
        location: '',
        max_attendees: '',
        registration_fee: 0,
        is_free: false,
        requires_registration: true,
        target_audience: TARGET_AUDIENCES.ALL,
        banner_image_url: '',
      });
      setIsEditMode(false);
    }
    setOpenFormDialog(true);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
    setFormData({
      title: '',
      description: '',
      event_type: EVENT_TYPES.OTHER,
      status: EVENT_STATUSES.UPCOMING,
      start_datetime: '',
      end_datetime: '',
      location: '',
      max_attendees: '',
      registration_fee: 0,
      is_free: false,
      requires_registration: true,
      target_audience: TARGET_AUDIENCES.ALL,
      banner_image_url: '',
    });
    setIsEditMode(false);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return; 

    try {
      if (isEditMode) {
        const updatedEvent = await updateEvent(selectedEvent._id, formData, token);
        setEvents(events.map(event => event._id === updatedEvent._id ? updatedEvent : event));
      } else {
        const newEvent = await createEvent(formData, token);
        setEvents([...events, newEvent]);
      }
      handleFormClose();
      refreshData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(selectedEvent._id, token);
      setEvents(events.filter(event => event._id !== selectedEvent._id));
      handleMenuClose();
      refreshData();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedEventType === 'All' || event.event_type === selectedEventType) &&
      (selectedStatus === 'All' || event.status === selectedStatus)
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const now = new Date();

    // Title
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    // Start Date
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

    // End Date
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

  const validateField = (name, value, currentFormData = formData) => {
    let error = "";

    if (name === "title") {
      if (!value.trim()) error = "Title is required";
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
        const startDate = new Date(currentFormData.start_datetime); // ✅ use passed state
        if (isNaN(endDate.getTime())) {
          error = "Invalid end date & time";
        } else if (currentFormData.start_datetime && endDate <= startDate) {
          error = "End date must be after start date";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Events Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage events
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Calendar size={20} />} sx={{ px: 3, py: 1.5 }} onClick={() => handleFormOpen()}>
          Create Event
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Event Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={eventTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1B4332" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Event Statistics
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: 'Total Events', value: stats.totalEvents, icon: Calendar },
                { label: 'Upcoming Events', value: stats.upcomingEvents, icon: CheckCircle },
                { label: 'Total Registrations', value: stats.totalRegistrations, icon: Users },
                { label: 'Revenue Generated', value: `$${stats.revenueGenerated}`, icon: DollarSign },
              ].map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <stat.icon size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{stat.label}</Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <Input
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={20} />}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                label="Event Type"
              >
                <SelectMenuItem value="All">All</SelectMenuItem>
                {Object.values(EVENT_TYPES).map(type => (
                  <SelectMenuItem key={type} value={type} sx={{ textTransform: 'capitalize' }}>
                    {type}
                  </SelectMenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                label="Status"
              >
                <SelectMenuItem value="All">All</SelectMenuItem>
                {Object.values(EVENT_STATUSES).map(status => (
                  <SelectMenuItem key={status} value={status} sx={{ textTransform: 'capitalize' }}>
                    {status}
                  </SelectMenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Calendar size={20} />}
              fullWidth
            >
              Date Range
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Events Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Event Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="center">Registrations</TableCell>
                <TableCell align="center">Fee</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event._id} hover>
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
                      {event.is_free ? 'Free' : `$${event.registration_fee}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, event)}>
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              setOpenDialog(true);
              handleMenuClose();
            }}
          >
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => {
            handleFormOpen(selectedEvent);
            handleMenuClose();
          }}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit Event
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete Event
          </MenuItem>
        </Menu>

        {/* Event Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          {selectedEvent && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Event Details
                  </Typography>
                  <Chip
                    label={selectedEvent.event_type}
                    color={eventTypeColors[selectedEvent.event_type]}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Title
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedEvent.title}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body2">{selectedEvent.description || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Organizer
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedEvent.organizer_id?.username || selectedEvent.organizer_id || 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Dates
                        </Typography>
                        <Typography variant="body2">
                          <strong>Start:</strong> {formatDate(selectedEvent.start_datetime)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>End:</strong> {formatDate(selectedEvent.end_datetime)}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Location
                        </Typography>
                        <Typography variant="body2">{selectedEvent.location || 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Attendees
                        </Typography>
                        <Typography variant="body2">
                          <strong>Current:</strong> {selectedEvent.current_registrations}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Max:</strong> {selectedEvent.max_attendees || 'Unlimited'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Registration
                        </Typography>
                        <Typography variant="body2">
                          <strong>Fee:</strong> {selectedEvent.is_free ? 'Free' : `$${selectedEvent.registration_fee}`}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Required:</strong> {selectedEvent.requires_registration ? 'Yes' : 'No'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Target Audience
                        </Typography>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {selectedEvent.target_audience}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Banner Image
                        </Typography>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                          {selectedEvent.banner_image_url || 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Created At
                        </Typography>
                        <Typography variant="body2">{formatDate(selectedEvent.created_at)}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
                <Button variant="contained" startIcon={<Edit size={16} />} onClick={() => {
                  handleFormOpen(selectedEvent);
                  setOpenDialog(false);
                }}>
                  Edit Event
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Event Form Dialog */}
        <Dialog open={openFormDialog} onClose={handleFormClose} maxWidth="md" fullWidth>
          <DialogTitle>{isEditMode ? 'Edit Event' : 'Create Event'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Title"
                  value={formData.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, title: value });
                    validateField("title", value);
                  }}
                  fullWidth
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    label="Event Type"
                  >
                    {Object.values(EVENT_TYPES).map(type => (
                      <SelectMenuItem key={type} value={type} sx={{ textTransform: 'capitalize' }}>
                        {type}
                      </SelectMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    label="Status"
                  >
                    {Object.values(EVENT_STATUSES).map(status => (
                      <SelectMenuItem key={status} value={status} sx={{ textTransform: 'capitalize' }}>
                        {status}
                      </SelectMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Start Date & Time"
                  type="datetime-local"
                  value={formData.start_datetime}
                  onChange={(e) => {
                    const value = e.target.value;
                    const nextFormData = { ...formData, start_datetime: value };
                    setFormData(nextFormData);
                    validateField("start_datetime", value, nextFormData);
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.start_datetime}
                  helperText={errors.start_datetime}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="End Date & Time"
                  type="datetime-local"
                  value={formData.end_datetime}
                  onChange={(e) => {
                    const value = e.target.value;
                    const nextFormData = { ...formData, end_datetime: value };
                    setFormData(nextFormData);
                    validateField("end_datetime", value, nextFormData);
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.end_datetime}
                  helperText={errors.end_datetime}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Max Attendees"
                  type="number"
                  value={formData.max_attendees}
                  onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Registration Fee"
                  type="number"
                  value={formData.registration_fee}
                  onChange={(e) => setFormData({ ...formData, registration_fee: e.target.value })}
                  fullWidth
                  disabled={formData.is_free}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Target Audience</InputLabel>
                  <Select
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    label="Target Audience"
                  >
                    {Object.values(TARGET_AUDIENCES).map(audience => (
                      <SelectMenuItem key={audience} value={audience} sx={{ textTransform: 'capitalize' }}>
                        {audience}
                      </SelectMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Banner Image URL"
                  value={formData.banner_image_url}
                  onChange={(e) => setFormData({ ...formData, banner_image_url: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Is Free</InputLabel>
                  <Select
                    value={formData.is_free}
                    onChange={(e) => setFormData({ ...formData, is_free: e.target.value, registration_fee: e.target.value ? 0 : formData.registration_fee })}
                    label="Is Free"
                  >
                    <SelectMenuItem value={true}>Yes</SelectMenuItem>
                    <SelectMenuItem value={false}>No</SelectMenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Requires Registration</InputLabel>
                  <Select
                    value={formData.requires_registration}
                    onChange={(e) => setFormData({ ...formData, requires_registration: e.target.value })}
                    label="Requires Registration"
                  >
                    <SelectMenuItem value={true}>Yes</SelectMenuItem>
                    <SelectMenuItem value={false}>No</SelectMenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleFormClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleFormSubmit}>
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
        </ Card>
      </Box>
      
  );
}

export default AdminEvents;