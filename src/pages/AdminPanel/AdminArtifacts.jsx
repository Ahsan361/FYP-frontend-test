import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Avatar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, FormHelperText, OutlinedInput, 
} from '@mui/material';
//importing icons 
import { MoreVertical, Edit, Trash2, Eye, Upload, Search,Calendar } from 'lucide-react';
//charts related content 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

//custom components
import { Card, Button, Input } from '../../components/ui';

//importing context for user data here
import { UserContext } from "../../contexts/UserContext";

//importing services for api calls
import { getArtifacts, createArtifact, editArtifact, deleteArtifact, getArtifactStats  } from '../../services/artifactService';

//importing constants for dropdown options
import { CATEGORY_OPTIONS, CONDITION_OPTIONS, STATUS_OPTIONS } from "../../constants/enum";

const viewsData = [
  { date: '01/15', views: 1200 },
  { date: '01/22', views: 1800 },
  { date: '01/29', views: 2400 },
  { date: '02/05', views: 1900 },
  { date: '02/12', views: 2800 },
  { date: '02/19', views: 3200 },
  { date: '02/26', views: 2950 }
];

const statusColors = {
  'Published': 'success',
  'Under Review': 'warning', 
  'Draft': 'default',
  'Rejected': 'error'
};

function AdminArtifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingArtifact, setEditingArtifact] = useState(null);
  const [formData, setFormData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    underReview: 0
  });
 
  
  // ✅ Fetch artifacts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtifacts();
        setArtifacts(data);
        const statsData = await getArtifactStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching artifacts", error);
      }
    };
    fetchData();
  }, []);

  const handleMenuClick = (event, artifact) => {
    setAnchorEl(event.currentTarget);
    setSelectedArtifact(artifact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // When edit clicked
const handleEditClick = (artifact) => {
  setEditingArtifact(artifact);
  setFormData(artifact); 
};

const handleViewClick = (artifact) => {
  setSelectedArtifact(artifact);
  setOpenDialog(true);
};

const handleDialogClose = () => {
  setEditingArtifact(null);
  setOpenDialog(false);
};

const handleAddClick = () => {
  setEditingArtifact({});
  setFormData({});
  setOpenDialog(true);
};


// Submit handler
const handleSave = async (data) => {
  setFormSubmitted(true);
  if (!formData.title|| !formData.category || !formData.status || !formData.condition_status) {
    return; // stop submission, red fields will show
  }

  try {
    if (editingArtifact?._id) {
      await editArtifact(editingArtifact._id, data, user.token);
    } else {
      await createArtifact(data, user.token);
    }
    const updated = await getArtifacts();   // fetch fresh list
    setArtifacts(updated);                  // update UI
    handleDialogClose();

    // ✅ Refresh stats immediately
    const updatedStats = await getArtifactStats();
    setStats(updatedStats);

  } catch (error) {
    console.error("Error saving artifact:", error);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteArtifact(id, user.token);
    //update details imediately
    const updated = await getArtifacts();
    setArtifacts(updated);
    // ✅ Refresh stats immediately
    const updatedStats = await getArtifactStats();
    setStats(updatedStats);
  } catch (error) {
    console.error("Error deleting artifact:", error);
  }
};

const filteredArtifacts = artifacts.filter((artifact) => {
  const title = artifact.title?.toLowerCase() || "";
  const matchesTitle = title.includes(searchTerm.toLowerCase());
  const matchesCategory =
    selectedCategory === "All" || artifact.category === selectedCategory;

  return matchesTitle && matchesCategory;
});

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Artifacts Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage and monitor your cultural heritage artifacts
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Upload size={20} />}
          sx={{ px: 3, py: 1.5 }}
          onClick={handleAddClick}
        >
          Add New Artifact
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size = {{ xs:12, lg:8}}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Artifact Views Over Time
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="views" 
                  stroke="#1B4332" 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid size = {{ xs:12, lg:4}}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Stats
            </Typography>
            <Box sx={{ space: 3 }}>
            {[
              { label: "Total Artifacts", value: stats.total, icon: Eye },
              { label: "Published", value: stats.published, icon: Eye },
              { label: "Under Review", value: stats.underReview, icon: Calendar },
              { label: "Drafts", value: stats.drafts, icon: Edit }
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
          <Grid size = {{ xs:12, md:6}}>
            <Input
              placeholder="Search artifacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={20} />}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {CATEGORY_OPTIONS.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size = {{ xs:12, md:3}}>
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

      {/* Artifacts Table */}
      <Card>
        <TableContainer>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Material</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Time Period</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Origin</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Style</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Condition</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>Views</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Contributor</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

            <TableBody>
               {filteredArtifacts.map((artifact) => (
                  <TableRow key={artifact._id} hover>
                    <TableCell>{artifact.title}</TableCell>
                    <TableCell>{artifact.category}</TableCell>
                    <TableCell>{artifact.material || "-"}</TableCell>
                    <TableCell>{artifact.time_period || "-"}</TableCell>
                    <TableCell>{artifact.geographical_origin || "-"}</TableCell>
                    <TableCell>{artifact.artistic_style || "-"}</TableCell>
                    <TableCell>{artifact.condition_status}</TableCell>
                    <TableCell>
                      <Chip
                        label={artifact.status}
                        color={artifact.status === "published" ? "success" : "default"}
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell align="center">{artifact.view_count}</TableCell>
                    <TableCell>
                      {artifact.contributor_id?.username || "Unknown"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, artifact)}>
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
          <MenuItem onClick={() => { handleViewClick(selectedArtifact); handleMenuClose(); }}>
            <Eye size={16} style={{ marginRight: 8 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => { handleEditClick(selectedArtifact); handleMenuClose(); }}>
            <Edit size={16} style={{ marginRight: 8 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleDelete(selectedArtifact._id)} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* Artifact Details Dialog (View Only) */}
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
          {selectedArtifact && (
            <>
              <DialogTitle>
                <Typography component="span" variant="h6" fontWeight="bold">
                  {editingArtifact ? "Edit Artifact" : selectedArtifact.title}
                </Typography>
              </DialogTitle>

              <DialogContent>
                <Grid container spacing={3}>
                  {/* Image Section */}
                  <Grid size={{ xs:12, md:4}}>
                    <Avatar 
                      src={selectedArtifact.image || "/api/placeholder/200/200"} 
                      sx={{ width: '100%', height: 200 }} 
                      variant="rounded" 
                    />
                  </Grid>

                  {/* Details Section */}
                  <Grid size ={{xs:12, md:8}}>
                    <Box>
                      {[
                        { label: "Description", value: selectedArtifact.description },
                        { label: "Category", value: selectedArtifact.category },
                        { label: "Material", value: selectedArtifact.material },
                        { label: "Time Period", value: selectedArtifact.time_period },
                        { label: "Origin", value: selectedArtifact.geographical_origin },
                        { label: "Artistic Style", value: selectedArtifact.artistic_style },
                        { label: "Condition", value: selectedArtifact.condition_status },
                        { label: "Dimensions", value: 
                            `${selectedArtifact.dimensions_length || 0} x ${selectedArtifact.dimensions_width || 0} x ${selectedArtifact.dimensions_height || 0} cm` },
                        { label: "Weight", value: selectedArtifact.weight ? `${selectedArtifact.weight} kg` : "-" },
                        { label: "Cultural Significance", value: selectedArtifact.cultural_significance },
                        { label: "Historical Context", value: selectedArtifact.historical_context },
                        { label: "Status", value: selectedArtifact.status },
                        { label: "Featured", value: selectedArtifact.is_featured ? "Yes" : "No" },
                        { label: "Views", value: `${selectedArtifact.view_count?.toLocaleString() || 0} views` },
                        { label: "Contributor", value: selectedArtifact.contributor_id?.username || "Unknown" },
                        { label: "Curator", value: selectedArtifact.curator_id?.username || "Unknown" },
                        { label: "Published At", value: selectedArtifact.published_at ? new Date(selectedArtifact.published_at).toLocaleDateString() : "-" },
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

        {/* Artifact Edit Dialog */}
        <Dialog open={Boolean(editingArtifact)} onClose={handleDialogClose} maxWidth="md" fullWidth>
          {editingArtifact && (
            <>
              <DialogTitle>
                <Typography component="span" variant="h6" fontWeight="bold">
                  {editingArtifact?._id ? "Edit Artifact" : "Add Artifact"}
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
                {/* Title, Description, Material etc → still TextField */}
                <Grid size={{xs:12, sm:6}}>
                  <FormControl fullWidth error={!formData.title}>
                    <InputLabel shrink>Title</InputLabel>
                    <OutlinedInput
                      value={formData.title ?? editingArtifact.title ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      label="Title"
                    />
                    {!formData.title && (
                      <FormHelperText>Title is required</FormHelperText>
                    )}
                  </FormControl>

                </Grid>

                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formData.description ?? editingArtifact.description ?? ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>

                {/* ✅ Category as Select */}
                <Grid size={{xs:12, sm:6}}>
                <FormControl 
                  fullWidth 
                  required 
                  error={!formData.category && formSubmitted} // turns red when empty after submit
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category ?? editingArtifact?.category ?? ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {!formData.category && formSubmitted && (
                    <FormHelperText>Category is required</FormHelperText>
                  )}
                </FormControl>

                </Grid>

                {/* ✅ Condition as Select */}
                <Grid size={{xs:12, sm:6}}>
                  <FormControl
                    fullWidth
                    required 
                    error={!formData.condition_status && formSubmitted}
                  >
                    <InputLabel>Condition</InputLabel>
                    <Select
                      value={formData.condition_status ?? editingArtifact.condition_status ?? ""}
                      onChange={(e) =>
                        setFormData({ ...formData, condition_status: e.target.value })
                      }
                    >
                      {CONDITION_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {!formData.condition_status && formSubmitted && (
                      <FormHelperText>Condition is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* ✅ Status as Select */}
                <Grid size={{xs:12, sm:6}}>
                  <FormControl
                    fullWidth 
                    required 
                    error={!formData.status && formSubmitted}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status ?? editingArtifact.status ?? ""}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    {!formData.status && formSubmitted && (
                    <FormHelperText>Status is required</FormHelperText>
                  )}
                  </FormControl>
                </Grid>
                  {[
                    { label: "Material", field: "material" },
                    { label: "Time Period", field: "time_period" },
                    { label: "Origin", field: "geographical_origin" },
                    { label: "Artistic Style", field: "artistic_style" },
                    { label: "Dimensions Length", field: "dimensions_length" },
                    { label: "Dimensions Width", field: "dimensions_width" },
                    { label: "Dimensions Height", field: "dimensions_height" },
                    { label: "Weight", field: "weight" },
                    { label: "Cultural Significance", field: "cultural_significance" },
                    { label: "Historical Context", field: "historical_context" },
                  ].map((field, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <TextField
                          fullWidth
                          label={field.label}
                          type={
                            ["dimensions_length", "dimensions_width", "dimensions_height", "weight"].includes(field.field)
                              ? "number"
                              : "text"
                          }
                          value={formData[field.field] ?? editingArtifact[field.field] ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              ["dimensions_length", "dimensions_width", "dimensions_height", "weight"].includes(field.field)
                            ) {
                              // Allow only numbers and decimal point
                              if (/^\d*\.?\d*$/.test(value)) {
                                setFormData({ ...formData, [field.field]: value });
                              }
                            } else {
                              setFormData({ ...formData, [field.field]: value });
                            }
                          }}
                        />
                      </Grid>
                    ))}
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
                   {editingArtifact?._id ? "Save Changes" : "Save"}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminArtifacts;