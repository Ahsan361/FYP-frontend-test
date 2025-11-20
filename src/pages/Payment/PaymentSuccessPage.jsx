import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Typography, Container, Divider } from '@mui/material';
import { CheckCircle, Package, Home, ExternalLink } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Loading } from '../../components/ui';

// Theme
import { lightTheme, darkTheme } from '../../styles/theme';
import { CartContext } from '../../contexts/CartContext';

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { clearCart } = useContext(CartContext);
  
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart after successful payment
    if (sessionId) {
      clearCart();
      setLoading(false);
    } else {
      // If no session ID, redirect to marketplace
      setTimeout(() => navigate('/marketplace'), 2000);
    }
  }, [sessionId, clearCart, navigate]);

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
          <Loading message="Processing your payment..." />
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
          <Card sx={{ textAlign: 'center', p: { xs: 3, md: 6 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <CheckCircle size={80} color="#4caf50" strokeWidth={1.5} />
            </Box>

            <Typography variant="h3" fontWeight="bold" gutterBottom color="success.main">
              Payment Successful!
            </Typography>

            <Typography variant="h6" color="text.secondary" paragraph sx={{ mt: 2 }}>
              Your NFT purchase has been completed
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                p: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.success.main}`,
                textAlign: 'left',
                mb: 3,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                What happens next?
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                  <li>Your order is being processed on the blockchain</li>
                  <li>NFT ownership will be transferred to your wallet address</li>
                  <li>You'll receive a confirmation email shortly</li>
                  <li>Track your order status in "My Orders"</li>
                </ul>
              </Typography>
            </Box>

            {sessionId && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  mb: 3,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Transaction ID: {sessionId}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                startIcon={<Package size={18} />}
                onClick={() => navigate('/marketplace/my-orders')}
                size="large"
              >
                View My Orders
              </Button>
              <Button
                variant="outlined"
                startIcon={<Home size={18} />}
                onClick={() => navigate('/marketplace')}
                size="large"
              >
                Back to Marketplace
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}

export default PaymentSuccessPage;