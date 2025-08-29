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
  Star,
  Search,
  Filter,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Input } from '../../components/ui';

// Sample exhibition data based on exhibitionSchema
const exhibitions = [
  {
    id: 1,
    title: 'Modern Art Showcase',
    description: 'Contemporary art from local artists',
    curator_id: '60f1b2a3c4d5e6f7a8b9c0d1',
    category: 'art',
    status: 'upcoming',
    start_date: '2025-11-01T10:00:00Z',
    end_date: '2025-11-15T18:00:00Z',
    location: 'City Art Gallery, Islamabad',
    max_capacity: 300,
    current_bookings: 120,
    entry_fee: 15,
    age_restriction: 'All ages',
    banner_image_url: 'https://example.com/art_banner.jpg',
    is_featured: true,
    created_at: '2025-08-15T09:00:00Z',
  },
  {
    id: 2,
    title: 'Ancient Civilizations Exhibit',
    description: 'Artifacts from Indus Valley Civilization',
    curator_id: '60f1b2a3c4d5e6f7a8b9c0d2',
    category: 'history',
    status: 'ongoing',
    start_date: '2025-08-20T09:00:00Z',
    end_date: '2025-09-05T17:00:00Z',
    location: 'National Museum, Karachi',
    max_capacity: 500,
    current_bookings: 450,
    entry_fee: 0,
    age_restriction: '12+',
    banner_image_url: 'https://example.com/history_banner.jpg',
    is_featured: false,
    created_at: '2025-07-20T14:00:00Z',
  },
  {
    id: 3,
    title: 'Space Exploration Expo',
    description: 'Interactive science exhibition on space technology',
    curator_id: '60f1b2a3c4d5e6f7a8b9c0d3',
    category: 'science',
    status: 'completed',
    start_date: '2025-06-01T10:00:00Z',
    end_date: '2025-06-10T18:00:00Z',
    location: 'Science Center, Lahore',
    max_capacity: 200,
    current_bookings: 180,
    entry_fee: 20,
    age_restriction: '8+',
    banner_image_url: 'https://example.com/science_banner.jpg',
    is_featured: true,
    created_at: '2025-05-10T11:00:00Z',
  },
];

// Sample chart data for exhibition categories
const categoryData = [
  { name: 'Art', count: 20, color: '#627EEA' },
  { name: 'History', count: 15, color: '#8247E5' },
  { name: 'Science', count: 10, color: '#F3BA2F' },
  { name: 'Other', count: 5, color: '#E84142' },
];

// Colors for categories and statuses
const categoryColors = {
  art: 'primary',
  history: 'success',
  science: 'info',
  other: 'warning',
};

const statusColors = {
  upcoming: '#2196F3',
  ongoing: '#4CAF50',
  completed: '#9E9E9E',
};

function AdminExhibitions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, exhibition) => {
    setAnchorEl(event.currentTarget);
    setSelectedExhibition(exhibition);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExhibition(null);
  };

  const filteredExhibitions = exhibitions.filter(
    (exhibition) =>
      (exhibition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exhibition.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || exhibition.category === selectedCategory) &&
      (selectedStatus === 'All' || exhibition.status === selectedStatus)
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
            Exhibitions Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage exhibitions
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Calendar size={20} />} sx={{ px: 3, py: 1.5 }}>
          Create Exhibition
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Exhibition Category Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={categoryData}>
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
              Exhibition Statistics
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: 'Total Exhibitions', value: '50', icon: Calendar },
                { label: 'Featured Exhibitions', value: '8', icon: Star },
                { label: 'Total Bookings', value: '3,200', icon: Users },
                { label: 'Revenue Generated', value: '$7,890', icon: DollarSign },
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
              Category Filter
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
            >
              Status Filter
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

      {/* Exhibitions Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="center">Bookings</TableCell>
                <TableCell align="center">Entry Fee</TableCell>
                <TableCell align="center">Featured</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExhibitions.map((exhibition) => (
                <TableRow key={exhibition.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {exhibition.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {exhibition.description?.substring(0, 50)}...
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={exhibition.category}
                      color={categoryColors[exhibition.category]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={exhibition.status}
                      sx={{
                        backgroundColor: `${statusColors[exhibition.status]}20`,
                        color: statusColors[exhibition.status],
                        fontWeight: 'medium',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(exhibition.start_date)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MapPin size={16} style={{ marginRight: 4 }} />
                      <Typography variant="body2">{exhibition.location || 'N/A'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {exhibition.current_bookings}/{exhibition.max_capacity || '∞'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {exhibition.entry_fee === 0 ? 'Free' : `$${exhibition.entry_fee}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {exhibition.is_featured ? (
                      <CheckCircle size={18} color="#4CAF50" />
                    ) : (
                      <Star size={18} color="#B0BEC5" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, exhibition)}>
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
            Edit Exhibition
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete Exhibition
          </MenuItem>
        </Menu>

        {/* Exhibition Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          {selectedExhibition && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Exhibition Details
                  </Typography>
                  <Chip
                    label={selectedExhibition.category}
                    color={categoryColors[selectedExhibition.category]}
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
                          {selectedExhibition.title}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body2">{selectedExhibition.description || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Curator ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedExhibition.curator_id}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Dates
                        </Typography>
                        <Typography variant="body2">
                          <strong>Start:</strong> {formatDate(selectedExhibition.start_date)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>End:</strong> {formatDate(selectedExhibition.end_date)}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Location
                        </Typography>
                        <Typography variant="body2">{selectedExhibition.location || 'N/A'}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Bookings
                        </Typography>
                        <Typography variant="body2">
                          <strong>Current:</strong> {selectedExhibition.current_bookings}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Max Capacity:</strong> {selectedExhibition.max_capacity || 'Unlimited'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Entry Fee
                        </Typography>
                        <Typography variant="body2">
                          {selectedExhibition.entry_fee === 0 ? 'Free' : `$${selectedExhibition.entry_fee}`}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Age Restriction
                        </Typography>
                        <Typography variant="body2">{selectedExhibition.age_restriction || 'None'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Banner Image
                        </Typography>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                          {selectedExhibition.banner_image_url || 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Featured
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {selectedExhibition.is_featured ? (
                            <>
                              <CheckCircle size={18} color="#4CAF50" />
                              <Typography variant="body2" color="success.main">
                                Featured
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Star size={18} color="#B0BEC5" />
                              <Typography variant="body2" color="textSecondary">
                                Not Featured
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Created At
                        </Typography>
                        <Typography variant="body2">{formatDate(selectedExhibition.created_at)}</Typography>
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
                  Edit Exhibition
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminExhibitions;