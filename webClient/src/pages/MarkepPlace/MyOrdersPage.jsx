import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import { Package, Calendar, CreditCard, ExternalLink } from 'lucide-react';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Loading } from '../../components/ui';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Theme & Services
import { lightTheme, darkTheme } from '../../styles/theme';
import { getMyOrders } from '../../services/orderService';
import { UserContext } from '../../contexts/UserContext';

const statusColors = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'error',
  failed: 'error',
};

function MyOrdersPage() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.token);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

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
          <Loading message="Loading your orders..." />
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ pt: { xs: 10, sm: 12, md: 14 }, pb: { xs: 10, sm: 12, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            My Orders
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Track and manage your NFT purchases
          </Typography>

          <Divider sx={{ my: 3 }} />

          {orders.length === 0 ? (
            <Card sx={{ textAlign: 'center', p: 6 }}>
              <Package size={60} style={{ opacity: 0.3, marginBottom: 16 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No orders yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Start exploring our marketplace to make your first purchase
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
              {orders.map((order) => (
                <Grid size={{ xs: 12 }} key={order._id}>
                  <Card>
                    <Grid container spacing={3}>
                      {/* Order Image */}
                      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Box
                          component="img"
                          src={order.listing?.image || '/placeholder.jpg'}
                          alt={order.listing?.title || 'Order'}
                          sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      </Grid>

                      {/* Order Details */}
                      <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {order.listing?.title || 'Unknown Item'}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={statusColors[order.status] || 'default'}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            Order Date: {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <CreditCard size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            Payment: {order.stripePaymentStatus || 'Processing'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <Package size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            Quantity: {order.quantity}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" color="primary">
                              {order.totalPrice} PKR
                            </Typography>
                            {order.tokenId && (
                              <Typography variant="caption" color="text.secondary">
                                Token ID: {order.tokenId}
                              </Typography>
                            )}
                          </Box>

                          {order.txHash && (
                            <Button
                              variant="outlined"
                              size="small"
                              endIcon={<ExternalLink size={16} />}
                              onClick={() => window.open(`https://sepolia.etherscan.io/tx/${order.txHash}`, '_blank')}
                            >
                              View on Blockchain
                            </Button>
                          )}
                        </Box>

                        {order.status === 'completed' && order.completedAt && (
                          <Box
                            sx={{
                              mt: 2,
                              p: 2,
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)',
                              borderRadius: 1,
                              borderLeft: `4px solid ${theme.palette.success.main}`,
                            }}
                          >
                            <Typography variant="body2" color="success.main" fontWeight="medium">
                              ✓ Completed on {new Date(order.completedAt).toLocaleString()}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}

export default MyOrdersPage;