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
  Image,
  Video,
  FileText,
  Star,
  Search,
  Filter,
  Upload,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Input } from '../../components/ui';

// Sample media ownership data based on artifactMediaSchema
const mediaRecords = [
  {
    id: 1,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d1',
    media_type: 'image',
    file_url: 'https://example.com/artifact1_image.jpg',
    file_name: 'mughal_painting.jpg',
    file_size: 2457600,
    mime_type: 'image/jpeg',
    is_primary: true,
    caption: 'High-resolution image of Mughal painting',
    alt_text: 'Mughal miniature painting',
    resolution_width: 1920,
    resolution_height: 1080,
    uploaded_by: '60f1b2a3c4d5e6f7a8b9c0e1',
    created_at: '2025-08-20T09:00:00Z',
  },
  {
    id: 2,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d2',
    media_type: 'video',
    file_url: 'https://example.com/artifact2_video.mp4',
    file_name: 'pottery_restoration.mp4',
    file_size: 52428800,
    mime_type: 'video/mp4',
    is_primary: false,
    caption: 'Restoration process of ancient pottery',
    alt_text: 'Pottery restoration video',
    resolution_width: 1280,
    resolution_height: 720,
    uploaded_by: '60f1b2a3c4d5e6f7a8b9c0e2',
    created_at: '2025-08-15T14:00:00Z',
  },
  {
    id: 3,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d3',
    media_type: 'document',
    file_url: 'https://example.com/artifact3_doc.pdf',
    file_name: 'necklace_authenticity.pdf',
    file_size: 1048576,
    mime_type: 'application/pdf',
    is_primary: true,
    caption: 'Authenticity certificate for gold necklace',
    alt_text: 'Certificate of authenticity',
    resolution_width: null,
    resolution_height: null,
    uploaded_by: '60f1b2a3c4d5e6f7a8b9c0e3',
    created_at: '2025-08-10T11:00:00Z',
  },
];

// Sample chart data for media types
const mediaTypeData = [
  { name: 'Image', count: 30, color: '#627EEA' },
  { name: 'Video', count: 15, color: '#8247E5' },
  { name: 'Document', count: 10, color: '#F3BA2F' },
];

// Colors for media types
const mediaTypeColors = {
  image: 'primary',
  video: 'success',
  document: 'warning',
};

function AdminMediaOwnership() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('All');
  const [selectedPrimaryStatus, setSelectedPrimaryStatus] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, media) => {
    setAnchorEl(event.currentTarget);
    setSelectedMedia(media);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMedia(null);
  };

  const filteredMedia = mediaRecords.filter(
    (media) =>
      (media.file_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        media.caption?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedMediaType === 'All' || media.media_type === selectedMediaType) &&
      (selectedPrimaryStatus === 'All' ||
        (selectedPrimaryStatus === 'Primary' && media.is_primary) ||
        (selectedPrimaryStatus === 'Non-Primary' && !media.is_primary))
  );

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Media Ownership Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage artifact media records
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Upload size={20} />} sx={{ px: 3, py: 1.5 }}>
          Upload Media
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Media Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={mediaTypeData}>
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
              Media Statistics
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: 'Total Media', value: '55', icon: FileText },
                { label: 'Primary Media', value: '20', icon: Star },
                { label: 'Images', value: '30', icon: Image },
                { label: 'Total Size', value: '1.2 GB', icon: Upload },
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
              placeholder="Search by file name or caption..."
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
              Media Type
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              fullWidth
            >
              Primary Status
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Upload size={20} />}
              fullWidth
            >
              Upload Date
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Media Ownership Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell>Media Type</TableCell>
                <TableCell>File Size</TableCell>
                <TableCell>Resolution</TableCell>
                <TableCell align="center">Primary</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMedia.map((media) => (
                <TableRow key={media.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {media.file_name || 'Unnamed File'}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {media.caption?.substring(0, 50) || 'No caption'}...
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={media.media_type}
                      color={mediaTypeColors[media.media_type]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatFileSize(media.file_size)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {media.resolution_width && media.resolution_height
                        ? `${media.resolution_width}x${media.resolution_height}`
                        : 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {media.is_primary ? (
                      <Star size={18} color="#4CAF50" />
                    ) : (
                      <Star size={18} color="#B0BEC5" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, media)}>
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
            Edit Media
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete Media
          </MenuItem>
        </Menu>

        {/* Media Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          {selectedMedia && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Media Details
                  </Typography>
                  <Chip
                    label={selectedMedia.media_type}
                    color={mediaTypeColors[selectedMedia.media_type]}
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
                          File Name
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedMedia.file_name || 'Unnamed File'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          File URL
                        </Typography>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                          {selectedMedia.file_url}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Caption
                        </Typography>
                        <Typography variant="body2">{selectedMedia.caption || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Alt Text
                        </Typography>
                        <Typography variant="body2">{selectedMedia.alt_text || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Artifact ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedMedia.artifact_id}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Media Type
                        </Typography>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {selectedMedia.media_type}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          File Size
                        </Typography>
                        <Typography variant="body2">{formatFileSize(selectedMedia.file_size)}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          MIME Type
                        </Typography>
                        <Typography variant="body2">{selectedMedia.mime_type || 'N/A'}</Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Resolution
                        </Typography>
                        <Typography variant="body2">
                          {selectedMedia.resolution_width && selectedMedia.resolution_height
                            ? `${selectedMedia.resolution_width}x${selectedMedia.resolution_height}`
                            : 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Primary Status
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {selectedMedia.is_primary ? (
                            <>
                              <Star size={18} color="#4CAF50" />
                              <Typography variant="body2" color="success.main">
                                Primary
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Star size={18} color="#B0BEC5" />
                              <Typography variant="body2" color="textSecondary">
                                Non-Primary
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Uploaded By
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedMedia.uploaded_by || 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Created At
                        </Typography>
                        <Typography variant="body2">{formatDate(selectedMedia.created_at)}</Typography>
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
                  Edit Media
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Card>
    </Box>
  );
}

export default AdminMediaOwnership;