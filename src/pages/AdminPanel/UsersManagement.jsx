import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, Avatar, TableCell, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { UserPlus, Eye, Edit, Users, UserCheck, UserX } from 'lucide-react';

// Import the reusable AdminTable component
import AdminTable from '../../components/ui/AdminTable';
import { Button } from '../../components/ui';

// Importing services for API calls
import { getAllUsers, addUser, updateUser, deleteUser, getUserStats } from '../../services/userService';

// Context
import { UserContext } from '../../contexts/UserContext';

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

// Role options
const ROLE_OPTIONS = ['All', 'admin', 'user'];

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0
  });
  const { user } = useContext(UserContext);

  // Email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fetch users and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers(user.token);
        setUsers(data || []);
        const statsData = await getUserStats(user.token);
        setStats({
          totalUsers: statsData?.totalUsers || 0,
          activeUsers: statsData?.activeUsers || 0,
          inactiveUsers: statsData?.inactiveUsers || 0,
          adminUsers: data?.filter(u => u.role === 'admin').length || 0
        });
      } catch (error) {
        console.error('Error fetching users or stats:', error);
      }
    };
    fetchData();
  }, [user.token]);

  // Table columns configuration
  const tableColumns = [
    { field: 'user', label: 'User' },
    { field: 'username', label: 'Username' },
    { field: 'email', label: 'Email' },
    { field: 'phone_number', label: 'Phone' },
    { field: 'role', label: 'Role' },
    { field: 'is_active', label: 'Status' },
    { field: 'email_verified', label: 'Email Verified' },
    { field: 'last_login', label: 'Last Login' },
    { field: 'createdAt', label: 'Joined' }
  ];

  // Form fields configuration
  const formFields = [
    { name: 'username', label: 'Username', required: true, gridSize: { xs: 12, sm: 6 } },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      gridSize: { xs: 12, sm: 6 }
    },
    {
      name: 'password_hash',
      label: 'Password',
      type: 'password',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      disabled: (formData) => !!formData._id
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: ROLE_OPTIONS.filter(opt => opt !== 'All').map(role => ({
        value: role,
        label: role.charAt(0).toUpperCase() + role.slice(1)
      })),
      gridSize: { xs: 12, sm: 6 }
    },
    { name: 'first_name', label: 'First Name', gridSize: { xs: 12, sm: 6 } },
    { name: 'last_name', label: 'Last Name', gridSize: { xs: 12, sm: 6 } },
    { name: 'phone_number', label: 'Phone Number', gridSize: { xs: 12, sm: 6 } },
    { name: 'profile_picture_url', label: 'Profile Picture URL', gridSize: { xs: 12, sm: 6 } },
    {
      name: 'is_active',
      label: 'Active Account',
      type: 'switch',
      gridSize: { xs: 12 },
      defaultValue: true
    },
    {
      name: 'email_verified',
      label: 'Email Verified',
      type: 'switch',
      gridSize: { xs: 12 },
      defaultValue: false
    }
  ];

  // Stats data for the component
  const statsData = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users },
    { label: 'Active Users', value: stats.activeUsers, icon: UserCheck },
    { label: 'Inactive Users', value: stats.inactiveUsers, icon: UserX },
    { label: 'Admins', value: stats.adminUsers, icon: Eye }
  ];

  // Format date helper
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'Never';
  };

  // Validation functions
  const validateForm = (formData, errors, setErrors) => {
    const newErrors = {};

    if (!formData.username?.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@gmail.com)';
    }

    if (!formData._id && !formData.password_hash?.trim()) {
      newErrors.password_hash = 'Password is required for new users';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value, formData, setErrors) => {
    let error = '';

    if (name === 'username' && !value?.trim()) {
      error = 'Username is required';
    }

    if (name === 'email') {
      if (!value?.trim()) {
        error = 'Email is required';
      } else if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address (e.g., user@gmail.com)';
      }
    }

    if (name === 'password_hash' && !formData._id && !value?.trim()) {
      error = 'Password is required for new users';
    }

    if (name === 'role' && !value) {
      error = 'Role is required';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (formData, isEditMode, selectedItem) => {
    try {
      const payload = {
        ...formData,
        password: formData.password_hash
      };
      if (isEditMode) {
        await updateUser(selectedItem._id, payload, user.token);
      } else {
        await addUser(payload, user.token);
      }
      const updated = await getAllUsers(user.token);
      setUsers(updated || []);
      const updatedStats = await getUserStats(user.token);
      setStats({
        totalUsers: updatedStats?.totalUsers || 0,
        activeUsers: updatedStats?.activeUsers || 0,
        inactiveUsers: updatedStats?.inactiveUsers || 0,
        adminUsers: updated?.filter(u => u.role === 'admin').length || 0
      });
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  // Handle menu actions
  const handleMenuAction = async (action, item) => {
    if (action === 'delete') {
      try {
        await deleteUser(item._id, user.token);
        const updated = await getAllUsers(user.token);
        setUsers(updated || []);
        const updatedStats = await getUserStats(user.token);
        setStats({
          totalUsers: updatedStats?.totalUsers || 0,
          activeUsers: updatedStats?.activeUsers || 0,
          inactiveUsers: updatedStats?.inactiveUsers || 0,
          adminUsers: updated?.filter(u => u.role === 'admin').length || 0
        });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Custom table row renderer
  const renderTableRow = (userItem) => (
    <>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={userItem.profile_picture_url || '/api/placeholder/40/40'}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant='body2' fontWeight='medium'>
              {`${userItem.first_name || ''} ${userItem.last_name || ''}`.trim() || 'No Name'}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{userItem.username}</TableCell>
      <TableCell>{userItem.email}</TableCell>
      <TableCell>{userItem.phone_number || '-'}</TableCell>
      <TableCell>
        <Chip
          label={userItem.role}
          color={userItem.role === 'admin' ? 'primary' : 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={userItem.is_active ? 'Active' : 'Inactive'}
          color={userItem.is_active ? 'success' : 'error'}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={userItem.email_verified ? 'Verified' : 'Unverified'}
          color={userItem.email_verified ? 'success' : 'warning'}
          size='small'
        />
      </TableCell>
      <TableCell>{formatDate(userItem.last_login)}</TableCell>
      <TableCell>{formatDate(userItem.createdAt)}</TableCell>
    </>
  );

  // Custom details dialog renderer
  const renderDetailsDialog = (userItem, onClose, onEdit) => (
    <>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' fontWeight='bold'>
            {userItem.username}
          </Typography>
          <Chip
            label={userItem.role}
            color={userItem.role === 'admin' ? 'primary' : 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Avatar
              src={userItem.profile_picture_url || '/api/placeholder/200/200'}
              sx={{ width: '100%', height: 200 }}
              variant='rounded'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              {[
                { label: 'Username', value: userItem.username },
                { label: 'Email', value: userItem.email },
                { label: 'First Name', value: userItem.first_name || '-' },
                { label: 'Last Name', value: userItem.last_name || '-' },
                { label: 'Phone Number', value: userItem.phone_number || '-' },
                { label: 'Role', value: userItem.role },
                { label: 'Status', value: userItem.is_active ? 'Active' : 'Inactive' },
                { label: 'Email Verified', value: userItem.email_verified ? 'Yes' : 'No' },
                { label: 'Last Login', value: formatDate(userItem.last_login) },
                { label: 'Account Created', value: formatDate(userItem.createdAt) },
                { label: 'Last Updated', value: formatDate(userItem.updatedAt) }
              ].map((field, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    {field.label}
                  </Typography>
                  <Typography variant='body1'>
                    {field.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Close
        </Button>
        <Button variant='contained' startIcon={<Edit size={16} />} onClick={onEdit}>
          Edit User
        </Button>
      </DialogActions>
    </>
  );

  return (
    <AdminTable
      title='User Management'
      subtitle='Manage and monitor platform users'
      createButtonText='Add New User'
      createButtonIcon={<UserPlus size={20} />}
      chartData={userGrowthData}
      chartType='area'
      chartDataKey='users'
      chartXAxisKey='date'
      chartTitle='User Growth Over Time'
      statsData={statsData}
      tableColumns={tableColumns}
      tableData={users}
      searchFields={['username', 'email', 'first_name', 'last_name']}
      filterOptions={{
        label: 'Role',
        field: 'role',
        options: ROLE_OPTIONS
      }}
      onFormSubmit={handleFormSubmit}
      onMenuAction={handleMenuAction}
      renderTableRow={renderTableRow}
      renderDetailsDialog={renderDetailsDialog}
      formFields={formFields}
      validateForm={validateForm}
      validateField={validateField}
      statusColors={{
        Active: '#4CAF50',
        Inactive: '#F44336'
      }}
      categoryColors={{
        admin: 'primary',
        user: 'default'
      }}
    />
  );
}

export default AdminUsers;
