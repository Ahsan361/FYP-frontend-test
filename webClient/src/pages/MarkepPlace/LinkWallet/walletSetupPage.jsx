import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  FormHelperText,
} from '@mui/material';
import { CheckCircle, Wallet, Shield, Lock, AlertCircle } from 'lucide-react';

// Components
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

// Theme & Services
import { lightTheme, darkTheme } from '../../../styles/theme';
import { updateWalletAddress } from '../../../services/walletSetupService';
import { UserContext } from '../../../contexts/UserContext';

function WalletSetupPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  
  const { user, loading, updateUser } = useContext(UserContext);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [hasExistingWallet, setHasExistingWallet] = useState(false);

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user already has wallet linked
    if (user.isWalletLinked && user.walletAddress) {
      setHasExistingWallet(true);
      setWalletAddress(user.walletAddress);
    }
  }, [user, loading, navigate]);

  // Real-time validation as user types
  const validateWalletAddress = (address) => {
    setFieldError('');
    
    if (!address || !address.trim()) {
      return;
    }

    // Check if it starts with 0x
    if (!address.startsWith('0x')) {
      setFieldError('Wallet address must start with "0x"');
      return;
    }

    // Check length (0x + 40 hex characters = 42 total)
    if (address.length !== 42) {
      setFieldError('Wallet address must be 42 characters long (0x + 40 hex digits)');
      return;
    }

    // Check if contains only valid hex characters after 0x
    const hexPart = address.slice(2);
    const hexRegex = /^[a-fA-F0-9]{40}$/;
    
    if (!hexRegex.test(hexPart)) {
      setFieldError('Wallet address must contain only valid hexadecimal characters (0-9, a-f, A-F)');
      return;
    }

    // If all validations pass
    setFieldError('');
  };

  const handleWalletChange = (e) => {
    const value = e.target.value.trim();
    setWalletAddress(value);
    validateWalletAddress(value);
    setError(''); // Clear general error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    setSuccess('');
    setFieldError('');

    // Client-side validation
    if (!walletAddress || !walletAddress.trim()) {
      setFieldError('Wallet address is required');
      return;
    }

    // Validate format
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethereumAddressRegex.test(walletAddress)) {
      setFieldError('Invalid wallet address format. Please enter a valid Ethereum address.');
      return;
    }

    try {
      setLoading1(true);
      
      const response = await updateWalletAddress(walletAddress, user.token);
      
      // Update user context with wallet information
      if (updateUser) {
        updateUser({
          ...user,
          walletAddress: response.data.walletAddress,
          isWalletLinked: response.data.isWalletLinked
        });
      }
      
      setSuccess('Wallet address linked successfully!');
      setHasExistingWallet(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/marketplace');
      }, 2000);
      
    } catch (err) {
      console.error('Error linking wallet:', err);
      
      // Map backend errors to field-specific or general errors
      const errorMessage = err.response?.data?.message || 'Failed to link wallet address. Please try again.';
      
      // Map specific backend errors to field errors
      if (errorMessage.includes('Wallet address is required')) {
        setFieldError('Wallet address is required');
      } else if (errorMessage.includes('Invalid wallet address format')) {
        setFieldError('Invalid wallet address format. Please enter a valid Ethereum address (0x + 40 hex characters)');
      } else if (errorMessage.includes('already linked to another account')) {
        setFieldError('This wallet address is already linked to another account. Please use a different wallet.');
      } else if (errorMessage.includes('Not authorized') || errorMessage.includes('token')) {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else if (errorMessage.includes('User not found')) {
        setError('User account not found. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Generic server error
        setError(errorMessage);
      }
    } finally {
      setLoading1(false);
    }
  };

  const benefits = [
    {
      icon: <Wallet size={24} />,
      title: 'Blockchain Integration',
      description: 'Connect your MetaMask or other Ethereum wallet',
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Ownership',
      description: 'Verify ownership of NFTs on the blockchain',
    },
    {
      icon: <Lock size={24} />,
      title: 'Full Control',
      description: 'Maintain complete control of your digital assets',
    },
  ];

  if (hasExistingWallet && !loading1) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ pt: { xs: 10, sm: 12, md: 18 } }}>
          <Container maxWidth="md" sx={{ py: 6 }}>
            <Card>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <CheckCircle size={60} style={{ color: theme.palette.success.main, marginBottom: 16 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Wallet Connected
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Your wallet is already linked. You can now interact with blockchain features!
                </Typography>
                <Box 
                  sx={{ 
                    bgcolor: 'background.paper', 
                    p: 2, 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 3
                  }}
                >
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Connected Wallet
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                    {walletAddress}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/marketplace')}
                  >
                    Browse Marketplace
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/profile')}
                  >
                    View Profile
                  </Button>
                </Box>
              </Box>
            </Card>
          </Container>

        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Box sx={{ pt: { xs: 10, sm: 12, md: 18 }, pb: { xs: 10, sm: 12, md: 18 } }}>
        <Container maxWidth="md">
          <Card>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Link Your Wallet
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Connect your Ethereum wallet to interact with blockchain features
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Why link your wallet?
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ py: 2 }}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {benefit.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {benefit.title}
                        </Typography>
                      }
                      secondary={benefit.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Supported Wallets:</strong>
              </Typography>
              <Typography variant="body2">
                MetaMask, WalletConnect, Coinbase Wallet, and other Ethereum-compatible wallets
              </Typography>
            </Alert>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Wallet Address"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={handleWalletChange}
                  disabled={loading1}
                  error={!!fieldError}
                  helperText={
                    fieldError ? (
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AlertCircle size={14} />
                        {fieldError}
                      </Box>
                    ) : (
                      "Enter your Ethereum wallet address (e.g., 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb)"
                    )
                  }
                  FormHelperTextProps={{
                    sx: {
                      color: fieldError ? 'error.main' : 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      mt: 1
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'monospace',
                      fontSize: '0.95rem',
                      '&.Mui-error': {
                        '& fieldset': {
                          borderColor: 'error.main',
                          borderWidth: 2,
                        }
                      }
                    }
                  }}
                />
              </Box>

              <Alert severity="warning" sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <AlertCircle size={20} style={{ marginTop: 2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Important:
                    </Typography>
                    <Typography variant="body2">
                      • Make sure you enter the correct wallet address<br/>
                      • Address must start with "0x" followed by 40 hexadecimal characters<br/>
                      • This address will be used for all blockchain transactions<br/>
                      • Each wallet can only be linked to one account
                    </Typography>
                  </Box>
                </Box>
              </Alert>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/marketplace')}
                  disabled={loading1}
                >
                  Maybe Later
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={loading1}
                  disabled={!!fieldError || !walletAddress.trim()}
                  startIcon={<Wallet size={20} />}
                >
                  Link Wallet
                </Button>
              </Box>
            </Box>

            {/* Example wallet addresses for reference */}
            <Alert severity="info" icon={false}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                <strong>Example valid format:</strong>
              </Typography>
              <Typography 
                variant="caption" 
                fontFamily="monospace" 
                sx={{ 
                  wordBreak: 'break-all',
                  display: 'block',
                  opacity: 0.7
                }}
              >
                0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
              </Typography>
            </Alert>
          </Card>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default WalletSetupPage;