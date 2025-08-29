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
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Gavel, 
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Award,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, Button, Input, Badge } from '../../components/ui';

// Test data matching AuctionBid schema
const auctionBids = [
  {
    _id: '65f1a2b3c4d5e6f7g8h9i0j1',
    listing_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j2',
      title: 'Mughal Miniature Painting',
      starting_price: 5000,
      current_price: 7500,
      auction_end_date: '2024-03-15T18:00:00Z',
      artifact_image: '/api/placeholder/60/60'
    },
    bidder_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j3',
      name: 'Dr. Sarah Ahmed',
      email: 'sarah.ahmed@example.com',
      avatar: '/api/placeholder/40/40'
    },
    bid_amount: 7500,
    is_winning_bid: true,
    is_auto_bid: false,
    max_auto_bid_amount: null,
    bid_time: '2024-02-28T14:30:00Z',
    ip_address: '192.168.1.100',
    createdAt: '2024-02-28T14:30:00Z',
    updatedAt: '2024-02-28T14:30:00Z'
  },
  {
    _id: '65f1a2b3c4d5e6f7g8h9i0j4',
    listing_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j5',
      title: 'Ancient Pottery Collection',
      starting_price: 3000,
      current_price: 4200,
      auction_end_date: '2024-03-20T20:00:00Z',
      artifact_image: '/api/placeholder/60/60'
    },
    bidder_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j6',
      name: 'Muhammad Ali Khan',
      email: 'ali.khan@example.com',
      avatar: '/api/placeholder/40/40'
    },
    bid_amount: 4200,
    is_winning_bid: true,
    is_auto_bid: true,
    max_auto_bid_amount: 5000,
    bid_time: '2024-02-27T16:45:00Z',
    ip_address: '192.168.1.101',
    createdAt: '2024-02-27T16:45:00Z',
    updatedAt: '2024-02-27T16:45:00Z'
  },
  {
    _id: '65f1a2b3c4d5e6f7g8h9i0j7',
    listing_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j8',
      title: 'Traditional Silk Textile',
      starting_price: 2000,
      current_price: 3800,
      auction_end_date: '2024-03-12T15:00:00Z',
      artifact_image: '/api/placeholder/60/60'
    },
    bidder_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j9',
      name: 'Fatima Malik',
      email: 'fatima.malik@example.com',
      avatar: '/api/placeholder/40/40'
    },
    bid_amount: 3800,
    is_winning_bid: true,
    is_auto_bid: false,
    max_auto_bid_amount: null,
    bid_time: '2024-02-26T11:20:00Z',
    ip_address: '192.168.1.102',
    createdAt: '2024-02-26T11:20:00Z',
    updatedAt: '2024-02-26T11:20:00Z'
  },
  {
    _id: '65f1a2b3c4d5e6f7g8h9i0j10',
    listing_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j11',
      title: 'Historical Gold Coins',
      starting_price: 8000,
      current_price: 12500,
      auction_end_date: '2024-03-25T19:00:00Z',
      artifact_image: '/api/placeholder/60/60'
    },
    bidder_id: {
      _id: '65f1a2b3c4d5e6f7g8h9i0j12',
      name: 'Prof. Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      avatar: '/api/placeholder/40/40'
    },
    bid_amount: 12500,
    is_winning_bid: true,
    is_auto_bid: true,
    max_auto_bid_amount: 15000,
    bid_time: '2024-02-25T09:15:00Z',
    ip_address: '192.168.1.103',
    createdAt: '2024-02-25T09:15:00Z',
    updatedAt: '2024-02-25T09:15:00Z'
  }
];

const auctionStats = [
  { month: 'Jan', revenue: 45000, bids: 156, sales: 23 },
  { month: 'Feb', revenue: 62000, bids: 234, sales: 31 },
  { month: 'Mar', revenue: 78000, bids: 298, sales: 42 },
  { month: 'Apr', revenue: 55000, bids: 267, sales: 38 },
  { month: 'May', revenue: 89000, bids: 345, sales: 48 },
  { month: 'Jun', revenue: 95000, bids: 378, sales: 52 }
];

const bidTypeDistribution = [
  { name: 'Manual Bids', value: 65, color: '#1B4332' },
  { name: 'Auto Bids', value: 35, color: '#B8860B' }
];

const StatCard = ({ icon: Icon, title, value, change, color, subtitle }) => (
  <Card sx={{ p: 3, height: '100%', borderLeft: `4px solid ${color}` }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="textPrimary">
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
        <Typography variant="body2" color={change > 0 ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
          {change > 0 ? '+' : ''}{change}% from last month
        </Typography>
      </Box>
      <Box sx={{ 
        p: 1.5, 
        borderRadius: 2, 
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} color={color} />
      </Box>
    </Box>
  </Card>
);

const getTimeRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

function AdminAuctions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, bid) => {
    setAnchorEl(event.currentTarget);
    setSelectedBid(bid);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBid(null);
  };

  const filteredBids = auctionBids.filter(bid => 
    bid.listing_id.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.bidder_id.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Auction Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor auctions, bids, and marketplace activity
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Gavel size={20} />}
          sx={{ px: 3, py: 1.5 }}
        >
          Create Auction
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value="₨95,000"
            change={18.2}
            color="#1B4332"
            subtitle="This month"
          />
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatCard
            icon={Gavel}
            title="Active Auctions"
            value="23"
            change={5.4}
            color="#B8860B"
            subtitle="Currently running"
          />
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatCard
            icon={TrendingUp}
            title="Total Bids"
            value="378"
            change={12.8}
            color="#2D5A3D"
            subtitle="This month"
          />
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatCard
            icon={Award}
            title="Completed Sales"
            value="52"
            change={8.7}
            color="#8B6914"
            subtitle="This month"
          />
        </Grid>
      </Grid>

      {/* Analytics Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue & Bid Trends */}
        <Grid size={{xs:12, lg:8}}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Auction Performance & Revenue
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={auctionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `₨${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : name === 'bids' ? 'Total Bids' : 'Sales'
                  ]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1B4332" 
                  strokeWidth={3}
                  dot={{ fill: '#1B4332', r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bids" 
                  stroke="#B8860B" 
                  strokeWidth={3}
                  dot={{ fill: '#B8860B', r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2D5A3D" 
                  strokeWidth={3}
                  dot={{ fill: '#2D5A3D', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Bid Type Distribution */}
        <Grid size={{xs:12, lg:4}}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Bid Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={bidTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                >
                  {bidTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Auto-bidding gaining popularity
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Input
              placeholder="Search by artifact or bidder name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={20} />}
              fullWidth
            />
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
            >
              Filter by Status
            </Button>
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Button
              variant="outlined"
              startIcon={<Activity size={20} />}
              fullWidth
            >
              Bid Activity
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Auction Bids Table */}
      <Card>
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight="bold">
            Recent Auction Bids
          </Typography>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Artifact</TableCell>
                <TableCell>Bidder</TableCell>
                <TableCell align="center">Bid Amount</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Bid Type</TableCell>
                <TableCell>Time Remaining</TableCell>
                <TableCell>Bid Time</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBids.map((bid) => {
                const timeRemaining = getTimeRemaining(bid.listing_id.auction_end_date);
                const isEnding = timeRemaining !== 'Ended' && timeRemaining.includes('h') && !timeRemaining.includes('d');
                
                return (
                  <TableRow key={bid._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={bid.listing_id.artifact_image} 
                          sx={{ mr: 2, width: 40, height: 40 }}
                          variant="rounded"
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {bid.listing_id.title}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Starting: ₨{bid.listing_id.starting_price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={bid.bidder_id.avatar}
                          sx={{ mr: 1.5, width: 32, height: 32 }}
                        >
                          {bid.bidder_id.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {bid.bidder_id.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {bid.bidder_id.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="bold" color="primary.main">
                        ₨{bid.bid_amount.toLocaleString()}
                      </Typography>
                      {bid.max_auto_bid_amount && (
                        <Typography variant="caption" color="textSecondary">
                          Max: ₨{bid.max_auto_bid_amount.toLocaleString()}
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell align="center">
                        <Chip
                            label={bid.is_winning_bid ? 'Winning' : 'Outbid'}
                            color={bid.is_winning_bid ? 'success' : 'default'}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {bid.is_winning_bid ? 'Winning' : 'Outbid'}
                        </Chip>
                    </TableCell>
                    
                    <TableCell>
                      <Chip 
                        label={bid.is_auto_bid ? 'Auto Bid' : 'Manual'} 
                        size="small"
                        icon={bid.is_auto_bid ? <Activity size={14} /> : <Users size={14} />}
                        sx={{ 
                          backgroundColor: bid.is_auto_bid ? '#B8860B20' : '#1B433220',
                          color: bid.is_auto_bid ? '#B8860B' : '#1B4332'
                        }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography 
                          variant="body2" 
                          fontWeight="medium"
                          color={isEnding ? 'error.main' : timeRemaining === 'Ended' ? 'textSecondary' : 'textPrimary'}
                        >
                          {timeRemaining}
                        </Typography>
                        {isEnding && (
                          <LinearProgress 
                            sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                            color="error"
                            variant="indeterminate"
                          />
                        )}
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(bid.bid_time).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(bid.bid_time).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, bid)}
                      >
                        <MoreVertical size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { setOpenDialog(true); handleMenuClose(); }}>
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit Bid
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Clock size={16} style={{ marginRight: 8 }} />
            Bid History
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Cancel Bid
          </MenuItem>
        </Menu>

        {/* Bid Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          {selectedBid && (
            <>
              <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                  Bid Details - {selectedBid.listing_id.title}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size={{xs:12, md:6}}>
                    <Box sx={{ space: 2 }}>
                      <Typography variant="h6" gutterBottom>Bid Information</Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Bid Amount
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary.main">
                          ₨{selectedBid.bid_amount.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Bid Type
                        </Typography>
                        <Badge variant={selectedBid.is_auto_bid ? 'warning' : 'info'}>
                          {selectedBid.is_auto_bid ? 'Auto Bid' : 'Manual Bid'}
                        </Badge>
                      </Box>
                      
                      {selectedBid.max_auto_bid_amount && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Max Auto Bid Amount
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            ₨{selectedBid.max_auto_bid_amount.toLocaleString()}
                          </Typography>
                        </Box>
                      )}
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Bid Status
                        </Typography>
                        <Badge variant={selectedBid.is_winning_bid ? 'success' : 'default'}>
                          {selectedBid.is_winning_bid ? 'Winning Bid' : 'Outbid'}
                        </Badge>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid size={{xs:12, md:6}}>
                    <Typography variant="h6" gutterBottom>Bidder Information</Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        src={selectedBid.bidder_id.avatar}
                        sx={{ mr: 2, width: 50, height: 50 }}
                      >
                        {selectedBid.bidder_id.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {selectedBid.bidder_id.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {selectedBid.bidder_id.email}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ space: 1 }}>
                      <Typography variant="body2">
                        <strong>Bid Time:</strong> {new Date(selectedBid.bid_time).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>IP Address:</strong> {selectedBid.ip_address}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Time Remaining:</strong> {getTimeRemaining(selectedBid.listing_id.auction_end_date)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
                <Button variant="outlined" startIcon={<Clock size={16} />}>
                  View History
                </Button>
                <Button variant="contained" startIcon={<Eye size={16} />}>
                  View Auction
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminAuctions;