import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, Avatar, TableCell, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Upload, Eye, Edit, Trash2, Calendar } from 'lucide-react';

// Import the reusable AdminTable component
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';

// Context
import { UserContext } from '../../contexts/UserContext';

// Services
import { getArtifacts, createArtifact, editArtifact, deleteArtifact, getArtifactStats } from '../../services/artifactService';

// Constants
import { CATEGORY_OPTIONS, CONDITION_OPTIONS, STATUS_OPTIONS } from '../../constants/enum';

// Sample views data
const viewsData = [
  { date: '01/15', views: 1200 },
  { date: '01/22', views: 1800 },
  { date: '01/29', views: 2400 },
  { date: '02/05', views: 1900 },
  { date: '02/12', views: 2800 },
  { date: '02/19', views: 3200 },
  { date: '02/26', views: 2950 }
];

// Status colors
const statusColors = {
  Published: 'success',
  'Under Review': 'warning',
  Draft: 'default',
  Rejected: 'error'
};

function AdminArtifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    underReview: 0
  });
  const { user } = useContext(UserContext);

  // Fetch artifacts and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtifacts(user.token);
        setArtifacts(data || []);
        const statsData = await getArtifactStats(user.token);
        setStats(statsData || { total: 0, published: 0, drafts: 0, underReview: 0 });
      } catch (error) {
        console.error('Error fetching artifacts or stats:', error);
      }
    };
    fetchData();
  }, []);

  // Table columns configuration
  const tableColumns = [
    { field: 'title', label: 'Title' },
    { field: 'category', label: 'Category' },
    { field: 'material', label: 'Material' },
    { field: 'time_period', label: 'Time Period' },
    { field: 'geographical_origin', label: 'Origin' },
    { field: 'artistic_style', label: 'Style' },
    { field: 'condition_status', label: 'Condition' },
    { field: 'status', label: 'Status' },
    { field: 'view_count', label: 'Views', align: 'center' },
    { field: 'contributor', label: 'Contributor' }
  ];

  // Form fields configuration
  const formFields = [
    { name: 'title', label: 'Title', required: true, gridSize: { xs: 12, sm: 6 } },
    { name: 'description', label: 'Description', gridSize: { xs: 12, sm: 6 } },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: CATEGORY_OPTIONS.map(option => ({ value: option, label: option })),
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'condition_status',
      label: 'Condition',
      type: 'select',
      required: true,
      options: CONDITION_OPTIONS.map(option => ({ value: option, label: option })),
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS.map(option => ({ value: option, label: option })),
      gridSize: { xs: 12, sm: 6 }
    },
    { name: 'material', label: 'Material', gridSize: { xs: 12, sm: 6 } },
    { name: 'time_period', label: 'Time Period', gridSize: { xs: 12, sm: 6 } },
    { name: 'geographical_origin', label: 'Origin', gridSize: { xs: 12, sm: 6 } },
    { name: 'artistic_style', label: 'Artistic Style', gridSize: { xs: 12, sm: 6 } },
    {
      name: 'dimensions_length',
      label: 'Dimensions Length (cm)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'dimensions_width',
      label: 'Dimensions Width (cm)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'dimensions_height',
      label: 'Dimensions Height (cm)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 }
    },
    { name: 'weight', label: 'Weight (kg)', type: 'number', gridSize: { xs: 12, sm: 6 } },
    {
      name: 'cultural_significance',
      label: 'Cultural Significance',
      gridSize: { xs: 12, sm: 6 }
    },
    { name: 'historical_context', label: 'Historical Context', gridSize: { xs: 12, sm: 6 } },
    { name: 'artifactImage', label: 'Artifact Image', type: 'file', gridSize: { xs: 12, sm: 6 } }
  ];

  // Stats data configuration
  const statsData = [
    { label: 'Total Artifacts', value: stats.total, icon: Eye },
    { label: 'Published', value: stats.published, icon: Eye },
    { label: 'Under Review', value: stats.underReview, icon: Calendar },
    { label: 'Drafts', value: stats.drafts, icon: Edit }
  ];

  // Validation functions
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.condition_status) {
      newErrors.condition_status = 'Condition is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (formData.dimensions_length && isNaN(formData.dimensions_length)) {
      newErrors.dimensions_length = 'Length must be a valid number';
    }

    if (formData.dimensions_width && isNaN(formData.dimensions_width)) {
      newErrors.dimensions_width = 'Width must be a valid number';
    }

    if (formData.dimensions_height && isNaN(formData.dimensions_height)) {
      newErrors.dimensions_height = 'Height must be a valid number';
    }

    if (formData.weight && isNaN(formData.weight)) {
      newErrors.weight = 'Weight must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = '';

    if (name === 'title' && !value?.trim()) {
      error = 'Title is required';
    }

    if (name === 'category' && !value) {
      error = 'Category is required';
    }

    if (name === 'condition_status' && !value) {
      error = 'Condition is required';
    }

    if (name === 'status' && !value) {
      error = 'Status is required';
    }

    if (
      ['dimensions_length', 'dimensions_width', 'dimensions_height', 'weight'].includes(name) &&
      value &&
      isNaN(value)
    ) {
      error = `${name.replace('_', ' ')} must be a valid number`;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        await editArtifact(selectedItem._id, formData, user.token);
      } else {
        await createArtifact(formData, user.token);
      }
      const updated = await getArtifacts(user.token);
      setArtifacts(updated || []);
      const updatedStats = await getArtifactStats(user.token);
      setStats(updatedStats || { total: 0, published: 0, drafts: 0, underReview: 0 });
    } catch (error) {
      console.error('Error saving artifact:', error);
      throw error;
    }
  };

  // Handle menu actions
  const handleMenuAction = async (action, item) => {
    if (action === 'delete') {
      try {
        await deleteArtifact(item._id, user.token);
        const updated = await getArtifacts(user.token);
        setArtifacts(updated || []);
        const updatedStats = await getArtifactStats(user.token);
        setStats(updatedStats || { total: 0, published: 0, drafts: 0, underReview: 0 });
      } catch (error) {
        console.error('Error deleting artifact:', error);
      }
    }
  };

  // Custom table row renderer
  const renderTableRow = (artifact) => (
    <>
      <TableCell>{artifact.title}</TableCell>
      <TableCell>{artifact.category}</TableCell>
      <TableCell>{artifact.material || '-'}</TableCell>
      <TableCell>{artifact.time_period || '-'}</TableCell>
      <TableCell>{artifact.geographical_origin || '-'}</TableCell>
      <TableCell>{artifact.artistic_style || '-'}</TableCell>
      <TableCell>{artifact.condition_status}</TableCell>
      <TableCell>
        <Chip
          label={artifact.status}
          color={statusColors[artifact.status] || 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>
      <TableCell align="center">{artifact.view_count?.toLocaleString() || 0}</TableCell>
      <TableCell>{artifact.contributor_id?.username || 'Unknown'}</TableCell>
    </>
  );

  // Custom details dialog renderer
  const renderDetailsDialog = (artifact, onClose, onEdit) => (
    <>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            {artifact.title}
          </Typography>
          <Chip
            label={artifact.status}
            color={statusColors[artifact.status] || 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Avatar
              src={artifact.artifactImage?.url || '/api/placeholder/200/200'}
              sx={{ width: '100%', height: 200 }}
              variant="rounded"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              {[
                { label: 'Description', value: artifact.description || '-' },
                { label: 'Category', value: artifact.category },
                { label: 'Material', value: artifact.material || '-' },
                { label: 'Time Period', value: artifact.time_period || '-' },
                { label: 'Origin', value: artifact.geographical_origin || '-' },
                { label: 'Artistic Style', value: artifact.artistic_style || '-' },
                { label: 'Condition', value: artifact.condition_status },
                {
                  label: 'Dimensions',
                  value: `${artifact.dimensions_length || 0} x ${artifact.dimensions_width || 0} x ${artifact.dimensions_height || 0} cm`
                },
                { label: 'Weight', value: artifact.weight ? `${artifact.weight} kg` : '-' },
                { label: 'Cultural Significance', value: artifact.cultural_significance || '-' },
                { label: 'Historical Context', value: artifact.historical_context || '-' },
                { label: 'Status', value: artifact.status },
                { label: 'Featured', value: artifact.is_featured ? 'Yes' : 'No' },
                { label: 'Views', value: `${artifact.view_count?.toLocaleString() || 0} views` },
                { label: 'Contributor', value: artifact.contributor_id?.username || 'Unknown' },
                { label: 'Curator', value: artifact.curator_id?.username || 'Unknown' },
                {
                  label: 'Published At',
                  value: artifact.published_at ? new Date(artifact.published_at).toLocaleDateString() : '-'
                }
              ].map((field, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {field.label}
                  </Typography>
                  <Typography variant="body1">{field.value}</Typography>
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
          Edit Artifact
        </Button>
      </DialogActions>
    </>
  );

  return (
    <AdminTable
      title="Artifacts Management"
      subtitle="Manage and monitor your cultural heritage artifacts"
      createButtonText="Add New Artifact"
      createButtonIcon={<Upload size={20} />}
      chartData={viewsData}
      chartType="area"
      chartDataKey="views"
      chartXAxisKey="date"
      chartTitle="Artifact Views Over Time"
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={artifacts}
      searchFields={['title']}
      filterOptions={{
        label: 'Category',
        field: 'category',
        options: ['All', ...CATEGORY_OPTIONS]
      }}
      onFormSubmit={handleFormSubmit}
      onMenuAction={handleMenuAction}
      renderTableRow={renderTableRow}
      renderDetailsDialog={renderDetailsDialog}
      formFields={formFields}
      validateForm={validateForm}
      validateField={validateField}
      statusColors={statusColors}
      errors={errors} // Add this
      setErrors={setErrors}
    />
  );
}

export default AdminArtifacts;
