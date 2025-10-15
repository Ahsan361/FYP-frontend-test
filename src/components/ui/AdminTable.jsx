import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem as SelectMenuItem, FormHelperText, 
  Switch, FormControlLabel, useMediaQuery, useTheme, CircularProgress 
} from '@mui/material';

import {MoreVertical, Edit, Trash2, Eye, Search, Calendar, XCircle, CreditCard, Circle, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

// Custom components
import { Card, Button, Input } from '.';

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
  onCancel,       
  onPayment,      
  showCancel = false,
  showPayment = false,
  additionalCharts,
  fieldConstraints,
  errors, 
  setErrors 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  // const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const [activeField, setActiveField] = useState(null);
  
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

  // UPDATED handleFormOpen function
  const handleFormOpen = (item = null) => {
    if (item) {
      const formattedItem = { ...item };
      formFields.forEach(field => {
        if (field.type === 'datetime-local' && item[field.name]) {
          formattedItem[field.name] = new Date(item[field.name]).toISOString().slice(0, 16);
        }
        
        // Handle existing images (don't convert to File objects, keep as-is for display)
        if ((field.name === 'exhibitionImage' || field.name === 'eventImage' || 
             field.name === 'artifactImage' || field.name === 'profileImage') && 
            item[field.name]) {
          // Keep existing image structure (array of {url, publicId} objects)
          formattedItem[field.name] = item[field.name];
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
      setIsSubmitting(true);
      await onFormSubmit(formData, isEditMode, selectedItem);
      handleFormClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false); 
  }
  };

  // Enhanced handleMenuAction to support cancel and payment
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
      case 'cancel':
        setAnchorEl(null);
        if (onCancel) {
          await onCancel(item);
        }
        break;
      case 'payment':
        setAnchorEl(null);
        if (onPayment) {
          await onPayment(item);
        }
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
                <ComposedChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#colorRegistrations)"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#52B788" strokeWidth={2} dot={false} />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: 350 }}>
            {additionalCharts ? (
              additionalCharts.map((chart, index) => (
                <Box key={index} sx={{ mb: index < additionalCharts.length - 1 ? 2 : 0 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom  sx={{ pb: 2 }}  >
                    {chart.title}
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={chart.data}
                        dataKey={chart.dataKey}
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {chart.data.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center" 
                        wrapperStyle={{
                          bottom: isMobile ? -35 : -15, // adjust per breakpoint
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              ))
            ) : (
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
            )}
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
          {showCancel && (
            <MenuItem 
              onClick={() => handleMenuAction('cancel', selectedItem)} 
              sx={{ color: 'error.main' }}
            >
              <XCircle size={16} style={{ marginRight: 8 }} />
              Cancel Registration
            </MenuItem>
          )}
          {showPayment && (
            <MenuItem 
              onClick={() => handleMenuAction('payment', selectedItem)} 
              sx={{ color: 'success.main' }}
            >
              <CreditCard size={16} style={{ marginRight: 8 }} />
              Confirm Payment
            </MenuItem>
          )}
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
          {/* Add this new conditional error banner */}
          {errors?.generalError && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'error.lighter', border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
              <Typography variant="body2" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle2 size={16} style={{ marginRight: 8, color: 'error.main' }} />
                {errors.generalError}
              </Typography>
            </Box>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {formFields.map((field) => (
              <Grid size={field.gridSize || { xs: 12 }} key={field.name}>
                {field.type === 'custom' ? (
                  field.render(formData, setFormData, errors)
                ) : field.type === 'select' ? (
                  <FormControl fullWidth error={formSubmitted && !!errors[field.name]}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={formData[field.name] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({ ...prev, [field.name]: value }));
                        setTouched(true);
                        if (field.onChange) {
                          field.onChange(value, setFormData, formData);
                        }
                        if (validateField) {
                          validateField(field.name, value, formData, setErrors);
                        }
                      }}
                      onFocus={() => setActiveField(field.name)}
                      onBlur={() => setActiveField(null)}
                      label={field.label}
                    >
                      {field.options.map((option) => (
                        <SelectMenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
                          {option.label}
                        </SelectMenuItem>
                      ))}
                    </Select>
                    {formSubmitted && errors[field.name] && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors[field.name]}
                      </FormHelperText>
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
                          setTouched(true);
                          if (field.onChange) {
                            field.onChange(value, setFormData, formData);
                          }
                          if (validateField) {
                            validateField(field.name, value, formData, setErrors);
                          }
                        }}
                        onFocus={() => setActiveField(field.name)}
                        onBlur={() => setActiveField(null)}
                      />
                    }
                    label={field.label}
                  />
                ) : field.name === "profileImage" || field.name === "artifactImage" || field.name === "eventImage" || field.name === "exhibitionImage" ? (
                  <Box>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{
                        height: '56px',
                        textTransform: 'none',
                        borderColor: formData[field.name] ? 'success.main' : undefined,
                        color: formData[field.name] ? 'success.main' : undefined,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>
                          {formData[field.name] 
                            ? (field.multiple 
                                ? `${Array.isArray(formData[field.name]) ? formData[field.name].length : 1} image(s) selected` 
                                : "Change Image")
                            : (field.multiple ? "Upload Images (Max 10)" : "Upload Image")}
                        </Typography>
                      </Box>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        multiple={field.multiple || false}
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          if (files.length > 0) {
                            if (field.multiple) {
                              // Handle multiple files
                              if (files.length > 10) {
                                setErrors((prev) => ({ 
                                  ...prev, 
                                  [field.name]: "Maximum 10 images allowed" 
                                }));
                                return;
                              }
                              const nextFormData = { ...formData, [field.name]: files };
                              setFormData(nextFormData);
                              if (validateField && (formSubmitted || touched)) {
                                validateField(field.name, files, nextFormData, setErrors);
                              }
                            } else {
                              // Handle single file
                              const file = files[0];
                              const nextFormData = { ...formData, [field.name]: file };
                              setFormData(nextFormData);
                              if (validateField && (formSubmitted || touched)) {
                                validateField(field.name, file, nextFormData, setErrors);
                              }
                            }
                          }
                        }}
                      />
                    </Button>
                    
                    {/* Display selected files preview */}
                    {formData[field.name] && (
                      <Box sx={{ mt: 2 }}>
                        {field.multiple && Array.isArray(formData[field.name]) ? (
                          // Multiple files preview
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {formData[field.name].map((item, index) => {
                              // Check if it's a File object or existing image object
                              const isFile = item instanceof File;
                              const imageUrl = isFile ? URL.createObjectURL(item) : item.url;
                              const imageName = isFile ? item.name : `Image ${index + 1}`;
                              
                              return (
                                <Box
                                  key={index}
                                  sx={{
                                    position: 'relative',
                                    width: 80,
                                    height: 80,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    overflow: 'hidden'
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={imageUrl}
                                    alt={`Preview ${index + 1}`}
                                    sx={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: 'absolute',
                                      top: 2,
                                      right: 2,
                                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                      '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                      }
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const newFiles = formData[field.name].filter((_, i) => i !== index);
                                      const nextFormData = { 
                                        ...formData, 
                                        [field.name]: newFiles.length > 0 ? newFiles : null 
                                      };
                                      setFormData(nextFormData);
                                      if (validateField && (formSubmitted || touched)) {
                                        validateField(field.name, newFiles.length > 0 ? newFiles : null, nextFormData, setErrors);
                                      }
                                    }}
                                  >
                                    <XCircle size={14} color={theme.palette.error.main} />
                                  </IconButton>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      position: 'absolute',
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                      color: 'white',
                                      px: 0.5,
                                      py: 0.25,
                                      fontSize: '0.65rem',
                                      textAlign: 'center',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {imageName}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        ) : (
                          // Single file preview with thumbnail
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              sx={{
                                position: 'relative',
                                width: 80,
                                height: 80,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                overflow: 'hidden'
                              }}
                            >
                              <Box
                                component="img"
                                src={formData[field.name] instanceof File 
                                  ? URL.createObjectURL(formData[field.name]) 
                                  : formData[field.name].url}
                                alt="Preview"
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="caption" color="textSecondary">
                                {formData[field.name] instanceof File 
                                  ? formData[field.name].name 
                                  : 'Current Image'}
                              </Typography>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const nextFormData = { ...formData, [field.name]: null };
                                setFormData(nextFormData);
                                if (validateField && (formSubmitted || touched)) {
                                  validateField(field.name, null, nextFormData, setErrors);
                                }
                              }}
                            >
                              <XCircle size={16} color={theme.palette.error.main} />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    )}
                    
                    {formSubmitted && errors[field.name] && (
                      <FormHelperText sx={{ color: 'error.main', mt: 1 }}>
                        {errors[field.name]}
                      </FormHelperText>
                    )}
                  </Box>
                ) : (
                  <TextField
                    label={field.label}
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const nextFormData = { ...formData, [field.name]: value };
                      setFormData(nextFormData);
                      setTouched(true);
                      if (validateField) {
                        validateField(field.name, value, nextFormData, setErrors);
                      }
                    }}
                    onFocus={() => setActiveField(field.name)}
                    onBlur={() => setActiveField(null)}
                    fullWidth
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                    required={field.required || false}
                    error={formSubmitted && !!errors[field.name]}
                    helperText={formSubmitted && errors[field.name] && (
                      <Typography component="span" variant='caption' sx={{ color: 'error.main' }}>
                        {errors[field.name]}
                      </Typography>
                    )}
                    InputLabelProps={field.type === 'datetime-local' ? { shrink: true } : {}}
                    disabled={field.disabled ? field.disabled(formData) : false}
                  />
                )}
                {/* Render constraints list for active field */}
                {activeField === field.name && fieldConstraints?.[field.name] && (
                  <Box sx={{ mt: 1, pl: 2 }}>
                    {fieldConstraints[field.name].map((constraint, index) => {
                      const isMet = formData[field.name] ? constraint.check(formData[field.name]) : false;
                      const IconComponent = isMet ? CheckCircle2 : Circle;
                      return (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <IconComponent
                            size={14}
                            color={isMet ? theme.palette.success.main : theme.palette.error.main}
                            style={{ marginRight: 8 }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: isMet ? 'success.main' : 'error.main' }}
                          >
                            {constraint.message}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Grid>
            ))}
                        
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleFormClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleFormSubmit}  disabled={isSubmitting}>
            {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update' : 'Create'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminTable;