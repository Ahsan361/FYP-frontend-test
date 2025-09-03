import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Avatar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem as SelectMenuItem, FormHelperText, 
  OutlinedInput, Switch, FormControlLabel
} from '@mui/material';
import { MoreVertical, Edit, Trash2, Eye, Search, Calendar } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom components
import { Card, Button, Input } from '.';

// Context
import { UserContext } from "../../contexts/UserContext";

const AdminTable = ({
  title,
  subtitle,
  createButtonText,
  createButtonIcon,
  chartData,
  chartType = 'bar', // 'bar' or 'area'
  chartDataKey,
  chartXAxisKey = 'name', // New prop for x-axis data key
  chartTitle,
  statsData,
  tableColumns,
  tableData,
  searchFields,
  filterOptions,
  onFormSubmit,
  onMenuAction,
  renderTableRow,
  renderDetailsDialog,
  formFields,
  validateForm,
  validateField,
  statusColors = {},
  categoryColors = {},
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const { user } = useContext(UserContext);

  // Initialize selectedFilters based on filterOptions
  useEffect(() => {
    if (Array.isArray(filterOptions)) {
      const initialFilters = {};
      filterOptions.forEach(filter => {
        initialFilters[filter.field] = filter.options.includes('All') ? 'All' : '';
      });
      setSelectedFilters(initialFilters);
    } else if (filterOptions?.field) {
      setSelectedFilters({ [filterOptions.field]: filterOptions.options.includes('All') ? 'All' : '' });
    }
  }, [filterOptions]);

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFormOpen = (item = null) => {
    if (item) {
      const formattedItem = { ...item };
      formFields.forEach(field => {
        if (field.type === 'datetime-local' && item[field.name]) {
          formattedItem[field.name] = new Date(item[field.name]).toISOString().slice(0, 16);
        }
      });
      setFormData(formattedItem);
      setIsEditMode(true);
    } else {
      setFormData({});
      setIsEditMode(false);
    }
    setOpenFormDialog(true);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
    setFormData({});
    setIsEditMode(false);
    setErrors({});
    setFormSubmitted(false);
    setTouched(false);
  };

  const handleFormSubmit = async () => {
    setFormSubmitted(true);
    
    if (validateForm && !validateForm(formData, errors, setErrors)) {
      return;
    }
    
    try {
      await onFormSubmit(formData, isEditMode, selectedItem);
      handleFormClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleMenuAction = async (action, item) => {
    switch (action) {
      case 'view':
        setSelectedItem(item);
        setOpenDialog(true);
        setAnchorEl(null);
        break;
      case 'edit':
        handleFormOpen(item);
        setAnchorEl(null);
        break;
      case 'delete':
        setAnchorEl(null);
        await onMenuAction(action, item);
        break;
      default:
        break;
    }
  };

  // Filter and search logic
  const filteredData = (tableData || []).filter(item => {
    const matchesSearch = searchFields.some(field =>
      item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilters = Array.isArray(filterOptions)
      ? filterOptions.every(filter => 
          selectedFilters[filter.field] === 'All' || !selectedFilters[filter.field] || item[filter.field] === selectedFilters[filter.field]
        )
      : !filterOptions || selectedFilters[filterOptions.field] === 'All' || !selectedFilters[filterOptions.field] || item[filterOptions.field] === selectedFilters[filterOptions.field];
    return matchesSearch && matchesFilters;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {subtitle}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={createButtonIcon} sx={{ px: 3, py: 1.5 }} onClick={() => handleFormOpen()}>
          {createButtonText}
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {chartTitle}
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              {chartType === 'bar' ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={chartXAxisKey} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={chartDataKey} fill="#1B4332" />
                </BarChart>
              ) : (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1B4332" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={chartXAxisKey} />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey={chartDataKey}
                    stroke="#1B4332"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    strokeWidth={2}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Statistics
            </Typography>
            <Box sx={{ space: 3 }}>
              {statsData.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < statsData.length - 1 ? '1px solid' : 'none',
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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={20} />}
              fullWidth
            />
          </Grid>
          {Array.isArray(filterOptions) ? (
            filterOptions.map((filter, index) => (
              <Grid size={{ xs: 12, md: 3 }} key={filter.field}>
                <FormControl fullWidth>
                  <InputLabel>{filter.label}</InputLabel>
                  <Select
                    value={selectedFilters[filter.field] || ''}
                    onChange={(e) =>
                      setSelectedFilters({ ...selectedFilters, [filter.field]: e.target.value })
                    }
                    label={filter.label}
                  >
                    {filter.options.map((option) => (
                      <SelectMenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                        {option}
                      </SelectMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))
          ) : filterOptions ? (
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>{filterOptions.label}</InputLabel>
                <Select
                  value={selectedFilters[filterOptions.field] || ''}
                  onChange={(e) =>
                    setSelectedFilters({ ...selectedFilters, [filterOptions.field]: e.target.value })
                  }
                  label={filterOptions.label}
                >
                  {filterOptions.options.map((option) => (
                    <SelectMenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                      {option}
                    </SelectMenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null}
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

      {/* Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableCell key={column.field} align={column.align || 'left'}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item._id} hover>
                  {renderTableRow(item)}
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, item)}>
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          disableRestoreFocus
        >
          <MenuItem onClick={() => handleMenuAction('view', selectedItem)}>
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction('edit', selectedItem)}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit
          </MenuItem>
          <MenuItem 
            onClick={() => handleMenuAction('delete', selectedItem)} 
            sx={{ color: 'error.main' }}
          >
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
        </Menu>
      </Card>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        {selectedItem && renderDetailsDialog && renderDetailsDialog(selectedItem, () => setOpenDialog(false), () => {
          handleFormOpen(selectedItem);
          setOpenDialog(false);
        })}
      </Dialog>

      {/* Form Dialog */}
      <Dialog open={openFormDialog} onClose={handleFormClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditMode ? 'Edit' : 'Create'} {title.split(' ')[0]}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {formFields.map((field) => (
              <Grid size={field.gridSize || { xs: 12 }} key={field.name}>
                {field.type === 'select' ? (
                  <FormControl fullWidth error={formSubmitted && !!errors[field.name]}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={formData[field.name] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({ ...prev, [field.name]: value }));
                        if (field.onChange) {
                          field.onChange(value, setFormData, formData);
                        }
                        if (validateField && (formSubmitted || touched)) {
                          validateField(field.name, value, formData, setErrors);
                        }
                      }}
                      label={field.label}
                    >
                      {field.options.map((option) => (
                        <SelectMenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
                          {option.label}
                        </SelectMenuItem>
                      ))}
                    </Select>
                    {formSubmitted && errors[field.name] && (
                      <FormHelperText>{errors[field.name]}</FormHelperText>
                    )}
                  </FormControl>
                ) : field.type === 'switch' ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData[field.name] ?? field.defaultValue ?? false}
                        onChange={(e) => {
                          const value = e.target.checked;
                          setFormData((prev) => ({ ...prev, [field.name]: value }));
                          if (field.onChange) {
                            field.onChange(value, setFormData, formData);
                          }
                          if (validateField && (formSubmitted || touched)) {
                            validateField(field.name, value, formData, setErrors);
                          }
                        }}
                      />
                    }
                    label={field.label}
                  />
                ) : (
                  <TextField
                    label={field.label}
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const nextFormData = { ...formData, [field.name]: value };
                      setFormData(nextFormData);
                      if (validateField && (formSubmitted || touched)) {
                        validateField(field.name, value, nextFormData, setErrors);
                      }
                    }}
                    fullWidth
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                    required={field.required || false}
                    error={formSubmitted && !!errors[field.name]}
                    helperText={formSubmitted && errors[field.name]}
                    InputLabelProps={field.type === 'datetime-local' ? { shrink: true } : {}}
                    disabled={field.disabled ? field.disabled(formData) : false}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleFormClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminTable;