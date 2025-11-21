import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Typography, Container, Alert } from '@mui/material';
import { RefreshCw } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Theme & Services
import { lightTheme, darkTheme } from '../../styles/theme';
import { createConnectAccount } from '../../services/stripeService';
import { UserContext } from '../../contexts/UserContext';

function OnboardingRefreshPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRetry = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const { url } = await createConnectAccount(user.token);
      window.location.href = url;
    } catch (err) {
      console.error('Error reconnecting Stripe:', err);
      setError('Failed to restart onboarding. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

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
            <RefreshCw size={60} style={{ opacity: 0.5 }} />
          </Box>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Onboarding Interrupted
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 2 }}>
            It looks like your Stripe onboarding wasn't completed. 
            Don't worry - you can restart the process anytime.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
              {error}
            </Alert>
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
              startIcon={<RefreshCw size={18} />}
              onClick={handleRetry}
              loading={loading}
              size="large"
            >
              Restart Onboarding
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/marketplace')}
              size="large"
            >
              Go to Marketplace
            </Button>
          </Box>
        </Card>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}

export default OnboardingRefreshPage;