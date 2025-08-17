import React from 'react';
import { Typography, Grid, Box, Container, Grow, Slide, useMediaQuery } from '@mui/material';
import { Event,ArrowForward } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';

// Custom components
import { Card, Button, Badge } from '../../components/ui';

function ExhibitionsEventsSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  const exhibitions = [
    {
      id: 1,
      title: "Hiroshige: Artist of the Open Road",
      type: "Exhibition",
      dates: "1 May – 7 September 2025",
      status: "Final weeks",
      statusColor: "warning",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Discover the masterworks of Japan's landscape artist through this comprehensive exhibition.",
    },
    {
      id: 2,
      title: "Ancient Civilizations of the Indus Valley",
      type: "Exhibition",
      dates: "15 March – 30 August 2025",
      status: "Now Open",
      statusColor: "success",
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      description: "Explore the mysteries of one of the world's earliest urban civilizations.",
    },
    {
      id: 3,
      title: "Islamic Art Through the Ages",
      type: "Exhibition",
      dates: "10 June – 15 October 2025",
      status: "Opening Soon",
      statusColor: "info",
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      description: "A journey through centuries of Islamic artistic achievement and cultural heritage.",
    },
    {
      id: 4,
      title: "Ancient Civilizations of the Indus Valley",
      type: "Exhibition",
      dates: "15 March – 30 August 2025",
      status: "Now Open",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Explore the mysteries of one of the world's earliest urban civilizations.",
    },
    {
      id: 5,
      title: "Ancient Civilizations of the Indus Valley",
      type: "Exhibition",
      dates: "15 March – 30 August 2025",
      status: "Now Open",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Explore the mysteries of one of the world's earliest urban civilizations.",
    },
  ];

  return (
    <Container maxWidth={false}  sx={{ px:{xs: 2, md: 8}, py: { xs: 4, md: 8 } }}>
      <Slide direction="up" in={true} timeout={800}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Exhibitions & Events
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our current exhibitions and upcoming cultural events that bring 
            history and heritage to life
          </Typography>
        </Box>
      </Slide>

      <Grid container spacing={3}>
        {exhibitions.map((exhibition, index) => (
          <Grid key={exhibition.id} size={{xs: 12, sm: 6, md: 3 }}>
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
                  }
                }}
              >
                {/* Status Badge in top right */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 2
                  }}
                >
                  <Badge
                    label={exhibition.status}
                    color={exhibition.statusColor}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.background,
                      backdropFilter: 'blur(4px)',
                      fontWeight: 600
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Event sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                      {exhibition.type.toUpperCase()}
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                    {exhibition.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                    {exhibition.dates}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                    {exhibition.description}
                  </Typography>

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
          View All Exhibitions & Events
        </Button>
      </Box>
    </Container>
  );
}

export default ExhibitionsEventsSection;