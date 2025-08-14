import { Typography, Box, Container, Stack, Fade, useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';

// Custom Components
import { Button } from '../../components/ui';

function NewsletterSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Container maxWidth={false}  
        sx={{ 
          px:{xs: 2, md: 8},
          py: { xs: 4, md: 6 },
          background: theme.palette.mode === 'light' 
              ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.divider} 100%)`
              : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          color: theme.palette.primary.contrastText,
          textAlign: 'center'
        }} 
        >
          <Fade in={true} timeout={1200}>
            <Box>
              <Typography variant="h3" color="text.secondary" sx={{ fontWeight: 700, mb: 2 }}>
                Stay Connected with Heritage
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, opacity: 0.9 }}>
                Get updates on new discoveries, virtual events, and educational programs
              </Typography>
              
              <Stack 
                direction={isMobile ? "column" : "row"} 
                spacing={2} 
                sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}
              >
                <Box sx={{ flex: 1 }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '16px',
                      color: "text.secondary"
                    }}
                  />
                </Box>
                <Button variant="contained" size="small"  sx={{ flex: 0.5 }}>
                  Subscribe
                </Button>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                Join 10,000+ heritage enthusiasts and educators
              </Typography>
            </Box>
          </Fade>
        </Container>
    )
}

export default NewsletterSection;