import React, { useState, useContext, useEffect } from 'react';
import { Typography, Grid, Box, Container, Grow, Slide } from '@mui/material';
import { Event, ArrowForward } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';

// Custom components
import { Card, Button, Badge } from '../../components/ui';

// API services
import { getExhibitions } from '../../services/ExhibitionService';

// User context
import { UserContext } from '../../contexts/UserContext';

function ExhibitionsEventsSection() {
  const [exhibitions, setExhibitions] = useState([]);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user } = useContext(UserContext);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const exhibitionsData = await getExhibitions(user.token);
      // Transform backend data to match frontend structure
      const transformedData = exhibitionsData.map((item, index) => {
        const startDate = item.start_date ? new Date(item.start_date) : null;
        const endDate = item.end_date ? new Date(item.end_date) : null;
        const dates = startDate && endDate 
          ? `${startDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} – ${endDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}`
          : '';

        return {
          id: item._id || index + 1, // Use _id or fallback to index
          title: item.title || 'Untitled Exhibition', // Fallback for missing title
          type: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Exhibition', // Capitalize category or default
          dates: dates || 'Dates TBD', // Fallback for missing dates
          status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown', // Capitalize status or default
          statusColor: item.status === 'upcoming' ? 'info' : item.is_featured ? 'success' : 'default', // Map status/is_featured to color
          image: item.banner_image_url || 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop', // Use banner_image_url or placeholder
          description: item.description || (item.category ? `Explore the ${item.category} exhibition${item.curator_id?.username ? ` curated by ${item.curator_id.username}` : ''}.` : 'No description available.'), // Use description or generate fallback
        };
      });
      setExhibitions(transformedData);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 } }}>
      <Slide direction="up" in={true} timeout={800}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Exhibitions 
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our current and upcoming exhibitions that bring history and heritage to life
          </Typography>
        </Box>
      </Slide>

      <Grid container spacing={3}>
        {exhibitions.map((exhibition, index) => (
          <Grid key={exhibition.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Grow in={true} timeout={1200 + index * 100}>
              <Card
                image={exhibition.image}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {/* Status Badge in top right, shown only if status exists */}
                {exhibition.status && exhibition.status !== 'Unknown' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                    }}
                  >
                    <Badge
                      label={exhibition.status}
                      color={exhibition.statusColor}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.background,
                        backdropFilter: 'blur(4px)',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                )}

                {/* Content */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  {/* Type, shown only if type exists */}
                  {exhibition.type && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Event sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                      <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                        {exhibition.type.toUpperCase()}
                      </Typography>
                    </Box>
                  )}

                  {/* Title, always shown due to fallback */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                    {exhibition.title}
                  </Typography>

                  {/* Dates, shown only if not TBD */}
                  {exhibition.dates && exhibition.dates !== 'Dates TBD' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                      {exhibition.dates}
                    </Typography>
                  )}

                  {/* Description, shown only if not fallback */}
                  {exhibition.description && exhibition.description !== 'No description available.' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      {exhibition.description}
                    </Typography>
                  )}

                  {/* Link at bottom */}
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    endIcon={<ArrowForward />}
                    sx={{ mt: 1 }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* View All Button */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{ px: 4, py: 1.5 }}
        >
          View All Exhibitions 
        </Button>
      </Box>
    </Container>
  );
}

export default ExhibitionsEventsSection;