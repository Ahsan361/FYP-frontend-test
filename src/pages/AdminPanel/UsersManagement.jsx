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
  Divider
} from '@mui/material';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus, 
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Award,
  Clock,
  Shield,
  Users
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, Button, Input, Badge } from '../../components/ui';

// Test data
const users = [
  {
    id: 1,
    name: 'Dr. Sarah Ahmed',
    email: 'sarah.ahmed@example.com',
    role: 'Researcher',
    status: 'Active',
    joinDate: '2024-01-15',
    lastActive: '2024-02-28',
    contributionsCount: 23,
    viewsCount: 1247,
    location: 'Lahore',
    phone: '+92-300-1234567',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Muhammad Ali Khan',
    email: 'ali.khan@example.com',
    role: 'Curator',
    status: 'Active',
    joinDate: '2023-11-20',
    lastActive: '2024-02-27',
    contributionsCount: 67,
    viewsCount: 2156,
    location: 'Karachi',
    phone: '+92-321-9876543',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Fatima Malik',
    email: 'fatima.malik@example.com',
    role: 'Student',
    status: 'Active',
    joinDate: '2024-02-01',
    lastActive: '2024-02-26',
    contributionsCount: 8,
    viewsCount: 456,
    location: 'Islamabad',
    phone: '+92-333-5555444',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 4,
    name: 'Prof. Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-08-10',
    lastActive: '2024-02-28',
    contributionsCount: 145,
    viewsCount: 3421,
    location: 'Peshawar',
    phone: '+92-300-7777888',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 5,
    name: 'Zara Sheikh',
    email: 'zara.sheikh@example.com',
    role: 'Visitor',
    status: 'Inactive',
    joinDate: '2024-01-05',
    lastActive: '2024-02-10',
    contributionsCount: 2,
    viewsCount: 89,
    location: 'Rawalpindi',
    phone: '+92-345-1111222',
    avatar: '/api/placeholder/40/40'
  }
];

const userRoleData = [
  { name: 'Visitors', value: 1847, color: '#1B4332' },
  { name: 'Students', value: 523, color: '#2D5A3D' },
  { name: 'Researchers', value: 234, color: '#B8860B' },
  { name: 'Curators', value: 89, color: '#D4AF37' },
  { name: 'Admins', value: 12, color: '#616161' }
];

const userActivityData = [
  { month: 'Jan', active: 1234, new: 156 },
  { month: 'Feb', active: 1456, new: 203 },
  { month: 'Mar', active: 1678, new: 289 },
  { month: 'Apr', active: 1834, new: 234 },
  { month: 'May', active: 2012, new: 345 },
  { month: 'Jun', active: 2156, new: 287 }
];

const roleColors = {
  'Admin': 'error',
  'Curator': 'warning',
  'Researcher': 'info',
  'Student': 'success',
  'Visitor': 'default'
};

const statusColors = {
  'Active': 'success',
  'Inactive': 'default',
  'Suspended': 'error'
};

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRole === 'All' || user.role === selectedRole)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Users Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage platform users
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<UserPlus size={20} />}
          sx={{ px: 3, py: 1.5 }}
        >
          Add New User
        </Button>
      </Box>

      {/* User Analytics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* User Role Distribution */}
        <Grid size = {{ xs:12, md:6}}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Role Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* User Activity Trends */}
        <Grid size = {{ xs:12, md:6}}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Activity & Growth
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#1B4332" name="Active Users" />
                <Bar dataKey="new" fill="#B8860B" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid size = {{ xs:12}}>
          <Grid container spacing={2}>
            {[
              { label: 'Total Users', value: '2,847', change: '+12.5%', icon: Users, color: '#1B4332' },
              { label: 'Active Today', value: '234', change: '+5.2%', icon: Clock, color: '#2D5A3D' },
              { label: 'New This Month', value: '156', change: '+8.7%', icon: UserPlus, color: '#B8860B' },
              { label: 'Premium Members', value: '89', change: '+15.3%', icon: Award, color: '#D4AF37' }
            ].map((stat, index) => (
              <Grid size = {{xs:12, sm:6, md:3}} key={index}>
                <Card sx={{ p: 2, borderLeft: `4px solid ${stat.color}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="success.main">
                        {stat.change}
                      </Typography>
                    </Box>
                    <stat.icon size={24} color={stat.color} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size = {{ xs:12, md:8}}>
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={20} />}
              fullWidth
            />
          </Grid>
          <Grid size = {{ xs:12, md:4}}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
            >
              Filter by Role
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Users Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Contributions</TableCell>
                <TableCell align="center">Views</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={user.avatar}
                        sx={{ mr: 2, width: 40, height: 40 }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={roleColors[user.role]}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {user.role}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={statusColors[user.status]}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {user.status}
                    </Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="medium">
                      {user.contributionsCount}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {user.viewsCount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.location}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, user)}
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
            View Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit User
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Mail size={16} style={{ marginRight: 8 }} />
            Send Message
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Shield size={16} style={{ marginRight: 8 }} />
            Manage Permissions
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Suspend User
          </MenuItem>
        </Menu>

        {/* User Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          {selectedUser && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={selectedUser.avatar}
                    sx={{ mr: 2, width: 50, height: 50 }}
                  >
                    {selectedUser.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedUser.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size = {{ xs:12, md:6}}>
                    <Box sx={{ space: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Shield size={18} style={{ marginRight: 8 }} />
                        <Typography variant="subtitle2">Role:</Typography>
                        <Badge variant={roleColors[selectedUser.role]} sx={{ ml: 1 }}>
                          {selectedUser.role}
                        </Badge>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Phone size={18} style={{ marginRight: 8 }} />
                        <Typography variant="body2">
                          {selectedUser.phone}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Calendar size={18} style={{ marginRight: 8 }} />
                        <Typography variant="body2">
                          Joined: {new Date(selectedUser.joinDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Clock size={18} style={{ marginRight: 8 }} />
                        <Typography variant="body2">
                          Last Active: {new Date(selectedUser.lastActive).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid size = {{ xs:12, md:6}}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Activity Summary</Typography>
                    <Box sx={{ space: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Contributions:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {selectedUser.contributionsCount}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Total Views:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {selectedUser.viewsCount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Location:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {selectedUser.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Status:</Typography>
                        <Badge variant={statusColors[selectedUser.status]}>
                          {selectedUser.status}
                        </Badge>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
                <Button variant="outlined" startIcon={<Mail size={16} />}>
                  Send Message
                </Button>
                <Button variant="contained" startIcon={<Edit size={16} />}>
                  Edit User
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminUsers;