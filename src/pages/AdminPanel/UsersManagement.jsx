import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Avatar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, FormHelperText, OutlinedInput, Switch, FormControlLabel
} from '@mui/material';

// Importing icons
import { MoreVertical, Edit, Trash2, Eye, UserPlus, Search, Calendar, Users, UserCheck, UserX } from 'lucide-react';

// Charts related content
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom components
import { Card, Button, Input } from '../../components/ui';

// Importing context for user data
import { UserContext } from "../../contexts/UserContext";

// Importing services for API calls
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, getUserStats } from '../../services/userService';

// Sample user growth data (replace with real data from backend if available)
const userGrowthData = [
  { date: '01/15', users: 150 },
  { date: '01/22', users: 180 },
  { date: '01/29', users: 220 },
  { date: '02/05', users: 195 },
  { date: '02/12', users: 280 },
  { date: '02/19', users: 320 },
  { date: '02/26', users: 350 }
];

const ROLE_OPTIONS = ["admin", "user"];


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const { user } = useContext(UserContext);

  // Email regex to enforce format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(formData.email || "");

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });

  // Fetch users on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers(user.token);
        setUsers(data);
        const statsData = await getUserStats(user.token);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchData();
  }, [user.token]);

  const handleMenuClick = (event, userItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userItem);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // When edit clicked
  const handleEditClick = (userItem) => {
    setEditingUser(userItem);
    setFormData(userItem);
    setOpenDialog(true);
  };

  const handleViewClick = (userItem) => {
    setSelectedUser(userItem);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setEditingUser(null);
    setOpenDialog(false);
    setFormSubmitted(false);
  };

  const handleAddClick = () => {
    setEditingUser({});
    setFormData({});
    setOpenDialog(true);
  };

  // Submit handler
  const handleSave = async (data) => {
  setFormSubmitted(true);

  // Basic validations
  if (!formData.username || !formData.email || !formData.role ||  !emailRegex.test(formData.email)) {
    return; // Stop submission, red fields will show
  }

  try {
    if (editingUser?._id) {
      // Editing existing user
      await updateUser(editingUser._id, data, user.token);
    } else {
      // Adding new user
      if (!formData.password_hash) return; // Password required

      // Map password_hash to password for backend
      const payload = {
        ...data,
        password: data.password_hash, // <-- key fix
      };

      await addUser(payload, user.token);
    }

    // Fetch fresh user list and update UI
    const updated = await getAllUsers(user.token);
    setUsers(updated);
    handleDialogClose();

    // Refresh stats immediately
    const updatedStats = await getUserStats(user.token);
    setStats(updatedStats);

  } catch (error) {
    console.error("Error saving user:", error);
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteUser(id, user.token);
      // Update details immediately
      const updated = await getAllUsers(user.token);
      setUsers(updated);
      // Refresh stats immediately
      const updatedStats = await getUserStats(user.token);
      setStats(updatedStats);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((userItem) => {
    const username = userItem.username?.toLowerCase() || "";
    const email = userItem.email?.toLowerCase() || "";
    const firstName = userItem.first_name?.toLowerCase() || "";
    const lastName = userItem.last_name?.toLowerCase() || "";
    
    const matchesSearch = 
      username.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      firstName.includes(searchTerm.toLowerCase()) ||
      lastName.includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "All" || userItem.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage and monitor platform users
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<UserPlus size={20} />}
          sx={{ px: 3, py: 1.5 }}
          onClick={handleAddClick}
        >
          Add New User
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Growth Over Time
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#1B4332" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Stats
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: "Total Users", value: stats.totalUsers, icon: Users },
                { label: "Active Users", value: stats.activeUsers, icon: UserCheck },
                { label: "Inactive Users", value: stats.inactiveUsers, icon: UserX },
                { label: "Admins", value: users.filter(u => u.role === 'admin').length, icon: Eye }
              ].map((stat, index) => (
                <Box key={index} sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  py: 2,
                  borderBottom: index < 3 ? "1px solid" : "none",
                  borderColor: "divider"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Input
              placeholder="Search users by name, username, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={20} />}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {ROLE_OPTIONS.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
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

      {/* Users Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>User</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Email Verified</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Last Login</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Joined</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((userItem) => (
                <TableRow key={userItem._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={userItem.profile_picture_url || "/api/placeholder/40/40"} 
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {`${userItem.first_name || ''} ${userItem.last_name || ''}`.trim() || 'No Name'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{userItem.username}</TableCell>
                  <TableCell>{userItem.email}</TableCell>
                  <TableCell>{userItem.phone_number || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={userItem.role}
                      color={userItem.role === "admin" ? "primary" : "default"}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={userItem.is_active ? "Active" : "Inactive"}
                      color={userItem.is_active ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={userItem.email_verified ? "Verified" : "Unverified"}
                      color={userItem.email_verified ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {userItem.last_login 
                      ? new Date(userItem.last_login).toLocaleDateString() 
                      : "Never"
                    }
                  </TableCell>
                  <TableCell>
                    {new Date(userItem.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, userItem)}>
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
          <MenuItem onClick={() => { handleViewClick(selectedUser); handleMenuClose(); }}>
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => { handleEditClick(selectedUser); handleMenuClose(); }}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit
          </MenuItem>
          <MenuItem 
            onClick={() => { handleDelete(selectedUser._id); handleMenuClose(); }} 
            sx={{ color: 'error.main' }}
            disabled={selectedUser?._id === user._id} // Prevent self-deletion
          >
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* User Details Dialog (View Only) */}
        <Dialog open={openDialog && !editingUser} onClose={handleDialogClose} maxWidth="md" fullWidth>
          {selectedUser && (
            <>
              <DialogTitle>
                <Typography component="span" variant="h6" fontWeight="bold">
                  {selectedUser.username}
                </Typography>
              </DialogTitle>

              <DialogContent>
                <Grid container spacing={3}>
                  {/* Profile Picture Section */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Avatar 
                      src={selectedUser.profile_picture_url || "/api/placeholder/200/200"} 
                      sx={{ width: '100%', height: 200 }} 
                      variant="rounded" 
                    />
                  </Grid>

                  {/* Details Section */}
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Box>
                      {[
                        { label: "Username", value: selectedUser.username },
                        { label: "Email", value: selectedUser.email },
                        { label: "First Name", value: selectedUser.first_name },
                        { label: "Last Name", value: selectedUser.last_name },
                        { label: "Phone Number", value: selectedUser.phone_number },
                        { label: "Role", value: selectedUser.role },
                        { label: "Status", value: selectedUser.is_active ? "Active" : "Inactive" },
                        { label: "Email Verified", value: selectedUser.email_verified ? "Yes" : "No" },
                        { label: "Last Login", value: selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleString() : "Never" },
                        { label: "Account Created", value: new Date(selectedUser.createdAt).toLocaleString() },
                        { label: "Last Updated", value: new Date(selectedUser.updatedAt).toLocaleString() },
                      ].map((field, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="textSecondary">
                            {field.label}
                          </Typography>
                          <Typography variant="body1">
                            {field.value || "-"}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* User Edit Dialog */}
        <Dialog open={Boolean(editingUser)} onClose={handleDialogClose} maxWidth="md" fullWidth>
          {editingUser && (
            <>
              <DialogTitle>
                <Typography component="span" variant="h6" fontWeight="bold">
                  {editingUser?._id ? "Edit User" : "Add User"}
                </Typography>
              </DialogTitle>

              <DialogContent
                dividers 
                sx={{ 
                  maxHeight: "90vh",
                  overflowY: "auto" 
                }}
              >
                <Grid container spacing={3}>
                  {/* Username */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!formData.username && formSubmitted}>
                      <InputLabel shrink>Username</InputLabel>
                      <OutlinedInput
                        value={formData.username ?? editingUser.username ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        label="Username"
                      />
                      {!formData.username && formSubmitted && (
                        <FormHelperText>Username is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Email */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl 
                      fullWidth 
                      error={(formSubmitted || touched) && !isValidEmail}
                    >
                      <InputLabel shrink>Email</InputLabel>
                      <OutlinedInput
                        type="email"
                        value={formData.email ?? ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => setTouched(true)}
                        label="Email"
                      />
                      {(formSubmitted || touched) && !isValidEmail && (
                        <FormHelperText>
                          Please enter a valid email address (e.g., user@gmail.com)
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Password (only for new users) */}
                  {!editingUser?._id && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth error={!formData.password_hash && formSubmitted}>
                        <InputLabel shrink>Password</InputLabel>
                        <OutlinedInput
                          type="password"
                          value={formData.password_hash ?? ""}
                          onChange={(e) =>
                            setFormData({ ...formData, password_hash: e.target.value })
                          }
                          label="Password"
                        />
                        {!formData.password_hash && formSubmitted && (
                          <FormHelperText>Password is required for new users</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  )}

                  {/* Role */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl 
                      fullWidth 
                      required 
                      error={!formData.role && formSubmitted}
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={formData.role ?? editingUser?.role ?? ""}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        {ROLE_OPTIONS.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                      {!formData.role && formSubmitted && (
                        <FormHelperText>Role is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* First Name */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.first_name ?? editingUser.first_name ?? ""}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.last_name ?? editingUser.last_name ?? ""}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phone_number ?? editingUser.phone_number ?? ""}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    />
                  </Grid>

                  {/* Profile Picture URL */}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Profile Picture URL"
                      value={formData.profile_picture_url ?? editingUser.profile_picture_url ?? ""}
                      onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })}
                    />
                  </Grid>

                  {/* Active Status */}
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.is_active ?? editingUser.is_active ?? true}
                          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        />
                      }
                      label="Active Account"
                    />
                  </Grid>

                  {/* Email Verified Status */}
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.email_verified ?? editingUser.email_verified ?? false}
                          onChange={(e) => setFormData({ ...formData, email_verified: e.target.checked })}
                        />
                      }
                      label="Email Verified"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<Edit size={16} />} 
                  onClick={() => handleSave(formData)}
                >
                  {editingUser?._id ? "Save Changes" : "Add User"}
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