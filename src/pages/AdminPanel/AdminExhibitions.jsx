import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, TableCell, Grid, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Calendar, MapPin, Star, CheckCircle, Edit } from 'lucide-react';


// Import the reusable custom components
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';

// API services
import { getExhibitions, createExhibition, updateExhibition, deleteExhibition, getExhibitionStats } from '../../services/ExhibitionService';

// Constants
import { EXHIBITION_CATEGORIES, EVENT_STATUSES } from '../../constants/enum';

// Context
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
  const [stats, setStats] = useState({
    totalExhibitions: 0,
    featuredExhibitions: 0,
    totalBookings: 0,
    revenueGenerated: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const exhibitionsData = await getExhibitions(user.token);
      setExhibitions(exhibitionsData);

      const statsData = await getExhibitionStats(user.token);
      setStats({
        totalExhibitions: statsData.totalExhibitions,
        featuredExhibitions: statsData.featuredExhibitions,
        totalBookings: statsData.totalBookings,
        revenueGenerated: statsData.revenueGenerated.toFixed(2),
      });
      setCategoryData(statsData.categoryData);
    } catch (error) {
      console.error("Error fetching exhibitions/stats:", error);
    }
  };

  // Table configuration
  const tableColumns = [
    { field: 'title', label: 'Title' },
    { field: 'category', label: 'Category' },
    { field: 'status', label: 'Status' },
    { field: 'start_date', label: 'Start Date' },
    { field: 'location', label: 'Location' },
    { field: 'bookings', label: 'Bookings', align: 'center' },
    { field: 'entry_fee', label: 'Entry Fee', align: 'center' },
    { field: 'featured', label: 'Featured', align: 'center' },
  ];

  // Form fields configuration
  const formFields = [
    { name: 'title', label: 'Title', required: true, gridSize: { xs: 12 } },
    { name: 'description', label: 'Description', multiline: true, rows: 4, gridSize: { xs: 12 } },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select', 
      required: true,
      options: Object.values(EXHIBITION_CATEGORIES).map(cat => ({ value: cat, label: cat })),
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
    { name: 'start_date', label: 'Start Date & Time', type: 'datetime-local', required: true, gridSize: { xs: 12, md: 6 } },
    { name: 'end_date', label: 'End Date & Time', type: 'datetime-local', required: true, gridSize: { xs: 12, md: 6 } },
    { name: 'location', label: 'Location', gridSize: { xs: 12 } },
    { name: 'max_capacity', label: 'Max Capacity', type: 'number', gridSize: { xs: 12, md: 6 } },
    { name: 'entry_fee', label: 'Entry Fee', type: 'number', gridSize: { xs: 12, md: 6 } },
    { name: 'age_restriction', label: 'Age Restriction', gridSize: { xs: 12, md: 6 } },
    { name: 'banner_image_url', label: 'Banner Image URL', gridSize: { xs: 12, md: 6 } },
    { 
      name: 'is_featured', 
      label: 'Is Featured', 
      type: 'select',
      options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
      gridSize: { xs: 12, md: 6 }
    },
  ];

  // Stats data for the component
  const statsData = [
    { label: 'Total Exhibitions', value: stats.totalExhibitions, icon: Calendar },
    { label: 'Featured Exhibitions', value: stats.featuredExhibitions, icon: Star },
    { label: 'Total Bookings', value: stats.totalBookings, icon: MapPin },
    { label: 'Revenue Generated', value: `$${stats.revenueGenerated}`, icon: CheckCircle },
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
    const now = new Date();

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

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

  const validateField = (name, value, formData, setErrors) => {
    let error = "";

    if (name === "title" && !value?.trim()) {
      error = "Title is required";
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

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        await updateExhibition(selectedItem._id, formData, user.token);
      } else {
        await createExhibition(formData, user.token);
      }
      await fetchData(); // Refresh data
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  // Handle menu actions
  const handleMenuAction = async (action, item) => {
    if (action === 'delete') {
      try {
        await deleteExhibition(item._id, user.token);
        await fetchData(); // Refresh data
      } catch (error) {
        console.error("Error deleting exhibition:", error);
      }
    }
  };

  // Custom table row renderer
  const renderTableRow = (exhibition) => (
    <>
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
    </>
  );

  // Custom details dialog renderer
  const renderDetailsDialog = (exhibition, onClose, onEdit) => (
    <>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Exhibition Details
          </Typography>
          <Chip
            label={exhibition.category}
            color={categoryColors[exhibition.category]}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ space: 3 }}>
              {[
                { label: "Title", value: exhibition.title },
                { label: "Description", value: exhibition.description || 'N/A' },
                { label: "Curator", value: exhibition.curator_id?.username || exhibition.curator_id || 'N/A' },
                { label: "Start Date", value: formatDate(exhibition.start_date) },
                { label: "End Date", value: formatDate(exhibition.end_date) },
                { label: "Location", value: exhibition.location || 'N/A' },
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
                { label: "Current Bookings", value: exhibition.current_bookings },
                { label: "Max Capacity", value: exhibition.max_capacity || 'Unlimited' },
                { label: "Entry Fee", value: exhibition.entry_fee === 0 ? 'Free' : `$${exhibition.entry_fee}` },
                { label: "Age Restriction", value: exhibition.age_restriction || 'None' },
                { label: "Banner Image", value: exhibition.banner_image_url || 'N/A' },
                { label: "Featured", value: exhibition.is_featured ? 'Yes' : 'No' },
                { label: "Created At", value: formatDate(exhibition.created_at) },
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
        <Button variant="contained" startIcon={<Edit size={16} />} onClick={onEdit}>
          Edit Exhibition
        </Button>
      </DialogActions>
    </>
  );

  return (
    <AdminTable
      title="Exhibitions Management"
      subtitle="Monitor and manage exhibitions"
      createButtonText="Create Exhibition"
      createButtonIcon={<Calendar size={20} />}
      chartData={categoryData}
      chartType="bar"
      chartDataKey="count"
      chartTitle="Exhibition Category Distribution"
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={exhibitions}
      searchFields={['title', 'description']}
      filterOptions={{
        label: 'Category',
        field: 'category',
        options: Object.values(EXHIBITION_CATEGORIES)
      }}
      onFormSubmit={handleFormSubmit}
      onMenuAction={handleMenuAction}
      renderTableRow={renderTableRow}
      renderDetailsDialog={renderDetailsDialog}
      formFields={formFields}
      validateForm={validateForm}
      validateField={validateField}
      statusColors={statusColors}
      categoryColors={categoryColors}
    />
  );
}

export default AdminExhibitions;