import { Typography, Grid, Box, Container, Stack, Grow, Slide, useMediaQuery } from '@mui/material';
import { Favorite, LocationOn, Visibility, Star, ArrowForward, BookmarkBorder,Share } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';
//custom components
import { Card, Button, Badge } from '../../components/ui';

function ArtifactsSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const featuredArtifacts = [
        {
          id: 1,
          title: "Gandhara Buddha Sculpture",
          period: "2nd-5th Century CE",
          location: "Peshawar Museum",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
          status: "Preserved",
          description: "Exquisite example of Gandhara art showcasing Greco-Buddhist influences",
          views: "12.5k",
          rating: 4.8
        },
        {
          id: 2,
          title: "Mughal Miniature Art",
          period: "16th-17th Century",
          location: "Lahore Museum",
          image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
          status: "Restored",
          description: "Intricate miniature paintings from the Mughal court era",
          views: "8.3k",
          rating: 4.9
        },
        {
          id: 3,
          title: "Indus Valley Seals",
          period: "2500-1900 BCE",
          location: "National Museum Karachi",
          image: "https://images.unsplash.com/photo-1594736797933-d0401ba196a6?w=400&h=300&fit=crop",
          status: "Research",
          description: "Mysterious seals from one of world's earliest civilizations",
          views: "15.2k",
          rating: 4.7
        },
        {
          id: 4,
          title: "Sufi Calligraphy",
          period: "14th-16th Century",
          location: "Multan Museum",
          image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
          status: "Preserved",
          description: "Beautiful Islamic calligraphy with spiritual inscriptions",
          views: "9.8k",
          rating: 4.6
        },
        {
          id: 5,
          title: "Terracotta Figurines",
          period: "1st-3rd Century CE",
          location: "Taxila Museum",
          image: "https://images.unsplash.com/photo-1551650681-ca71a83d1dc6?w=400&h=300&fit=crop",
          status: "Preserved",
          description: "Ancient terracotta artifacts depicting daily life",
          views: "6.4k",
          rating: 4.5
        },
        {
          id: 6,
          title: "Colonial Architecture",
          period: "19th-20th Century",
          location: "Karachi Heritage",
          image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop",
          status: "Documentation",
          description: "British colonial architectural heritage documentation",
          views: "11.7k",
          rating: 4.4
        }
      ];
    
    return(
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Featured Artifacts
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Discover the most remarkable pieces from our digital collection, each telling 
              a unique story of Pakistan's rich cultural heritage
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={3}>
          {featuredArtifacts.map((artifact, index) => (
            <Grid key={artifact.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Grow in={true} timeout={1200 + index * 100}>
                <Card
                  image={artifact.image}
                  imageHeight={250}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  actions={
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      <Button size="small" startIcon={<Favorite />} sx={{ flex: 1 }}>
                        Like
                      </Button>
                      <Button size="small" variant="outlined" startIcon={<BookmarkBorder />}>
                        Save
                      </Button>
                      <Button size="small" variant="outlined" startIcon={<Share />}>
                        Share
                      </Button>
                    </Stack>
                  }
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flexGrow: 1, mr: 1 }}>
                        {artifact.title}
                      </Typography>
                      <Badge
                        label={artifact.status}
                        color={
                          artifact.status === 'Preserved' ? 'success' :
                          artifact.status === 'Restored' ? 'warning' : 
                          artifact.status === 'Research' ? 'info' : 'default'
                        }
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {artifact.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Period:</strong> {artifact.period}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {artifact.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Visibility sx={{ fontSize: 16 }} />
                        <Typography variant="caption">{artifact.views}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                        <Typography variant="caption">{artifact.rating}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForward />}
            sx={{ px: 4, py: 1.5 }}
          >
            Explore All Artifacts
          </Button>
        </Box>
      </Container>
    );
}

export default ArtifactsSection;