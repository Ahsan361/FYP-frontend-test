import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Theme & Context
import { lightTheme, darkTheme } from '../../styles/theme';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { createCheckoutSession } from '../../services/stripeService';

function CartPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) return;

    try {
      setCheckingOut(true);
      
      // For now, checkout the first item (you can modify this to handle multiple items)
      const firstItem = cartItems[0];
      const { url } = await createCheckoutSession(
        firstItem.listing._id,
        firstItem.quantity,
        user.token
      );
      
      window.location.href = url;
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to proceed to checkout. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  const handleQuantityChange = (listingId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(listingId, quantity);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
        </Typography>

        <Divider sx={{ my: 3 }} />

        {cartItems.length === 0 ? (
          <Card sx={{ textAlign: 'center', p: 6 }}>
            <ShoppingBag size={60} style={{ opacity: 0.3, marginBottom: 16 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Add some items from the marketplace to get started
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/marketplace')}
              sx={{ mt: 2 }}
            >
              Browse Marketplace
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              {cartItems.map((item) => (
                <Card key={item.listing._id} sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Box
                        component="img"
                        src={item.listing.image}
                        alt={item.listing.title}
                        sx={{
                          width: '100%',
                          height: 150,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 9 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {item.listing.title}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeFromCart(item.listing._id)}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {item.listing.description.substring(0, 100)}...
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.listing._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </IconButton>
                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.listing._id, e.target.value)}
                            sx={{ width: 70 }}
                            size="small"
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.listing._id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </IconButton>
                        </Box>

                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {(item.listing.price * item.quantity).toLocaleString()} PKR
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>

            {/* Cart Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ position: 'sticky', top: 20 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Order Summary
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box
                      key={item.listing._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {item.listing.title} x {item.quantity}
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {(item.listing.price * item.quantity).toLocaleString()} PKR
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {getCartTotal().toLocaleString()} PKR
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  loading={checkingOut}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/marketplace')}
                  sx={{ mt: 2 }}
                >
                  Continue Shopping
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      <Footer />
    </ThemeProvider>
  );
}

export default CartPage