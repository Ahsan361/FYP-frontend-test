import React from 'react';
import { 
  Typography, 
  Grid, 
  Box, 
  Container, 
  Grow, 
  Slide, 
  useMediaQuery,
  Paper
} from '@mui/material';
import { 
  EventSeat,
  Map,
  Museum,
  FamilyRestroom,
  ArrowForward
} from '@mui/icons-material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';

// Custom components
import { Card, Button } from '../../components/ui';

function VisitMuseumSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const visitInfo = [
    {
      id: 1,
      title: "Plan your visit",
      subtitle: "Book tickets and plan your day including exhibitions, facilities, access, food and travel.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "Book Tickets"
    },
    {
      id: 2,
      title: "Museum map",
      subtitle: "Navigate the Museum with ease, using our floor-by-floor plan and discover what not to miss.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "View Map"
    },
    {
      id: 3,
      title: "Galleries",
      subtitle: "Walk through two million years of history and culture across more than 50 galleries.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore Galleries"
    },
    {
      id: 4,
      title: "Family visits",
      subtitle: "From family facilities to activities and events, discover how to make the most of your day at the Museum.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
    }
  ];

  return (    
    <Container maxWidth={false}  sx={{ px:{xs: 2, md: 8}, py: { xs: 4, md: 8 } }}>
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Visit the Museum
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Plan your perfect museum experience with our comprehensive visitor guide 
              and essential information
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={4}>
          {visitInfo.map((info, index) => (
            <Grid key={info.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Grow in={true} timeout={1000 + index * 200}>
                <Card
                  image={info.image}
                  imageHeight={200}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    }
                  }}
                  actions={
                    <Button 
                      variant="outlined" 
                      size="small" 
                      fullWidth 
                      endIcon={<ArrowForward />}
                    >
                      {info.actionText}
                    </Button>
                  }
                >
                  {/* Content */}
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Icon and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mr: 2
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                        {info.title}
                      </Typography>
                    </Box>

                    {/* Subtitle/Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 3, 
                        flexGrow: 1,
                        lineHeight: 1.5
                      }}
                    >
                      {info.subtitle}
                    </Typography>
                  </Box>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForward />}
            sx={{ px: 4, py: 1.5 }}
          >
            Start Planning Your Visit
          </Button>
        </Box>
      </Container>
  );
}

export default VisitMuseumSection;
