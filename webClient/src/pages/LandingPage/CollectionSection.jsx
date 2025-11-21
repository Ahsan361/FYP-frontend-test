import { Typography, Grid, Box, Container, Grow, Slide } from '@mui/material';
import { Museum, History, Public, People, ArrowForward } from '@mui/icons-material';
import { Book, Pen, PenBoxIcon } from "lucide-react";

//custom components
import { Card, Button } from '../../components/ui';

function CollectionSection(){
  const collections = [
    {
      title: "Historic Landmarks of Pakistan",
      count: 1985,
      icon: <Public />,
      image: "/assets/collections/collection1.jpg",
      description:
        "Sites such as Lahore Fort, Makli Necropolis, and tombs, that narrate Pakistan's enduring history. These landmarks reflect the architectural brilliance of past civilizations.",
    },
    {
      title: "Ancient Civilizations",
      count: 3420,
      icon: <History />,
      image: "/assets/collections/collection2.jpg",
      description:
        "Discover Pakistan’s earliest civilizations through sites like Mohenjo-Daro, Harappa, and Mehrgarh of the Indus Valley, and Gandhara’s Buddhist heritage at Taxila and Takht-i-Bahi",
    },
    {
      title: "Islamic Heritage",
      count: 2890,
      icon: <Museum />,
      image: "/assets/collections/collection3.jpg",
      description:
        "Marvel at intricate calligraphy, glazed tiles, ceramics, and monumental mosques and shrines reflecting centuries of Islamic art and architecture. Each masterpiece embodies spiritual devotion",
    },
    {
      title: "Manuscripts & Literature",
      count: 920,
      icon: <Book />,
      image: "/assets/collections/collection4.jpg",
      description:
        "Rare manuscripts, poetry, and historical writings that reflect centuries of intellectual and cultural legacy. They preserve the wisdom, creativity, and scholarly pursuits of generations past.",
    },
    {
      title: "Nothern Wonders",
      count: 2240,
      icon: <People />,
      image: "/assets/collections/collection.jpg",
      description:
        "From Fairy Meadows to Hunza’s Baltit Fort and Deosai Plains, experience Pakistan’s breathtaking northern landscapes and their cultural treasures.",
    },
    {
      title: "Handicrafts & Pottery",
      count: 2240,
      icon: <People />,
      image: "/assets/collections/collection6.jpg",
      description:
        "Discover handwoven carpets, Multani blue pottery, Sindhi ajrak, intricate embroidery, wood-carved furniture, brass inlay, camel-skin lamps, and other handmade crafts.",
    },
    {
      title: "Cultural Festivals",
      count: 2240,
      icon: <People />,
      image: "/assets/collections/collection7.jpg",
      description:
        "Immerse yourself in the colors of Basant, the melodies of Sufi gatherings, and the traditions of folk festivals that celebrate Pakistan’s diversity.",
    },
    {
      title: "Textile Excellence",
      count: 2240,
      icon: <People />,
      image: "/assets/collections/collection8.jpg",
      description:
        "Explore Sindhi ralli quilts, Balochi embroidery, Punjabi phulkari, and Kashmiri shawls—textiles that weave together centuries of cultural identity.",
    },
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