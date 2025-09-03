import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, TableCell, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Gavel, Edit, DollarSign, Star, EyeIcon } from 'lucide-react';

// Import the reusable AdminTable component
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';

// Context
import { UserContext } from '../../contexts/UserContext';

// Services
import { getAllListings, createListing, updateListing, deleteListing, getMarketplaceStats } from '../../services/marketPlaceService';
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

// Colors for listing types and statuses
const listingTypeColors = {
  auction: 'primary',
  fixed: 'success',
  reserve: 'warning',
};

const statusColors = {
  active: 'primary',
  sold: 'success',
  cancelled: 'error',
  expired: 'default'
};

function AdminMarketplace() {
  const [listings, setListings] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    featuredListings: 0,
    totalViews: 0,
    revenueGenerated: 0
  });
  const { user } = useContext(UserContext);

  // Fetch listings, artifacts, and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, artifactsData, statsData] = await Promise.all([
          getAllListings(user.token),
          getArtifacts(user.token),
          getMarketplaceStats(user.token)
        ]);
        setListings(listingsData || []);
        setArtifacts(artifactsData || []);
        setStats(statsData || {
            activeListings: statsData?.activeListings || 0,
            soldListings: statsData?.soldListings || 0,
            cancelledListings: statsData?.cancelledListings || 0,
            totalRevenue: statsData?.totalRevenue || 0
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
    { field: 'listing_type', label: 'Type' },
    { field: 'status', label: 'Status' },
    { field: 'current_price', label: 'Current Price' },
    { field: 'auction_end_time', label: 'End Date' },
    { field: 'view_count', label: 'Views', align: 'center' },
    { field: 'is_featured', label: 'Featured', align: 'center' }
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
            description: selectedArtifact.description || ''
          }));
        }
      }
    },
    {
      name: 'listing_type',
      label: 'Listing Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed Price' },
        { value: 'auction', label: 'Auction' },
        { value: 'reserve', label: 'Reserve Auction' }
      ],
      gridSize: { xs: 12, sm: 6 }
    },
    { 
      name: 'description', 
      label: 'Description', 
      multiline: true,
      rows: 3,
      gridSize: { xs: 12 }
    },
    {
      name: 'starting_price',
      label: 'Starting Price ($)',
      type: 'number',
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'reserve_price',
      label: 'Reserve Price ($)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 },
      disabled: (formData) => formData.listing_type !== 'reserve'
    },
    {
      name: 'buy_now_price',
      label: 'Buy Now Price ($)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'shipping_cost',
      label: 'Shipping Cost ($)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'auction_start_time',
      label: 'Auction Start Time',
      type: 'datetime-local',
      gridSize: { xs: 12, sm: 6 },
      disabled: (formData) => formData.listing_type === 'fixed'
    },
    {
      name: 'auction_end_time',
      label: 'Auction End Time',
      type: 'datetime-local',
      gridSize: { xs: 12, sm: 6 },
      disabled: (formData) => formData.listing_type === 'fixed'
    },
    {
      name: 'auto_extend_minutes',
      label: 'Auto Extend (minutes)',
      type: 'number',
      gridSize: { xs: 12, sm: 6 },
      disabled: (formData) => formData.listing_type === 'fixed'
    },
    {
      name: 'currency',
      label: 'Currency',
      type: 'select',
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' }
      ],
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'sold', label: 'Sold' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'expired', label: 'Expired' }
      ],
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'is_featured',
      label: 'Featured Listing',
      type: 'switch',
      gridSize: { xs: 12, sm: 6 }
    }
  ];

  // Stats data configuration
  const statsData = [
    { label: 'Active Listings', value: stats.activeListings || 0, icon: Gavel },
    { label: 'Sold Listings',  value: stats.soldListings || 0, icon: Star },
    { label: 'Cancelled Listings', value: stats.cancelledListings || 0, icon: EyeIcon },
    { label: 'Revenue Generated',  value: `$${stats.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign }
  ];

  // Validation functions
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};

    if (!formData.artifact_id) {
      newErrors.artifact_id = 'Please select an artifact';
    }

    if (!formData.listing_type) {
      newErrors.listing_type = 'Listing type is required';
    }

    if (!formData.starting_price || formData.starting_price <= 0) {
      newErrors.starting_price = 'Starting price must be greater than 0';
    }

    if (formData.listing_type === 'reserve' && (!formData.reserve_price || formData.reserve_price <= 0)) {
      newErrors.reserve_price = 'Reserve price is required for reserve auctions';
    }

    if (formData.listing_type !== 'fixed') {
      if (!formData.auction_start_time) {
        newErrors.auction_start_time = 'Auction start time is required';
      }
      if (!formData.auction_end_time) {
        newErrors.auction_end_time = 'Auction end time is required';
      }
      if (formData.auction_start_time && formData.auction_end_time && 
          new Date(formData.auction_start_time) >= new Date(formData.auction_end_time)) {
        newErrors.auction_end_time = 'End time must be after start time';
      }
    }

    if (formData.shipping_cost && formData.shipping_cost < 0) {
      newErrors.shipping_cost = 'Shipping cost cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = '';

    if (name === 'artifact_id' && !value) {
      error = 'Please select an artifact';
    }

    if (name === 'listing_type' && !value) {
      error = 'Listing type is required';
    }

    if (name === 'starting_price' && (!value || value <= 0)) {
      error = 'Starting price must be greater than 0';
    }

    if (name === 'reserve_price' && formData.listing_type === 'reserve' && (!value || value <= 0)) {
      error = 'Reserve price is required for reserve auctions';
    }

    if (name === 'auction_start_time' && formData.listing_type !== 'fixed' && !value) {
      error = 'Auction start time is required';
    }

    if (name === 'auction_end_time' && formData.listing_type !== 'fixed' && !value) {
      error = 'Auction end time is required';
    }

    if (name === 'shipping_cost' && value && value < 0) {
      error = 'Shipping cost cannot be negative';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      // Set default values
      const listingData = {
        ...formData,
        currency: formData.currency || 'USD',
        current_price: formData.starting_price,
        status: formData.status || 'active'
      };

      if (isEditMode) {
        await updateListing(selectedItem._id, listingData, user.token);
      } else {
        await createListing(listingData, user.token);
      }
      
      // Refresh data
      const [updatedListings, updatedStats] = await Promise.all([
        getAllListings(user.token),
        getMarketplaceStats(user.token)
      ]);
      
      setListings(updatedListings || []);
      setStats(updatedStats || {
          activeListings: statsData?.activeListings || 0,
          soldListings: statsData?.soldListings || 0,
          cancelledListings: statsData?.cancelledListings || 0,
          totalRevenue: statsData?.totalRevenue || 0
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
          getAllListings(user.token),
          getMarketplaceStats(user.token)
        ]);
        
        setListings(updatedListings || []);
        setStats(updatedStats || {
          activeListings: statsData?.activeListings || 0,
          soldListings: statsData?.soldListings || 0,
          cancelledListings: statsData?.cancelledListings || 0,
          totalRevenue: statsData?.totalRevenue || 0
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
      return amount ? `$${amount.toFixed(2)}` : 'N/A';
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
          <Chip
            label={listing.listing_type}
            color={listingTypeColors[listing.listing_type] || 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        </TableCell>
        <TableCell>
          <Chip
            label={listing.status}
            color={statusColors[listing.status] || 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        </TableCell>
        <TableCell>{formatCurrency(listing.current_price)}</TableCell>
        <TableCell>{formatDate(listing.auction_end_time)}</TableCell>
        <TableCell align="center">{listing.view_count || 0}</TableCell>
        <TableCell align="center">
          {listing.is_featured ? (
            <Star size={18} color="#4CAF50" fill="#4CAF50" />
          ) : (
            <Star size={18} color="#B0BEC5" />
          )}
        </TableCell>
      </>
    );
  };

  // Custom details dialog renderer
  const renderDetailsDialog = (listing, onClose, onEdit) => {
    const formatDate = (date) => {
      return date ? new Date(date).toLocaleString() : 'N/A';
    };

    const formatCurrency = (amount) => {
      return amount ? `$${amount.toFixed(2)}` : 'N/A';
    };

    return (
      <>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              {listing.title}
            </Typography>
            <Chip
              label={listing.listing_type}
              color={listingTypeColors[listing.listing_type] || 'default'}
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {[
                  { label: 'Description', value: listing.description || '-' },
                  { label: 'Listing Type', value: listing.listing_type },
                  { label: 'Status', value: listing.status },
                  { label: 'Starting Price', value: formatCurrency(listing.starting_price) },
                  { label: 'Current Price', value: formatCurrency(listing.current_price) },
                  { label: 'Reserve Price', value: formatCurrency(listing.reserve_price) },
                  { label: 'Buy Now Price', value: formatCurrency(listing.buy_now_price) },
                  { label: 'Currency', value: listing.currency || 'USD' }
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {[
                  { label: 'Auction Start', value: formatDate(listing.auction_start_time) },
                  { label: 'Auction End', value: formatDate(listing.auction_end_time) },
                  { label: 'Auto Extend', value: `${listing.auto_extend_minutes || 0} minutes` },
                  { label: 'Shipping Cost', value: formatCurrency(listing.shipping_cost) },
                  { label: 'Featured', value: listing.is_featured ? 'Yes' : 'No' },
                  { label: 'Views', value: listing.view_count?.toLocaleString() || '0' },
                  { label: 'Created At', value: formatDate(listing.created_at) },
                  { label: 'Artifact ID', value: listing.artifact_id?._id || listing.artifact_id || '-' }
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
            Edit Listing
          </Button>
        </DialogActions>
      </>
    );
  };

  return (
    <AdminTable
      title="Marketplace Management"
      subtitle="Monitor and manage marketplace listings"
      createButtonText="Create Listing"
      createButtonIcon={<Gavel size={20} />}
      chartData={revenueData}
      chartType="area"
      chartDataKey="revenue"
      chartXAxisKey="date"
      chartTitle="Revenue Over Time"
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={listings}
      searchFields={['title', 'description']}
      filterOptions={[
        {
          label: 'Listing Type',
          field: 'listing_type',
          options: ['All', 'auction', 'fixed', 'reserve']
        },
        {
          label: 'Status',
          field: 'status',
          options: ['All', 'active', 'sold', 'cancelled', 'expired']
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
    />
  );
}

export default AdminMarketplace;