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
} from '@mui/material';
import { CheckCircle, Store, CreditCard, Shield, AlertCircle } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Theme & Services
import { lightTheme, darkTheme } from '../../styles/theme';
import { createConnectAccount } from '../../services/stripeService';
import { UserContext } from '../../contexts/UserContext';

function SellerOnboardingPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  
  const { user, loading, updateStripeStatus } = useContext(UserContext);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState('');
  const [hasExistingAccount, setHasExistingAccount] = useState(false);

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user already has Stripe account
    if (user.isStripeVerified) {
      setHasExistingAccount(true);
    }
  }, [user, loading, navigate]);

  const handleConnectStripe = async () => {
    try {
      setLoading1(true);
      setError('');
      
      const { url, accountId } = await createConnectAccount(user.token);
      
      // Update user context with Stripe account ID
      if (accountId) {
        updateStripeStatus(accountId);
      }
      
      // Redirect to Stripe onboarding
      window.location.href = url;
    } catch (err) {
      console.error('Error connecting Stripe:', err);
      setError(err.response?.data?.error || 'Failed to connect Stripe account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: <CreditCard size={24} />,
      title: 'Secure Payments',
      description: 'Receive payments securely through Stripe',
    },
    {
      icon: <Store size={24} />,
      title: 'Sell NFTs',
      description: 'List and sell your cultural heritage NFTs',
    },
    {
      icon: <Shield size={24} />,
      title: 'Protected Transactions',
      description: 'All transactions are protected and verified',
    },
  ];

  if (hasExistingAccount) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ pt: { xs: 10, sm: 12, md: 14 } }}>
          <Container maxWidth="md" sx={{ py: 6 }}>
            <Card>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <CheckCircle size={60} style={{ color: theme.palette.success.main, marginBottom: 16 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Stripe Account Connected
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Your Stripe account is already connected. You can now create listings and start selling!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/marketplace')}
                  >
                    Browse Marketplace
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/marketplace/create')}
                  >
                    Create Listing
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
                Become a Seller
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Connect your Stripe account to start selling NFTs on our marketplace
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Why sell with us?
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
                <strong>What happens next?</strong>
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle size={16} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="You'll be redirected to Stripe to complete your account setup"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle size={16} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Provide your business information and bank details"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircle size={16} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Once verified, you can start creating listings"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </Alert>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                
                <Typography variant="body2">
                  <strong>Important:</strong> Make sure to complete the Stripe onboarding process. 
                  If you close the window before finishing, you'll need to start over.
                </Typography>
              </Box>
            </Alert>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/marketplace')}
                disabled={loading}
              >
                Maybe Later
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleConnectStripe}
                loading={loading}
                startIcon={<Store size={20} />}
              >
                Connect Stripe Account
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default SellerOnboardingPage;