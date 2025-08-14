import { Typography, Grid, Box, Container, Stack, Slide, useMediaQuery } from '@mui/material';
import { School, PlayArrow } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../styles/theme';

// Custom Components
import { Button } from '../../components/ui';

function QuickActionsSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Slide direction="right" in={true} timeout={1000}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                  Experience History Like Never Before
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>
                  Take virtual tours, access educational resources, and contribute to preserving 
                  Pakistan's cultural legacy. Our digital platform brings ancient history to life 
                  with cutting-edge technology.
                </Typography>
                
                <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mb: 4 }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<PlayArrow />}
                    sx={{ flex: isMobile ? 'none' : 1 }}
                  >
                    Virtual Tour
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    startIcon={<School />}
                    sx={{ flex: isMobile ? 'none' : 1 }}
                  >
                    Educational Hub
                  </Button>
                </Stack>
              </Box>
            </Slide>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Slide direction="left" in={true} timeout={1000}>
              <Box
                sx={{
                  height: { xs: 300, md: 400 },
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
                  alt="Cultural Heritage"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 4,
                    filter: 'brightness(0.8)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  <PlayArrow sx={{ fontSize: 64, opacity: 0.9 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Watch Introduction
                  </Typography>
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    )
}

export default QuickActionsSection;