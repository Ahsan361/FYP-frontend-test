import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Menu, MenuItem, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem as SelectMenuItem, FormControl, InputLabel,
} from '@mui/material';
import { MoreVertical, Edit, Trash2, Eye, Calendar, MapPin, Users, DollarSign, CheckCircle, Star, Search, Filter, } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

//custom componets
import { Card, Input } from '../../components/ui';

//api services
import { getExhibitions, createExhibition, updateExhibition, deleteExhibition, getExhibitionStats } from '../../services/ExhibitionService';

//constants
import { EXHIBITION_CATEGORIES, EVENT_STATUSES } from '../../constants/enum';

//importing context for user data here
import { UserContext } from "../../contexts/UserContext";

// Colors for categories and statuses
const categoryColors = {
  [EXHIBITION_CATEGORIES.ART]: 'primary',
  [EXHIBITION_CATEGORIES.HISTORY]: 'success',
  [EXHIBITION_CATEGORIES.SCIENCE]: 'info',
  [EXHIBITION_CATEGORIES.OTHER]: 'warning',
};

const statusColors = {
  [EVENT_STATUSES.UPCOMING]: '#2196F3',
  [EVENT_STATUSES.ONGOING]: '#4CAF50',
  [EVENT_STATUSES.COMPLETED]: '#9E9E9E',
};

function AdminExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: EXHIBITION_CATEGORIES.ART,
    status: EVENT_STATUSES.UPCOMING,
    start_date: '',
    end_date: '',
    location: '',
    max_capacity: '',
    entry_fee: 0,
    age_restriction: '',
    banner_image_url: '',
    is_featured: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [stats, setStats] = useState({
    totalExhibitions: 0,
    featuredExhibitions: 0,
    totalBookings: 0,
    revenueGenerated: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const { user } = useContext(UserContext);
  const token = user?.token;

  // Fetch exhibitions and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const exhibitionsData = await getExhibitions();
        setExhibitions(exhibitionsData);

        // Fetch stats from backend
        const statsData = await getExhibitionStats();
        setStats({
          totalExhibitions: statsData.totalExhibitions,
          featuredExhibitions: statsData.featuredExhibitions,
          totalBookings: statsData.totalBookings,
          revenueGenerated: statsData.revenueGenerated.toFixed(2),
        });
        setCategoryData(statsData.categoryData);
      } catch (error) {
        console.error("❌ Error fetching exhibitions/stats:", error);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
  try {
    const exhibitionsData = await getExhibitions();
    setExhibitions(exhibitionsData);

    const statsData = await getExhibitionStats();
    setStats({
      totalExhibitions: statsData.totalExhibitions,
      featuredExhibitions: statsData.featuredExhibitions,
      totalBookings: statsData.totalBookings,
      revenueGenerated: statsData.revenueGenerated.toFixed(2),
    });
    setCategoryData(statsData.categoryData);
  } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleMenuClick = (event, exhibition) => {
    setAnchorEl(event.currentTarget);
    setSelectedExhibition(exhibition);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFormOpen = (exhibition = null) => {
    if (exhibition) {
      setFormData({
        title: exhibition.title,
        description: exhibition.description || '',
        category: exhibition.category,
        status: exhibition.status,
        start_date: new Date(exhibition.start_date).toISOString().slice(0, 16),
        end_date: new Date(exhibition.end_date).toISOString().slice(0, 16),
        location: exhibition.location || '',
        max_capacity: exhibition.max_capacity || '',
        entry_fee: exhibition.entry_fee || 0,
        age_restriction: exhibition.age_restriction || '',
        banner_image_url: exhibition.banner_image_url || '',
        is_featured: exhibition.is_featured,
      });
      setIsEditMode(true);
    } else {
      setFormData({
        title: '',
        description: '',
        category: EXHIBITION_CATEGORIES.ART,
        status: EVENT_STATUSES.UPCOMING,
        start_date: '',
        end_date: '',
        location: '',
        max_capacity: '',
        entry_fee: 0,
        age_restriction: '',
        banner_image_url: '',
        is_featured: false,
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
      category: EXHIBITION_CATEGORIES.ART,
      status: EVENT_STATUSES.UPCOMING,
      start_date: '',
      end_date: '',
      location: '',
      max_capacity: '',
      entry_fee: 0,
      age_restriction: '',
      banner_image_url: '',
      is_featured: false,
    });
    setIsEditMode(false);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return; // stop if validation fails
    try {
      if (isEditMode) {
        await updateExhibition(selectedExhibition._id, formData, token);
      } else {
        await createExhibition(formData, token);
      }
      handleFormClose();
      await refreshData(); 
    } catch (error) {
        console.error("Error submitting form:", error);
      }
  };

  const handleDelete = async () => {
  try {
    await deleteExhibition(selectedExhibition._id, token);
    handleMenuClose();
    await refreshData(); 
  } catch (error) {
      console.error("Error deleting exhibition:", error);
    }
  };

  const filteredExhibitions = exhibitions.filter(
    (exhibition) =>
      (exhibition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exhibition.description && exhibition.description.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedCategory === 'All' || exhibition.category === selectedCategory) &&
      (selectedStatus === 'All' || exhibition.status === selectedStatus)
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
    if (!formData.start_date) {
      newErrors.start_date = "Start date & time is required";
    } else {
      const startDate = new Date(formData.start_date);
      if (isNaN(startDate.getTime())) {
        newErrors.start_date = "Invalid start date & time";
      } else if (startDate <= now) {
        newErrors.start_date = "Start date must be in the future";
      }
    }

    // End Date
    if (!formData.end_date) {
      newErrors.end_date = "End date & time is required";
    } else {
      const endDate = new Date(formData.end_date);
      const startDate = new Date(formData.start_date);

      if (isNaN(endDate.getTime())) {
        newErrors.end_date = "Invalid end date & time";
      } else if (formData.start_date && endDate <= startDate) {
        newErrors.end_date = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
  let error = "";

  if (name === "title") {
    if (!value.trim()) error = "Title is required";
  }

  if (name === "start_date") {
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

  if (name === "end_date") {
    if (!value) {
      error = "End date & time is required";
    } else {
      const endDate = new Date(value);
      const startDate = new Date(formData.start_date);
      if (isNaN(endDate.getTime())) {
        error = "Invalid end date & time";
      } else if (formData.start_date && endDate <= startDate) {
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
            Exhibitions Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage exhibitions
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Calendar size={20} />} sx={{ px: 3, py: 1.5 }} onClick={() => handleFormOpen()}>
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
                { label: 'Total Exhibitions', value: stats.totalExhibitions, icon: Calendar },
                { label: 'Featured Exhibitions', value: stats.featuredExhibitions, icon: Star },
                { label: 'Total Bookings', value: stats.totalBookings, icon: Users },
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
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <SelectMenuItem value="All">All</SelectMenuItem>
                {Object.values(EXHIBITION_CATEGORIES).map(category => (
                  <SelectMenuItem key={category} value={category} sx={{ textTransform: 'capitalize' }}>
                    {category}
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
                <TableRow key={exhibition._id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {exhibition.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {exhibition.description?.substring(0, 50) || 'N/A'}...
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
          <MenuItem onClick={() => {
            handleFormOpen(selectedExhibition);
            handleMenuClose();
          }}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit Exhibition
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
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
                          Curator
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedExhibition.curator_id?.username || selectedExhibition.curator_id || 'N/A'}
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
                <Button variant="contained" startIcon={<Edit size={16} />} onClick={() => {
                  handleFormOpen(selectedExhibition);
                  setOpenDialog(false);
                }}>
                  Edit Exhibition
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Exhibition Form Dialog */}
        <Dialog open={openFormDialog} onClose={handleFormClose} maxWidth="md" fullWidth>
          <DialogTitle>{isEditMode ? 'Edit Exhibition' : 'Create Exhibition'}</DialogTitle>
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
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    label="Category"
                  >
                    {Object.values(EXHIBITION_CATEGORIES).map(category => (
                      <SelectMenuItem key={category} value={category} sx={{ textTransform: 'capitalize' }}>
                        {category}
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
                  value={formData.start_date}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, start_date: value });
                    validateField("start_date", value);
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.start_date}
                  helperText={errors.start_date}                  
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="End Date & Time"
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, end_date: value });
                    validateField("end_date", value);
                  }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.end_date}
                  helperText={errors.end_date}                  
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
                  label="Max Capacity"
                  type="number"
                  value={formData.max_capacity}
                  onChange={(e) => setFormData({ ...formData, max_capacity: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Entry Fee"
                  type="number"
                  value={formData.entry_fee}
                  onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Age Restriction"
                  value={formData.age_restriction}
                  onChange={(e) => setFormData({ ...formData, age_restriction: e.target.value })}
                  fullWidth
                />
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
                  <InputLabel>Is Featured</InputLabel>
                  <Select
                    value={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.value })}
                    label="Is Featured"
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
        </Card>
      </Box>
  );
}

export default AdminExhibitions;