import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, TableCell, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Gavel, Edit, DollarSign, Star, EyeIcon, Package } from 'lucide-react';

// Import the reusable AdminTable component
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';

// Context
import { UserContext } from '../../contexts/UserContext';

// Services
import { getListings, createListing, updateListing, deleteListing, getListingStats } from '../../services/listingService';
import { getArtifacts } from '../../services/artifactService';

// Sample chart data for listing revenue over time
const revenueData = [
  { date: '01/15', revenue: 1200 },
  { date: '01/22', revenue: 1800 },
  { date: '01/29', revenue: 2400 },
  { date: '02/05', revenue: 1900 },
  { date: '02/12', revenue: 2800 },
  { date: '02/19', revenue: 3200 },
  { date: '02/26', revenue: 2950 }
];

// Status colors
const statusColors = {
  active: 'success',
  sold: 'primary',
  cancelled: 'error',
};

function AdminMarketplace() {
  const [listings, setListings] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    soldListings: 0,
    cancelledListings: 0,
    totalRevenue: 0
  });
  const { user } = useContext(UserContext);

  // Fetch listings, artifacts, and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, artifactsData, statsData] = await Promise.all([
          getListings(),
          getArtifacts(user.token),
          getListingStats(user.token)
        ]);
        setListings(listingsData || []);
        setArtifacts(artifactsData || []);
        setStats(statsData || {
          activeListings: 0,
          soldListings: 0,
          cancelledListings: 0,
          totalRevenue: 0,
          totalListings: 0
        });
      } catch (error) {
        console.error('Error fetching marketplace data:', error);
      }
    };
    fetchData();
  }, [user.token]);

  // Table columns configuration
  const tableColumns = [
    { field: 'title', label: 'Title' },
    { field: 'tokenId', label: 'Token ID' },
    { field: 'status', label: 'Status' },
    { field: 'price', label: 'Price (PKR)' },
    { field: 'seller', label: 'Seller' },
    { field: 'createdAt', label: 'Created' }
  ];

  // Form fields configuration
  const formFields = [
    {
      name: 'artifact_id',
      label: 'Select Artifact',
      type: 'select',
      required: true,
      options: artifacts.map(artifact => ({
        value: artifact._id,
        label: artifact.title
      })),
      gridSize: { xs: 12, sm: 6 },
      onChange: (value, setFormData, formData) => {
        const selectedArtifact = artifacts.find(a => a._id === value);
        if (selectedArtifact) {
          setFormData(prev => ({
            ...prev,
            artifact_id: value,
            title: selectedArtifact.title,
            description: selectedArtifact.description || '',
            image: selectedArtifact.image || ''
          }));
        }
      }
    },
    { 
      name: 'title', 
      label: 'Title', 
      required: true,
      gridSize: { xs: 12 }
    },
    { 
      name: 'description', 
      label: 'Description', 
      multiline: true,
      rows: 3,
      required: true,
      gridSize: { xs: 12 }
    },
    {
      name: 'price',
      label: 'Price (PKR)',
      type: 'number',
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'image',
      label: 'Image URL (IPFS or Web URL)',
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'sold', label: 'Sold' },
        { value: 'cancelled', label: 'Cancelled' }
      ],
      gridSize: { xs: 12, sm: 6 },
      renderCondition: (isEditMode) => isEditMode
    }
  ];

  // Stats data configuration
  const statsData = [
    { label: 'Total Listings', value: stats.totalListings || 0, icon: Package },
    { label: 'Active Listings', value: stats.activeListings || 0, icon: Gavel },
    { label: 'Sold Listings', value: stats.soldListings || 0, icon: Star },
    { label: 'Total Revenue', value: `${stats.totalRevenue?.toLocaleString() || '0'} PKR`, icon: DollarSign }
  ];

  // Validation functions
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};

    if (!formData.artifact_id) {
      newErrors.artifact_id = 'Please select an artifact';
    }

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.image?.trim()) {
      newErrors.image = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = '';

    if (name === 'artifact_id' && !value) {
      error = 'Please select an artifact';
    }

    if (name === 'title' && !value?.trim()) {
      error = 'Title is required';
    }

    if (name === 'description' && !value?.trim()) {
      error = 'Description is required';
    }

    if (name === 'price' && (!value || value <= 0)) {
      error = 'Price must be greater than 0';
    }

    if (name === 'image' && !value?.trim()) {
      error = 'Image URL is required';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      if (isEditMode) {
        // Update existing listing (no blockchain operation, just DB)
        await updateListing(selectedItem._id, formData, user.token);
      } else {
        // Create new listing (will mint NFT on blockchain)
        await createListing(formData, user.token);
      }
      
      // Refresh data
      const [updatedListings, updatedStats] = await Promise.all([
        getListings(),
        getListingStats(user.token)
      ]);
      
      setListings(updatedListings || []);
      setStats(updatedStats || {
        activeListings: 0,
        soldListings: 0,
        cancelledListings: 0,
        totalRevenue: 0,
        totalListings: 0
      });
    } catch (error) {
      console.error('Error saving listing:', error);
      throw error;
    }
  };

  // Handle menu actions
  const handleMenuAction = async (action, item) => {
    if (action === 'delete') {
      try {
        await deleteListing(item._id, user.token);
        
        // Refresh data
        const [updatedListings, updatedStats] = await Promise.all([
          getListings(),
          getListingStats(user.token)
        ]);
        
        setListings(updatedListings || []);
        setStats(updatedStats || {
          activeListings: 0,
          soldListings: 0,
          cancelledListings: 0,
          totalRevenue: 0,
          totalListings: 0
        });
      } catch (error) {
        console.error('Error deleting listing:', error);
      }
    }
  };

  // Custom table row renderer
  const renderTableRow = (listing) => {
    const formatDate = (date) => {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    };

    const formatCurrency = (amount) => {
      return amount ? `${amount.toLocaleString()} PKR` : 'N/A';
    };

    return (
      <>
        <TableCell>
          <Box>
            <Typography variant="subtitle2" fontWeight="medium">
              {listing.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {listing.description?.substring(0, 50)}...
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
            #{listing.tokenId}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={listing.status}
            color={statusColors[listing.status] || 'default'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </TableCell>
        <TableCell>{formatCurrency(listing.price)}</TableCell>
        <TableCell>
          <Typography variant="body2">
            {listing.seller?.username || 'Unknown'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {listing.seller?.email || 'N/A'}
          </Typography>
        </TableCell>
        <TableCell>{formatDate(listing.createdAt)}</TableCell>
      </>
    );
  };

  // Custom details dialog renderer
  const renderDetailsDialog = (listing, onClose, onEdit) => {
    const formatDate = (date) => {
      return date ? new Date(date).toLocaleString() : 'N/A';
    };

    const formatCurrency = (amount) => {
      return amount ? `${amount.toLocaleString()} PKR` : 'N/A';
    };

    return (
      <>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              {listing.title}
            </Typography>
            <Chip
              label={listing.status}
              color={statusColors[listing.status] || 'default'}
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              {listing.image && (
                <Box
                  component="img"
                  src={listing.image}
                  alt={listing.title}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    mb: 2
                  }}
                />
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {[
                  { label: 'Description', value: listing.description || '-' },
                  { label: 'Price', value: formatCurrency(listing.price) },
                  { label: 'Status', value: listing.status },
                  { label: 'Token ID', value: listing.tokenId },
                  { label: 'Contract Address', value: listing.contractAddress },
                  { label: 'Seller', value: listing.seller?.username || 'Unknown' },
                  { label: 'Seller Email', value: listing.seller?.email || 'N/A' },
                  { label: 'Created At', value: formatDate(listing.createdAt) },
                  { label: 'Updated At', value: formatDate(listing.updatedAt) },
                  { label: 'Artifact ID', value: listing.artifact_id?._id || listing.artifact_id || '-' }
                ].map((field, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {field.label}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        wordBreak: field.label === 'Contract Address' ? 'break-all' : 'normal'
                      }}
                    >
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
            Edit Listing
          </Button>
        </DialogActions>
      </>
    );
  };

  return (
    <AdminTable
      title="NFT Marketplace Management"
      subtitle="Manage blockchain-based NFT listings"
      createButtonText="Create NFT Listing"
      createButtonIcon={<Gavel size={20} />}
      chartData={revenueData}
      chartType="area"
      chartDataKey="revenue"
      chartXAxisKey="date"
      chartTitle="Revenue Over Time"
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={listings}
      searchFields={['title', 'description', 'tokenId']}
      filterOptions={[
        {
          label: 'Status',
          field: 'status',
          options: ['All', 'active', 'sold', 'cancelled']
        }
      ]}
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

export default AdminMarketplace;