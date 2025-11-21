import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Typography, Container, Alert } from '@mui/material';
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Theme
import { lightTheme, darkTheme } from '../../styles/theme';

function PaymentCancelPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card sx={{ textAlign: 'center', p: { xs: 3, md: 6 } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <XCircle size={80} color="#f44336" strokeWidth={1.5} />
          </Box>

          <Typography variant="h3" fontWeight="bold" gutterBottom color="error.main">
            Payment Cancelled
          </Typography>

          <Typography variant="h6" color="text.secondary" paragraph sx={{ mt: 2 }}>
            Your payment was not completed
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            No charges were made to your account. You can try again or continue browsing our marketplace.
          </Typography>

          <Alert severity="info" sx={{ mt: 3, mb: 3, textAlign: 'left' }}>
            <Typography variant="body2">
              <strong>What happened?</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              The payment process was cancelled before completion. This could be because:
            </Typography>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
              <li>You clicked the back button</li>
              <li>You closed the payment window</li>
              <li>The payment session expired</li>
            </ul>
          </Alert>

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
              startIcon={<ShoppingCart size={18} />}
              onClick={() => navigate('/cart')}
              size="large"
            >
              Return to Cart
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={18} />}
              onClick={() => navigate('/marketplace')}
              size="large"
            >
              Back to Marketplace
            </Button>
          </Box>
        </Card>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}

export default PaymentCancelPage;