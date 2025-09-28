import React from 'react';
import { Typography, Grid, Box, Container, Grow, Slide } from '@mui/material';
import { EventSeat, Map, Museum, FamilyRestroom, ArrowForward} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

// Custom components
import { Card, Button } from '../../components/ui';

function VisitMuseumSection() {
  const navigate = useNavigate();
  const visitInfo = [
    {
      id: 1,
      title: "Plan your visit",
      subtitle:
        "Book tickets and plan your day including exhibitions, facilities, access, food and travel.",
      icon: <EventSeat />,
      image: "/assets/landing-page/visit-the-museum/visit-the-museum.jpg",
      actionText: "Book Tickets",
      path: "/PlanVisitPage",
    },
    {
      id: 2,
      title: "Museum map",
      subtitle:
        "Navigate the Museum with ease, using our floor-by-floor plan and discover what not to miss.",
      icon: <Map />,
      image: "/assets/landing-page/visit-the-museum/map.jpg",
      actionText: "View Map",
      path: "/PlanVisitPage/map",
    },
    {
      id: 3,
      title: "Galleries",
      subtitle:
        "Walk through two million years of history and culture across more than 50 galleries.",
      icon: <Museum />,
      image: "/assets/landing-page/visit-the-museum/galleries.jpg",
      actionText: "Explore Galleries",
      path: "/collections/online",
    },
    {
      id: 4,
      title: "Family visits",
      subtitle:
        "From family facilities to activities and events, discover how to make the most of your day at the Museum.",
      icon: <FamilyRestroom />,
      image: "/assets/landing-page/visit-the-museum/family-visits.jpg",
      actionText: "Family Guide",
      path: "/PlanVisitPage/family",
    },
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
                      onClick={() => navigate(info.path)}
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
