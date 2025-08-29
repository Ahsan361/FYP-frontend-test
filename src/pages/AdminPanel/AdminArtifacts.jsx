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
  Star
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Button, Input, Badge } from '../../components/ui';

// Test data
const artifacts = [
  {
    id: 1,
    name: 'Mughal Miniature Painting',
    category: 'Manuscripts',
    status: 'Published',
    views: 2847,
    downloads: 156,
    uploadDate: '2024-01-15',
    location: 'Lahore Museum',
    rating: 4.8,
    image: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'Ancient Pottery Collection',
    category: 'Pottery',
    status: 'Under Review',
    views: 1932,
    downloads: 89,
    uploadDate: '2024-02-03',
    location: 'National Museum',
    rating: 4.6,
    image: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'Traditional Silk Textile',
    category: 'Textiles',
    status: 'Published',
    views: 1687,
    downloads: 234,
    uploadDate: '2024-01-28',
    location: 'Peshawar Museum',
    rating: 4.9,
    image: '/api/placeholder/60/60'
  },
  {
    id: 4,
    name: 'Historical Gold Coins',
    category: 'Coins',
    status: 'Draft',
    views: 1456,
    downloads: 67,
    uploadDate: '2024-02-10',
    location: 'Karachi Museum',
    rating: 4.3,
    image: '/api/placeholder/60/60'
  },
  {
    id: 5,
    name: 'Gandhara Sculpture',
    category: 'Sculptures',
    status: 'Published',
    views: 2156,
    downloads: 178,
    uploadDate: '2024-01-20',
    location: 'Taxila Museum',
    rating: 4.7,
    image: '/api/placeholder/60/60'
  }
];

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, artifact) => {
    setAnchorEl(event.currentTarget);
    setSelectedArtifact(artifact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedArtifact(null);
  };

  const filteredArtifacts = artifacts.filter(artifact => 
    artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || artifact.category === selectedCategory)
  );

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
                { label: 'Total Artifacts', value: '544', icon: Eye },
                { label: 'Published', value: '421', icon: Eye },
                { label: 'Under Review', value: '89', icon: Calendar },
                { label: 'Drafts', value: '34', icon: Edit }
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
          <Grid size = {{ xs:12, md:3}}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
              onClick={() => {}}
            >
              Filter by Category
            </Button>
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
                <TableCell>Artifact</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Views</TableCell>
                <TableCell align="center">Downloads</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredArtifacts.map((artifact) => (
                <TableRow key={artifact.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={artifact.image} 
                        sx={{ mr: 2, width: 40, height: 40 }}
                        variant="rounded"
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {artifact.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {artifact.uploadDate}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={artifact.category} 
                      size="small"
                      sx={{ 
                        backgroundColor: '#1B433220',
                        color: '#1B4332',
                        fontWeight: 'medium'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                        label={artifact.status}
                        color={statusColors[artifact.status]}
                        sx={{ textTransform: 'capitalize' }}
                    >
                      {artifact.status}
                    </Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="medium">
                      {artifact.views.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {artifact.downloads}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={14} fill="#B8860B" color="#B8860B" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {artifact.rating}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MapPin size={14} style={{ marginRight: 4 }} />
                      <Typography variant="caption">
                        {artifact.location}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, artifact)}
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
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Download size={16} style={{ marginRight: 8 }} />
            Download
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* Artifact Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          {selectedArtifact && (
            <>
              <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                  {selectedArtifact.name}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size = {{ xs:12, md:4}}>
                    <Avatar 
                      src={selectedArtifact.image}
                      sx={{ width: '100%', height: 200 }}
                      variant="rounded"
                    />
                  </Grid>
                  <Grid size = {{ xs:12, md:8}}>
                    <Box sx={{ space: 2 }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Category
                        </Typography>
                        <Typography variant="body1">
                          {selectedArtifact.category}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Status
                        </Typography>
                        <Badge variant={statusColors[selectedArtifact.status]}>
                          {selectedArtifact.status}
                        </Badge>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Location
                        </Typography>
                        <Typography variant="body1">
                          {selectedArtifact.location}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Performance
                        </Typography>
                        <Typography variant="body1">
                          {selectedArtifact.views.toLocaleString()} views • {selectedArtifact.downloads} downloads
                        </Typography>
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
                  Edit Artifact
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