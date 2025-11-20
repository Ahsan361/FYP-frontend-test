import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  TextField,
  Alert,
} from '@mui/material';
import { ShoppingCart, ArrowLeft, Package, CreditCard, Plus } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Loading } from '../../components/ui';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Theme & Services & Contexts
import { lightTheme, darkTheme } from '../../styles/theme';
import { getListingById } from '../../services/listingService';
import { createCheckoutSession } from '../../services/stripeService';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';

function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user } = useContext(UserContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setPurchasing(true);

      // Make the request and get the full response
      const response = await createCheckoutSession(listing._id, quantity, user.token);

      // Log the backend message
      console.log('Backend response:', response);

      // Handle special actions from backend
      if (response.action === "WALLET_LINK_REQUIRED") {
        alert(response.message || "Please connect your blockchain wallet first!");
        return navigate("/profile/wallet-setup"); 
      }

      if (response.action === "STRIPE_ONBOARDING_REQUIRED") {
        alert(response.message || "Please complete Stripe onboarding first!");
        return navigate("/marketplace/seller/onboarding"); 
      }

      // If everything is fine, redirect to Stripe checkout
      if (response.url) {
        window.location.href = response.url;
      }

    } catch (error) {
      console.error('Error creating checkout session:', error);

      // If backend returned a 403 with JSON, Axios will have it in error.response
      if (error.response?.data) {
        console.log('Backend error data:', error.response.data);
        if (error.response.data.action === "STRIPE_ONBOARDING_REQUIRED") {
          alert(error.response.data.action || "Please complete Stripe onboarding first!");
          return navigate("/marketplace/seller/onboarding"); 
        }

        if (error.response.data.action === "WALLET_LINK_REQUIRED") {
          alert(error.response.data.action || "Please connect your blockchain wallet first!");
          return navigate("/wallet-setup"); 
        }
      } else {
         alert('Failed to create checkout session. Please try again.');
      }
    } finally {
      setPurchasing(false);
    }
  };


  const handleAddToCart = () => {
    addToCart(listing, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <Loading message="Loading listing details..." />
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  if (!listing) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ px: { xs: 2, md: 8 }, py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Listing not found
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={18} />}
            onClick={() => navigate('/marketplace')}
            sx={{ mt: 2 }}
          >
            Back to Marketplace
          </Button>
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Box sx={{  px: { xs: 4, sm: 6, md: 8 }, py: { xs: 4, sm: 6, md: 8 } }}>
        <Button
          variant="text"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/marketplace')}
          sx={{ mb: 3 }}
        >
          Back to Marketplace
        </Button>

        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={listing.image}
              alt={listing.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Details Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h3" fontWeight="bold">
                  {listing.title}
                </Typography>
                <Chip
                  label={listing.status}
                  color={listing.status === 'active' ? 'success' : 'default'}
                />
              </Box>

              <Typography variant="body1" color="text.secondary" paragraph>
                {listing.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                  {listing.price} PKR
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Per unit
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Blockchain Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Package size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  Blockchain Details
                </Typography>
                <Box sx={{ pl: 3, mt: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Token ID:</strong> {listing.tokenId}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: 'break-all',
                    }}
                  >
                    <strong>Contract:</strong> {listing.contractAddress}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Seller Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Seller Information
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {listing.seller?.username || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.seller?.email || 'N/A'}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Quantity Selector */}
              {listing.status === 'active' && (
                <>
                  {addedToCart && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Item added to cart successfully!
                    </Alert>
                  )}

                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="h6" gutterBottom>
                    Total: {(listing.price * quantity).toLocaleString()} PKR
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      startIcon={<Plus size={20} />}
                      onClick={handleAddToCart}
                      disabled={listing.status !== 'active'}
                    >
                      Add to Cart
                    </Button>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<CreditCard size={20} />}
                      onClick={handlePurchase}
                      loading={purchasing}
                      disabled={listing.status !== 'active'}
                    >
                      Buy Now
                    </Button>
                  </Box>
                </>
              )}

              {listing.status !== 'active' && (
                <Chip
                  label={`This item is ${listing.status}`}
                  color="error"
                  sx={{ width: '100%', py: 2 }}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}

export default ListingDetailPage;