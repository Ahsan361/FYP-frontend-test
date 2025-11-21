import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  TextField,
  Grid,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Plus, AlertCircle } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Theme & Services
import { lightTheme, darkTheme } from '../../styles/theme';
import { createListing } from '../../services/listingService';
import { UserContext } from '../../contexts/UserContext';

function CreateListingPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingStripe, setCheckingStripe] = useState(true);
  const [hasStripeAccount, setHasStripeAccount] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user has Stripe account
    const checkStripeAccount = async () => {
      try {
        setCheckingStripe(true);
        // Check if user has stripeAccountId
        if (!user.stripeAccountId) {
          setHasStripeAccount(false);
        } else {
          setHasStripeAccount(true);
        }
      } catch (err) {
        console.error('Error checking Stripe account:', err);
        setHasStripeAccount(false);
      } finally {
        setCheckingStripe(false);
      }
    };

    checkStripeAccount();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login');
      return;
    }

    if (!user.walletAddress) {
      setError('Please connect your wallet before creating a listing');
      return;
    }

    if (!hasStripeAccount) {
      setError('Please connect your Stripe account before creating a listing');
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);
      await createListing(formData, user.token);
      navigate('/marketplace');
    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingStripe) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Checking account status...</Typography>
          </Box>
        </Container>
        <Footer />
      </ThemeProvider>
    );
  }

  if (!hasStripeAccount) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ pt: { xs: 10, sm: 12, md: 14 } }}>
          <Container maxWidth="md">
            <Card>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <AlertCircle size={60} style={{ color: theme.palette.warning.main, marginBottom: 16 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Stripe Account Required
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Before you can create listings and sell NFTs, you need to connect your Stripe account to receive payments.
                </Typography>
                <Alert severity="info" sx={{ mt: 3, mb: 3, textAlign: 'left' }}>
                  <AlertTitle>Why do I need a Stripe account?</AlertTitle>
                  <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                    <li>Securely receive payments from buyers</li>
                    <li>Professional payment processing</li>
                    <li>Automatic transfers to your bank account</li>
                    <li>Full transaction history and reporting</li>
                  </ul>
                </Alert>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/marketplace')}
                  >
                    Go Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/seller/onboarding')}
                  >
                    Connect Stripe Account
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
      <Box sx={{ pt: { xs: 10, sm: 12, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Create NFT Listing
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Mint and list your cultural heritage artifact as an NFT
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Card>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Price (PKR)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    error={!!errors.image}
                    helperText={errors.image || 'IPFS or web URL for the artifact image'}
                    required
                  />
                </Grid>

                {formData.image && (
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        p: 2,
                        border: `1px dashed ${theme.palette.divider}`,
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Image Preview
                      </Typography>
                      <Box
                        component="img"
                        src={formData.image}
                        alt="Preview"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 300,
                          borderRadius: 1,
                          mt: 1,
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>Note:</strong> Creating a listing will:
                    </Typography>
                    <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                      <li>Mint an NFT on the blockchain (requires wallet connection)</li>
                      <li>List it on the marketplace smart contract</li>
                      <li>Gas fees may apply for blockchain transactions</li>
                    </ul>
                  </Alert>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/marketplace')}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Plus size={18} />}
                      loading={loading}
                    >
                      Create Listing
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default CreateListingPage;