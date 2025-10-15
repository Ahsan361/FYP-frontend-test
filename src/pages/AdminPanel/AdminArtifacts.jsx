import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  TableCell,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem
} from '@mui/material';
import { Upload, Eye, Edit, Calendar } from 'lucide-react';

// Components & Context
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';
import { UserContext } from '../../contexts/UserContext';

// Services & Constants
import { getArtifacts, createArtifact, updateArtifact, deleteArtifact, getArtifactStats } from '../../services/artifactService';
import { CATEGORY_OPTIONS, CONDITION_OPTIONS, STATUS_OPTIONS } from '../../constants/enum';

// Chart sample data
const viewsData = [
  { date: '01/15', views: 1200 },
  { date: '01/22', views: 1800 },
  { date: '01/29', views: 2400 },
  { date: '02/05', views: 1900 },
  { date: '02/12', views: 2800 },
  { date: '02/19', views: 3200 },
  { date: '02/26', views: 2950 }
];

// Status color mapping
const statusColors = {
  Published: 'success',
  'Under Review': 'warning',
  Draft: 'default',
  Rejected: 'error'
};

function AdminArtifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, underReview: 0 });
  const { user } = useContext(UserContext);

  // Fetch artifacts and stats
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

  // Table columns
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

  // --- UPDATED: Allow multiple images upload ---
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
    { name: 'dimensions_length', label: 'Length (cm)', type: 'number', gridSize: { xs: 12, sm: 6 } },
    { name: 'dimensions_width', label: 'Width (cm)', type: 'number', gridSize: { xs: 12, sm: 6 } },
    { name: 'dimensions_height', label: 'Height (cm)', type: 'number', gridSize: { xs: 12, sm: 6 } },
    { name: 'weight', label: 'Weight (kg)', type: 'number', gridSize: { xs: 12, sm: 6 } },
    { name: 'cultural_significance', label: 'Cultural Significance', gridSize: { xs: 12, sm: 6 } },
    { name: 'historical_context', label: 'Historical Context', gridSize: { xs: 12 } },
    {
      name: 'artifactImage',
      label: 'Artifact Images (Max 10)',
      type: 'file',
      multiple: true, 
      gridSize: { xs: 12 }
    }
  ];

  const statsData = [
    { label: 'Total Artifacts', value: stats.total, icon: Eye },
    { label: 'Published', value: stats.published, icon: Eye },
    { label: 'Under Review', value: stats.underReview, icon: Calendar },
    { label: 'Drafts', value: stats.drafts, icon: Edit }
  ];

  // --- VALIDATION (same as original) ---
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.condition_status) newErrors.condition_status = 'Condition is required';
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = '';
    if (name === 'title' && !value?.trim()) error = 'Title is required';
    if (name === 'category' && !value) error = 'Category is required';
    if (name === 'condition_status' && !value) error = 'Condition is required';
    if (name === 'status' && !value) error = 'Status is required';
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // --- FORM SUBMIT / DELETE ---
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        await updateArtifact(selectedItem._id, formData, user.token);
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

  // --- UPDATED: Add thumbnail + count chip in table ---
  const renderTableRow = (artifact) => (
    <>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {artifact.artifactImage && artifact.artifactImage.length > 0 ? (
            <Avatar variant="rounded" src={artifact.artifactImage[0].url} />
          ) : (
            <Avatar variant="rounded" />
          )}
          <Box>
            <Typography variant="body2" fontWeight="medium">{artifact.title}</Typography>
            {artifact.artifactImage && artifact.artifactImage.length > 1 && (
              <Chip label={`+${artifact.artifactImage.length - 1}`} size="small" sx={{ mt: 0.5 }} />
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell>{artifact.category}</TableCell>
      <TableCell>{artifact.material || '-'}</TableCell>
      <TableCell>{artifact.time_period || '-'}</TableCell>
      <TableCell>{artifact.geographical_origin || '-'}</TableCell>
      <TableCell>{artifact.artistic_style || '-'}</TableCell>
      <TableCell>{artifact.condition_status}</TableCell>
      <TableCell>
        <Chip label={artifact.status} color={statusColors[artifact.status] || 'default'} sx={{ textTransform: 'capitalize' }} />
      </TableCell>
      <TableCell align="center">{artifact.view_count?.toLocaleString() || 0}</TableCell>
      <TableCell>{artifact.contributor_id?.username || 'Unknown'}</TableCell>
    </>
  );

  // --- UPDATED: Add multiple image gallery in details view ---
  const renderDetailsDialog = (artifact, onClose, onEdit) => {
    const hasImages = artifact.artifactImage && artifact.artifactImage.length > 0;
    const imageCount = hasImages ? artifact.artifactImage.length : 0;

    return (
      <>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">{artifact.title}</Typography>
            <Chip label={artifact.status} color={statusColors[artifact.status] || 'default'} sx={{ textTransform: 'capitalize' }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {hasImages && (
              <Grid size={{xs:12}}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Artifact Images ({imageCount})
                </Typography>
                <ImageList
                  sx={{ width: '100%', maxHeight: 400, borderRadius: 2 }}
                  cols={imageCount === 1 ? 1 : (imageCount === 2 ? 2 : 3)}
                  rowHeight={200}
                  gap={8}
                >
                  {artifact.artifactImage.map((image, index) => (
                    <ImageListItem
                      key={index}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={image.url}
                        alt={`${artifact.title} - Image ${index + 1}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            )}
            <Grid size={{xs:12}} sx={{ mt: 2 }}>
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
                { label: 'Contributor', value: artifact.contributor_id?.username || 'Unknown' }
              ].map((field) => (
                <Box key={field.label} sx={{ mb: 1.5 }}>
                  <Typography variant="caption" color="textSecondary">{field.label}</Typography>
                  <Typography variant="body2">{field.value}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button variant="contained" startIcon={<Edit size={16} />} onClick={onEdit}>Edit Artifact</Button>
        </DialogActions>
      </>
    );
  };

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
      filterOptions={{ label: 'Category', field: 'category', options: ['All', ...CATEGORY_OPTIONS] }}
      onFormSubmit={handleFormSubmit}
      onMenuAction={handleMenuAction}
      renderTableRow={renderTableRow}
      renderDetailsDialog={renderDetailsDialog}
      formFields={formFields}
      validateForm={validateForm}
      validateField={validateField}
      statusColors={statusColors}
      errors={errors}
      setErrors={setErrors}
    />
  );
}

export default AdminArtifacts;
