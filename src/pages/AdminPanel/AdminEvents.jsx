import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Input } from '../../components/ui'; // Assuming these are your custom components

// Sample event data based on eventSchema
const events = [
  {
    id: 1,
    title: 'AI Research Conference 2025',
    description: 'A global conference on AI advancements',
    organizer_id: '60f1b2a3c4d5e6f7a8b9c0d1',
    event_type: 'conference',
    status: 'upcoming',
    start_datetime: '2025-10-15T09:00:00Z',
    end_datetime: '2025-10-17T17:00:00Z',
    location: 'Virtual Event',
    max_attendees: 1000,
    current_registrations: 250,
    registration_fee: 99.99,
    is_free: false,
    requires_registration: true,
    target_audience: 'professionals',
    banner_image_url: 'https://example.com/banner1.jpg',
    created_at: '2025-08-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    description: 'Hands-on workshop for modern web technologies',
    organizer_id: '60f1b2a3c4d5e6f7a8b9c0d2',
    event_type: 'workshop',
    status: 'ongoing',
    start_datetime: '2025-08-28T10:00:00Z',
    end_datetime: '2025-08-30T16:00:00Z',
    location: 'Tech Hub, Karachi',
    max_attendees: 50,
    current_registrations: 45,
    registration_fee: 0,
    is_free: true,
    requires_registration: true,
    target_audience: 'students',
    banner_image_url: 'https://example.com/banner2.jpg',
    created_at: '2025-07-15T14:00:00Z',
  },
  {
    id: 3,
    title: 'Art Exhibition',
    description: 'Showcase of contemporary art',
    organizer_id: '60f1b2a3c4d5e6f7a8b9c0d3',
    event_type: 'exhibition',
    status: 'completed',
    start_datetime: '2025-06-10T11:00:00Z',
    end_datetime: '2025-06-12T18:00:00Z',
    location: 'Art Gallery, Lahore',
    max_attendees: 200,
    current_registrations: 180,
    registration_fee: 10,
    is_free: false,
    requires_registration: false,
    target_audience: 'public',
    banner_image_url: 'https://example.com/banner3.jpg',
    created_at: '2025-05-01T09:00:00Z',
  },
];

// Sample chart data for event types
const eventTypeData = [
  { name: 'Conference', count: 15, color: '#627EEA' },
  { name: 'Workshop', count: 10, color: '#8247E5' },
  { name: 'Seminar', count: 8, color: '#F3BA2F' },
  { name: 'Exhibition', count: 5, color: '#E84142' },
  { name: 'Other', count: 2, color: '#4CAF50' },
];

// Colors for event types and statuses
const eventTypeColors = {
  conference: 'primary',
  workshop: 'success',
  seminar: 'info',
  exhibition: 'warning',
  other: 'secondary',
};

const statusColors = {
  upcoming: '#2196F3',
  ongoing: '#4CAF50',
  completed: '#9E9E9E',
};

function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedEventType === 'All' || event.event_type === selectedEventType) &&
      (selectedStatus === 'All' || event.status === selectedStatus)
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
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
        <Button variant="contained" startIcon={<Calendar size={20} />} sx={{ px: 3, py: 1.5 }}>
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
                { label: 'Total Events', value: '35', icon: Calendar },
                { label: 'Upcoming Events', value: '12', icon: CheckCircle },
                { label: 'Total Registrations', value: '2,450', icon: Users },
                { label: 'Revenue Generated', value: '$5,230', icon: DollarSign },
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
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
              onClick={() => {}}
            >
              Event Type
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
            >
              Status
            </Button>
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
                <TableRow key={event.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {event.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {event.description?.substring(0, 50)}...
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
          <MenuItem onClick={handleMenuClose}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit Event
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
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
                          Organizer ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedEvent.organizer_id}
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
                <Button variant="contained" startIcon={<Edit size={16} />}>
                  Edit Event
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminEvents;