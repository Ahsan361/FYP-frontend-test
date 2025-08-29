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
  TextField
} from '@mui/material';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  Search,
  Filter,
  Calendar,
  MapPin,
  Star,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  User,
  Ticket
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, Button, Input, Badge } from '../../components/ui';

// Test data based on EventRegistration schema
const eventRegistrations = [
  {
    id: 1,
    event_id: '60f1b2a3c4d5e6f7a8b9c0e1',
    user_id: '60f1b2a3c4d5e6f7a8b9c0u1',
    registration_status: 'confirmed',
    registration_date: '2024-02-10T08:30:00Z',
    payment_status: 'paid',
    special_requirements: 'Wheelchair accessible seating required',
    confirmation_code: 'MUG2024-001',
    createdAt: '2024-02-10T08:30:00Z',
    updatedAt: '2024-02-10T09:15:00Z',
    eventName: 'Mughal Art Exhibition Opening',
    userName: 'Sarah Ahmed',
    userEmail: 'sarah.ahmed@email.com',
    eventDate: '2024-03-15',
    ticketPrice: 25.00
  },
  {
    id: 2,
    event_id: '60f1b2a3c4d5e6f7a8b9c0e2',
    user_id: '60f1b2a3c4d5e6f7a8b9c0u2',
    registration_status: 'pending',
    registration_date: '2024-02-11T14:20:00Z',
    payment_status: 'unpaid',
    special_requirements: '',
    confirmation_code: 'POT2024-002',
    createdAt: '2024-02-11T14:20:00Z',
    updatedAt: '2024-02-11T14:20:00Z',
    eventName: 'Ancient Pottery Workshop',
    userName: 'Mohammad Ali',
    userEmail: 'mohammad.ali@email.com',
    eventDate: '2024-03-20',
    ticketPrice: 45.00
  },
  {
    id: 3,
    event_id: '60f1b2a3c4d5e6f7a8b9c0e3',
    user_id: '60f1b2a3c4d5e6f7a8b9c0u3',
    registration_status: 'confirmed',
    registration_date: '2024-02-09T16:45:00Z',
    payment_status: 'paid',
    special_requirements: 'Vegetarian meal preference',
    confirmation_code: 'TEX2024-003',
    createdAt: '2024-02-09T16:45:00Z',
    updatedAt: '2024-02-09T17:30:00Z',
    eventName: 'Traditional Textile Seminar',
    userName: 'Fatima Khan',
    userEmail: 'fatima.khan@email.com',
    eventDate: '2024-03-25',
    ticketPrice: 35.00
  },
  {
    id: 4,
    event_id: '60f1b2a3c4d5e6f7a8b9c0e4',
    user_id: '60f1b2a3c4d5e6f7a8b9c0u4',
    registration_status: 'cancelled',
    registration_date: '2024-02-08T11:15:00Z',
    payment_status: 'refunded',
    special_requirements: '',
    confirmation_code: 'COIN2024-004',
    createdAt: '2024-02-08T11:15:00Z',
    updatedAt: '2024-02-12T10:00:00Z',
    eventName: 'Historical Coins Auction',
    userName: 'Ahmed Hassan',
    userEmail: 'ahmed.hassan@email.com',
    eventDate: '2024-03-30',
    ticketPrice: 75.00
  },
  {
    id: 5,
    event_id: '60f1b2a3c4d5e6f7a8b9c0e5',
    user_id: '60f1b2a3c4d5e6f7a8b9c0u5',
    registration_status: 'confirmed',
    registration_date: '2024-02-12T13:00:00Z',
    payment_status: 'paid',
    special_requirements: 'Late arrival expected',
    confirmation_code: 'GAND2024-005',
    createdAt: '2024-02-12T13:00:00Z',
    updatedAt: '2024-02-12T13:45:00Z',
    eventName: 'Gandhara Sculpture Tour',
    userName: 'Ayesha Malik',
    userEmail: 'ayesha.malik@email.com',
    eventDate: '2024-04-05',
    ticketPrice: 20.00
  }
];

const registrationData = [
  { date: '02/08', registrations: 15, revenue: 675 },
  { date: '02/09', registrations: 23, revenue: 1150 },
  { date: '02/10', registrations: 31, revenue: 1480 },
  { date: '02/11', registrations: 19, revenue: 890 },
  { date: '02/12', registrations: 27, revenue: 1320 },
  { date: '02/13', registrations: 35, revenue: 1750 },
  { date: '02/14', registrations: 29, revenue: 1450 }
];

const statusDistribution = [
  { name: 'Confirmed', value: 65, color: '#4CAF50' },
  { name: 'Pending', value: 25, color: '#FF9800' },
  { name: 'Cancelled', value: 10, color: '#F44336' }
];

const paymentDistribution = [
  { name: 'Paid', value: 70, color: '#4CAF50' },
  { name: 'Unpaid', value: 20, color: '#FF9800' },
  { name: 'Refunded', value: 10, color: '#2196F3' }
];

const registrationStatusColors = {
  'confirmed': 'success',
  'pending': 'warning',
  'cancelled': 'error'
};

const paymentStatusColors = {
  'paid': 'success',
  'unpaid': 'warning', 
  'refunded': 'info'
};

function AdminEventRegistration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, registration) => {
    setAnchorEl(event.currentTarget);
    setSelectedRegistration(registration);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRegistration(null);
  };

  const filteredRegistrations = eventRegistrations.filter(registration => 
    (registration.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     registration.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     registration.confirmation_code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === 'All' || registration.registration_status === selectedStatus) &&
    (selectedPayment === 'All' || registration.payment_status === selectedPayment)
  );

  const totalRevenue = eventRegistrations
    .filter(reg => reg.payment_status === 'paid')
    .reduce((sum, reg) => sum + reg.ticketPrice, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Event Bookings
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage event registrations and attendee information
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Ticket size={20} />}
          sx={{ px: 3, py: 1.5 }}
        >
          Manual Registration
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Registration Trends & Revenue
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={registrationData}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="registrations" 
                  stroke="#1B4332" 
                  fillOpacity={1} 
                  fill="url(#colorRegistrations)" 
                  strokeWidth={2}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4CAF50" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Booking Overview
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: 'Total Bookings', value: '1,847', icon: Ticket },
                { label: 'Confirmed', value: '1,201', icon: CheckCircle },
                { label: 'Pending Payment', value: '369', icon: CreditCard },
                { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: Ticket }
              ].map((stat, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 2,
                  borderBottom: index < 3 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}>
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

      {/* Status & Payment Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Registration Status
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {statusDistribution.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%' }} />
                  <Typography variant="caption">{item.name}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Payment Status
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {paymentDistribution.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%' }} />
                  <Typography variant="caption">{item.name}</Typography>
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
              placeholder="Search by name, event, or confirmation code..."
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
              Registration Status
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<CreditCard size={20} />}
              fullWidth
            >
              Payment Status
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

      {/* Event Registrations Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attendee</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Confirmation Code</TableCell>
                <TableCell align="center">Registration Status</TableCell>
                <TableCell align="center">Payment Status</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRegistrations.map((registration) => (
                <TableRow key={registration.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ mr: 2, width: 40, height: 40, backgroundColor: '#1B4332' }}
                      >
                        <User size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {registration.userName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {registration.userEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {registration.eventName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(registration.eventDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
                      {registration.confirmation_code}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                        label={registration.registration_status}
                        color={registrationStatusColors[registration.registration_status]}
                        sx={{ textTransform: 'capitalize' }}
                    >
                      {registration.registration_status}
                    </Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                        label={registration.payment_status}
                        color={paymentStatusColors[registration.payment_status]}
                        sx={{ textTransform: 'capitalize' }}
                    >

                      {registration.payment_status}
                    </Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="medium">
                      ${registration.ticketPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(registration.registration_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(registration.registration_date).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, registration)}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
            Edit Registration
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <CheckCircle size={16} style={{ marginRight: 8 }} />
            Confirm Registration
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <CreditCard size={16} style={{ marginRight: 8 }} />
            Process Payment
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Download size={16} style={{ marginRight: 8 }} />
            Send Ticket
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <XCircle size={16} style={{ marginRight: 8 }} />
            Cancel Registration
          </MenuItem>
        </Menu>

        {/* Registration Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          {selectedRegistration && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Registration Details
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Badge variant={registrationStatusColors[selectedRegistration.registration_status]} sx={{ textTransform: 'capitalize' }}>
                      {selectedRegistration.registration_status}
                    </Badge>
                    <Badge variant={paymentStatusColors[selectedRegistration.payment_status]} sx={{ textTransform: 'capitalize' }}>
                      {selectedRegistration.payment_status}
                    </Badge>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Attendee Information
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedRegistration.userName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {selectedRegistration.userEmail}
                        </Typography>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                          User ID: {selectedRegistration.user_id}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Event Information
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedRegistration.eventName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Event Date: {new Date(selectedRegistration.eventDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                          Event ID: {selectedRegistration.event_id}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Confirmation Code
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                          {selectedRegistration.confirmation_code}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Special Requirements
                        </Typography>
                        <Typography variant="body2">
                          {selectedRegistration.special_requirements || 'None specified'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Registration Status
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {selectedRegistration.registration_status === 'confirmed' && <CheckCircle size={18} color="#4CAF50" />}
                          {selectedRegistration.registration_status === 'pending' && <Clock size={18} color="#FF9800" />}
                          {selectedRegistration.registration_status === 'cancelled' && <XCircle size={18} color="#F44336" />}
                          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                            {selectedRegistration.registration_status}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Payment Information
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          {selectedRegistration.payment_status === 'paid' && <CheckCircle size={18} color="#4CAF50" />}
                          {selectedRegistration.payment_status === 'unpaid' && <Clock size={18} color="#FF9800" />}
                          {selectedRegistration.payment_status === 'refunded' && <RefreshCw size={18} color="#2196F3" />}
                          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                            {selectedRegistration.payment_status}
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                          ${selectedRegistration.ticketPrice.toFixed(2)}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Registration Timeline
                        </Typography>
                        <Box sx={{ space: 1 }}>
                          <Typography variant="body2">
                            <strong>Registered:</strong> {new Date(selectedRegistration.registration_date).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Created:</strong> {new Date(selectedRegistration.createdAt).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Last Updated:</strong> {new Date(selectedRegistration.updatedAt).toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Database IDs
                        </Typography>
                        <Box sx={{ space: 1 }}>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
                            Registration: {selectedRegistration.id}
                          </Typography>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
                            Event: {selectedRegistration.event_id}
                          </Typography>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
                            User: {selectedRegistration.user_id}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
                <Button variant="outlined" startIcon={<Download size={16} />}>
                  Send Ticket
                </Button>
                {selectedRegistration.registration_status === 'pending' && (
                  <Button variant="contained" startIcon={<CheckCircle size={16} />}>
                    Confirm Registration
                  </Button>
                )}
                {selectedRegistration.payment_status === 'unpaid' && (
                  <Button variant="contained" startIcon={<CreditCard size={16} />}>
                    Process Payment
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminEventRegistration;