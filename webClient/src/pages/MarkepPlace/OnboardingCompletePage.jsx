import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Typography, Container } from '@mui/material';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Theme & Context
import { lightTheme, darkTheme } from '../../styles/theme';
import { UserContext } from '../../contexts/UserContext';
import { getUserProfile } from '../../services/userService';

function OnboardingCompletePage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    // Refresh user data to get the updated Stripe account ID
    const refreshUserData = async () => {
      if (user && user.token) {
        try {
          const updatedUser = await getUserProfile(user.token);
          updateUser(updatedUser);
        } catch (error) {
          console.error('Error refreshing user data:', error);
        }
      }
    };

    refreshUserData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ pt: { xs: 22, sm: 28, md: 22 }, pb: { xs: 5, sm: 12, md: 18 } }}>
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
              🎉 Onboarding Complete!
            </Typography>

            <Typography variant="h6" color="text.secondary" paragraph sx={{ mt: 2 }}>
              Your Stripe account has been successfully connected
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              You can now create listings and start selling your NFTs on our marketplace.
              Payments will be securely processed through your Stripe account.
            </Typography>

            <Box
              sx={{
                mt: 4,
                mb: 4,
                p: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.success.main}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                What's Next?
              </Typography>
              <Box sx={{ textAlign: 'left', display: 'inline-block' }}>
                <Typography variant="body2" color="text.secondary" component="div">
                  <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                    <li>Create your first NFT listing</li>
                    <li>Set your price and add descriptions</li>
                    <li>Start receiving payments directly to your bank</li>
                    <li>Track all your sales in the orders dashboard</li>
                  </ul>
                </Typography>
              </Box>
            </Box>

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
                endIcon={<ArrowRight size={18} />}
                onClick={() => navigate('/marketplace/create')}
                size="large"
              >
                Create Your First Listing
              </Button>
              <Button
                variant="outlined"
                startIcon={<Package size={18} />}
                onClick={() => navigate('/marketplace')}
                size="large"
              >
                Browse Marketplace
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default OnboardingCompletePage;