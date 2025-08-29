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
  DollarSign,
  Clock,
  Gavel,
  Star,
  Search,
  Filter,
  EyeIcon,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Input } from '../../components/ui';

// Sample marketplace listing data based on marketplaceListingSchema
const marketplaceListings = [
  {
    id: 1,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d1',
    seller_id: '60f1b2a3c4d5e6f7a8b9c0e1',
    listing_type: 'auction',
    title: 'Vintage Mughal Painting',
    description: 'Authentic 18th-century Mughal miniature painting',
    starting_price: 500,
    current_price: 750,
    reserve_price: 600,
    buy_now_price: 1000,
    currency: 'USD',
    status: 'active',
    auction_start_time: '2025-08-25T10:00:00Z',
    auction_end_time: '2025-09-01T18:00:00Z',
    auto_extend_minutes: 5,
    shipping_cost: 50,
    is_featured: true,
    view_count: 120,
    created_at: '2025-08-20T09:00:00Z',
  },
  {
    id: 2,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d2',
    seller_id: '60f1b2a3c4d5e6f7a8b9c0e2',
    listing_type: 'fixed',
    title: 'Ancient Pottery Vase',
    description: 'Well-preserved pottery from the Indus Valley',
    starting_price: 300,
    current_price: 300,
    reserve_price: null,
    buy_now_price: 300,
    currency: 'USD',
    status: 'sold',
    auction_start_time: null,
    auction_end_time: null,
    auto_extend_minutes: null,
    shipping_cost: 30,
    is_featured: false,
    view_count: 80,
    created_at: '2025-08-15T14:00:00Z',
  },
  {
    id: 3,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d3',
    seller_id: '60f1b2a3c4d5e6f7a8b9c0e3',
    listing_type: 'reserve',
    title: 'Antique Gold Necklace',
    description: 'Ornate gold necklace from the 19th century',
    starting_price: 1000,
    current_price: 1200,
    reserve_price: 1100,
    buy_now_price: 1500,
    currency: 'USD',
    status: 'active',
    auction_start_time: '2025-08-28T12:00:00Z',
    auction_end_time: '2025-09-05T18:00:00Z',
    auto_extend_minutes: 10,
    shipping_cost: 75,
    is_featured: true,
    view_count: 200,
    created_at: '2025-08-10T11:00:00Z',
  },
];

// Sample chart data for listing types
const listingTypeData = [
  { name: 'Auction', count: 25, color: '#627EEA' },
  { name: 'Fixed', count: 15, color: '#8247E5' },
  { name: 'Reserve', count: 10, color: '#F3BA2F' },
];

// Colors for listing types and statuses
const listingTypeColors = {
  auction: 'primary',
  fixed: 'success',
  reserve: 'warning',
};

const statusColors = {
  active: '#2196F3',
  sold: '#4CAF50',
  cancelled: '#F44336',
};

function AdminMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListingType, setSelectedListingType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, listing) => {
    setAnchorEl(event.currentTarget);
    setSelectedListing(listing);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedListing(null);
  };

  const filteredListings = marketplaceListings.filter(
    (listing) =>
      (listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedListingType === 'All' || listing.listing_type === selectedListingType) &&
      (selectedStatus === 'All' || listing.status === selectedStatus)
  );

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : 'N/A';
  };

  const formatCurrency = (amount) => {
    return amount ? `$${amount.toFixed(2)}` : 'N/A';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Marketplace Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage marketplace listings
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Gavel size={20} />} sx={{ px: 3, py: 1.5 }}>
          Create Listing
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Listing Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={listingTypeData}>
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
              Marketplace Statistics
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: 'Total Listings', value: '65', icon: Gavel },
                { label: 'Featured Listings', value: '10', icon: Star },
                { label: 'Total Views', value: '5,430', icon: EyeIcon },
                { label: 'Revenue Generated', value: '$12,750', icon: DollarSign },
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
              Listing Type
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
              startIcon={<Clock size={20} />}
              fullWidth
            >
              Date Range
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Marketplace Listings Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Listing Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell align="center">Views</TableCell>
                <TableCell align="center">Featured</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow key={listing.id} hover>
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
                      color={listingTypeColors[listing.listing_type]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={listing.status}
                      sx={{
                        backgroundColor: `${statusColors[listing.status]}20`,
                        color: statusColors[listing.status],
                        fontWeight: 'medium',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatCurrency(listing.current_price)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(listing.auction_end_time)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{listing.view_count}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {listing.is_featured ? (
                      <Star size={18} color="#4CAF50" />
                    ) : (
                      <Star size={18} color="#B0BEC5" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, listing)}>
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
            Edit Listing
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete Listing
          </MenuItem>
        </Menu>

        {/* Listing Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          {selectedListing && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Listing Details
                  </Typography>
                  <Chip
                    label={selectedListing.listing_type}
                    color={listingTypeColors[selectedListing.listing_type]}
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
                          {selectedListing.title}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body2">{selectedListing.description || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Artifact ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedListing.artifact_id}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Seller ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedListing.seller_id}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Auction Dates
                        </Typography>
                        <Typography variant="body2">
                          <strong>Start:</strong> {formatDate(selectedListing.auction_start_time)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>End:</strong> {formatDate(selectedListing.auction_end_time)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Pricing
                        </Typography>
                        <Typography variant="body2">
                          <strong>Starting Price:</strong> {formatCurrency(selectedListing.starting_price)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Current Price:</strong> {formatCurrency(selectedListing.current_price)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Reserve Price:</strong> {formatCurrency(selectedListing.reserve_price)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Buy Now Price:</strong> {formatCurrency(selectedListing.buy_now_price)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Currency:</strong> {selectedListing.currency}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Auction Details
                        </Typography>
                        <Typography variant="body2">
                          <strong>Auto Extend:</strong> {selectedListing.auto_extend_minutes || 'N/A'} minutes
                        </Typography>
                        <Typography variant="body2">
                          <strong>Shipping Cost:</strong> {formatCurrency(selectedListing.shipping_cost)}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Status
                        </Typography>
                        <Chip
                          label={selectedListing.status}
                          sx={{
                            backgroundColor: `${statusColors[selectedListing.status]}20`,
                            color: statusColors[selectedListing.status],
                            fontWeight: 'medium',
                          }}
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Featured
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {selectedListing.is_featured ? (
                            <>
                              <Star size={18} color="#4CAF50" />
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
                          Views
                        </Typography>
                        <Typography variant="body2">{selectedListing.view_count}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Created At
                        </Typography>
                        <Typography variant="body2">{formatDate(selectedListing.created_at)}</Typography>
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
                  Edit Listing
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminMarketplace;