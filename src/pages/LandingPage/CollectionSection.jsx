import { Paper, Typography, Grid, Box, Container, Grow, Slide } from '@mui/material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';
import { Museum, History, Public, People, ArrowForward } from '@mui/icons-material';

//custom components
import { Card, Button } from '../../components/ui';

function CollectionSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;

    const collections = [
        {
          title: 'Ancient Civilizations',
          count: 3420,
          icon: <History />,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
          description: 'Artifacts from Indus Valley, Gandhara, and other ancient cultures'
        },
        {
          title: 'Islamic Heritage',
          count: 2890,
          icon: <Museum />,
          image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop',
          description: 'Calligraphy, ceramics, and architectural elements'
        },
        {
          title: 'Colonial Period',
          count: 1650,
          icon: <Public />,
          image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
          description: 'British colonial era artifacts and documents'
        },
        {
          title: 'Folk Traditions',
          count: 2240,
          icon: <People />,
          image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
          description: 'Traditional crafts, textiles, and cultural items'
        }
    ];

    return(
      <Container maxWidth={false}  sx={{ px:{xs: 2, md: 8}, py: { xs: 4, md: 8 } }}>
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Explore Collections
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Browse through our carefully curated collections spanning thousands of years 
              of cultural heritage
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={4}>
          {collections.map((collection, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Grow in={true} timeout={1000 + index * 200}>
                <Card
                  image={collection.image}
                  imageHeight={250}
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
                      {collection.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {collection.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {collection.count} items
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {collection.description}
                  </Typography>

                  <Button 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    endIcon={<ArrowForward />}
                  >
                    View Collection
                  </Button>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
}

export default CollectionSection;