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
  Shield,
  Link,
  DollarSign,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, Button, Input, Badge } from '../../components/ui';

// Test data based on BlockchainRecord schema
const blockchainRecords = [
  {
    id: 1,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d1',
    transaction_hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    block_number: 18234567,
    blockchain_network: 'Ethereum',
    transaction_type: 'mint',
    from_address: '0x0000000000000000000000000000000000000000',
    to_address: '0x742d35Cc6460C0532C58d4C2224f18C0d02C2A34',
    artifact_hash: 'Qmb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',
    metadata_hash: 'Qma2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    smart_contract_address: '0x1234567890123456789012345678901234567890',
    gas_used: 145230,
    transaction_fee: 0.0023,
    is_verified: true,
    created_at: '2024-02-15T10:30:00Z',
    artifactName: 'Mughal Miniature Painting'
  },
  {
    id: 2,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d2',
    transaction_hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    block_number: 18234589,
    blockchain_network: 'Polygon',
    transaction_type: 'verify',
    from_address: '0x742d35Cc6460C0532C58d4C2224f18C0d02C2A34',
    to_address: '0x456789012345678901234567890123456789012',
    artifact_hash: 'Qmc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    metadata_hash: 'Qmb3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    smart_contract_address: '0x2345678901234567890123456789012345678901',
    gas_used: 89456,
    transaction_fee: 0.0012,
    is_verified: true,
    created_at: '2024-02-14T14:20:00Z',
    artifactName: 'Ancient Pottery Collection'
  },
  {
    id: 3,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d3',
    transaction_hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    block_number: 18234602,
    blockchain_network: 'Ethereum',
    transaction_type: 'transfer',
    from_address: '0x742d35Cc6460C0532C58d4C2224f18C0d02C2A34',
    to_address: '0x567890123456789012345678901234567890123',
    artifact_hash: 'Qmd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',
    metadata_hash: 'Qmc4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    smart_contract_address: '0x1234567890123456789012345678901234567890',
    gas_used: 67890,
    transaction_fee: 0.0018,
    is_verified: true,
    created_at: '2024-02-13T09:45:00Z',
    artifactName: 'Traditional Silk Textile'
  },
  {
    id: 4,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d4',
    transaction_hash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    block_number: 18234621,
    blockchain_network: 'BSC',
    transaction_type: 'sale',
    from_address: '0x567890123456789012345678901234567890123',
    to_address: '0x678901234567890123456789012345678901234',
    artifact_hash: 'Qme4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4',
    metadata_hash: 'Qmd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    smart_contract_address: '0x3456789012345678901234567890123456789012',
    gas_used: 234567,
    transaction_fee: 0.0045,
    is_verified: false,
    created_at: '2024-02-12T16:15:00Z',
    artifactName: 'Historical Gold Coins'
  },
  {
    id: 5,
    artifact_id: '60f1b2a3c4d5e6f7a8b9c0d5',
    transaction_hash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    block_number: 18234645,
    blockchain_network: 'Ethereum',
    transaction_type: 'mint',
    from_address: '0x0000000000000000000000000000000000000000',
    to_address: '0x789012345678901234567890123456789012345',
    artifact_hash: 'Qmf5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
    metadata_hash: 'Qme6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    smart_contract_address: '0x1234567890123456789012345678901234567890',
    gas_used: 156789,
    transaction_fee: 0.0028,
    is_verified: true,
    created_at: '2024-02-11T11:00:00Z',
    artifactName: 'Gandhara Sculpture'
  }
];

const transactionData = [
  { date: '02/11', transactions: 12, gasUsed: 1890000 },
  { date: '02/12', transactions: 18, gasUsed: 2340000 },
  { date: '02/13', transactions: 15, gasUsed: 1980000 },
  { date: '02/14', transactions: 22, gasUsed: 2890000 },
  { date: '02/15', transactions: 19, gasUsed: 2450000 },
  { date: '02/16', transactions: 25, gasUsed: 3120000 },
  { date: '02/17', transactions: 21, gasUsed: 2780000 }
];

const networkData = [
  { name: 'Ethereum', count: 45, color: '#627EEA' },
  { name: 'Polygon', count: 28, color: '#8247E5' },
  { name: 'BSC', count: 15, color: '#F3BA2F' },
  { name: 'Avalanche', count: 8, color: '#E84142' }
];

const transactionTypeColors = {
  'mint': 'success',
  'transfer': 'info',
  'sale': 'warning',
  'verify': 'primary'
};

const networkColors = {
  'Ethereum': '#627EEA',
  'Polygon': '#8247E5', 
  'BSC': '#F3BA2F',
  'Avalanche': '#E84142'
};

function AdminBlockchain() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const filteredRecords = blockchainRecords.filter(record => 
    (record.transaction_hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.artifactName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedNetwork === 'All' || record.blockchain_network === selectedNetwork) &&
    (selectedType === 'All' || record.transaction_type === selectedType)
  );

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatHash = (hash) => {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Blockchain Records
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and manage blockchain transactions for cultural artifacts
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Link size={20} />}
          sx={{ px: 3, py: 1.5 }}
        >
          New Transaction
        </Button>
      </Box>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Transaction Activity & Gas Usage
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#627EEA" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#627EEA" stopOpacity={0}/>
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
                  dataKey="transactions" 
                  stroke="#1B4332" 
                  fillOpacity={1} 
                  fill="url(#colorTransactions)" 
                  strokeWidth={2}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="gasUsed" 
                  stroke="#627EEA" 
                  fillOpacity={1} 
                  fill="url(#colorGas)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Network Statistics
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { label: 'Total Transactions', value: '1,247', icon: Link },
                { label: 'Verified Records', value: '1,089', icon: CheckCircle },
                { label: 'Pending Verification', value: '158', icon: Shield },
                { label: 'Average Gas Fee', value: '0.0025 ETH', icon: Zap }
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

      {/* Network Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Network Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1B4332" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Transaction Types
            </Typography>
            <Box sx={{ space: 2 }}>
              {[
                { type: 'mint', count: 35, percentage: '35%' },
                { type: 'verify', count: 28, percentage: '28%' },
                { type: 'transfer', count: 25, percentage: '25%' },
                { type: 'sale', count: 12, percentage: '12%' }
              ].map((item, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5
                }}>
                    <Chip
                        label={item.type}
                        color={transactionTypeColors[item.type]}
                        sx={{ textTransform: 'capitalize' }}
                    >
                    {item.type}
                  </Chip>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {item.count}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {item.percentage}
                    </Typography>
                  </Box>
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
              placeholder="Search by hash or artifact..."
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
              Network Filter
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Shield size={20} />}
              fullWidth
            >
              Transaction Type
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

      {/* Blockchain Records Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction</TableCell>
                <TableCell>Artifact</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Network</TableCell>
                <TableCell align="center">Block</TableCell>
                <TableCell align="center">Gas Used</TableCell>
                <TableCell align="center">Fee (ETH)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                        {formatHash(record.transaction_hash)}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(record.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {record.artifactName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ fontFamily: 'monospace' }}>
                        {record.artifact_id.slice(-8)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                        label={record.transaction_type}
                        color={transactionTypeColors[record.transaction_type]}
                        sx={{ textTransform: 'capitalize' }}
                    >
                      {record.transaction_type}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={record.blockchain_network} 
                      size="small"
                      sx={{ 
                        backgroundColor: `${networkColors[record.blockchain_network]}20`,
                        color: networkColors[record.blockchain_network],
                        fontWeight: 'medium'
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                      {record.block_number?.toLocaleString() || 'Pending'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {record.gas_used?.toLocaleString() || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="medium">
                      {record.transaction_fee || '0.0000'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {record.is_verified ? (
                        <CheckCircle size={18} color="#4CAF50" />
                      ) : (
                        <XCircle size={18} color="#FF9800" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, record)}
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
            <Shield size={16} style={{ marginRight: 8 }} />
            Verify Transaction
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Download size={16} style={{ marginRight: 8 }} />
            Export Record
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link size={16} style={{ marginRight: 8 }} />
            View on Explorer
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Trash2 size={16} style={{ marginRight: 8 }} />
            Delete Record
          </MenuItem>
        </Menu>

        {/* Transaction Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          {selectedRecord && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Transaction Details
                  </Typography>
                  <Chip
                    label={selectedRecord.transaction_type}
                    color={transactionTypeColors[selectedRecord.transaction_type]}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {selectedRecord.transaction_type}
                  </Chip>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Transaction Hash
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {selectedRecord.transaction_hash}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Artifact Information
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedRecord.artifactName}
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          ID: {selectedRecord.artifact_id}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Network & Block
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Chip 
                            label={selectedRecord.blockchain_network} 
                            size="small"
                            sx={{ 
                              backgroundColor: `${networkColors[selectedRecord.blockchain_network]}20`,
                              color: networkColors[selectedRecord.blockchain_network]
                            }}
                          />
                          <Typography variant="body2">
                            Block: {selectedRecord.block_number?.toLocaleString() || 'Pending'}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Addresses
                        </Typography>
                        <Box sx={{ space: 1 }}>
                          <Typography variant="body2">
                            <strong>From:</strong> {selectedRecord.from_address || 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>To:</strong> {selectedRecord.to_address || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ space: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Smart Contract
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {selectedRecord.smart_contract_address || 'N/A'}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Hashes
                        </Typography>
                        <Box sx={{ space: 2 }}>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Artifact Hash
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                              {selectedRecord.artifact_hash || 'N/A'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Metadata Hash
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                              {selectedRecord.metadata_hash || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Transaction Costs
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <Box>
                            <Typography variant="body2">
                              <strong>Gas Used:</strong> {selectedRecord.gas_used?.toLocaleString() || 'N/A'}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2">
                              <strong>Fee:</strong> {selectedRecord.transaction_fee || '0.0000'} ETH
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Verification Status
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {selectedRecord.is_verified ? (
                            <>
                              <CheckCircle size={18} color="#4CAF50" />
                              <Typography variant="body2" color="success.main">
                                Verified
                              </Typography>
                            </>
                          ) : (
                            <>
                              <XCircle size={18} color="#FF9800" />
                              <Typography variant="body2" color="warning.main">
                                Pending Verification
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Timestamp
                        </Typography>
                        <Typography variant="body2">
                          {new Date(selectedRecord.created_at).toLocaleString()}
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
                <Button variant="outlined" startIcon={<Link size={16} />}>
                  View on Explorer
                </Button>
                {!selectedRecord.is_verified && (
                  <Button variant="contained" startIcon={<Shield size={16} />}>
                    Verify Transaction
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

export default AdminBlockchain;