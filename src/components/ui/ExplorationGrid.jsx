import React from 'react';
import { 
  Typography, 
  Grid, 
  Box, 
  Container, 
  Grow, 
  Slide, 
  Chip,
  useMediaQuery
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import { lightTheme, darkTheme } from '../../styles/theme';
import { Card, Button } from '../ui';

function ExplorationGrid({ title, subtitle, items }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (    
    <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Slide direction="up" in={true} timeout={800}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          {title && (
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Slide>

      {/* Grid */}
      <Grid container spacing={4}>
        {items.map((info, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
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
                  info.actionText && (
                    <Button 
                      variant="outlined" 
                      size="medium" 
                      fullWidth 
                      endIcon={<ArrowForward />}
                    >
                      <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                        {info.actionText}
                      </Typography>
                    </Button>
                  )
                }
              >
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Icon + Title */}
                  {(info.icon || info.title) && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {info.icon && (
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
                      )}
                      <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                        {info.title}
                      </Typography>
                    </Box>
                  )}

                  {/* Subtitle */}
                  {info.subtitle && (
                    <Typography 
                      variant="h5" 
                      color="text.secondary" 
                      sx={{ mb: 2, lineHeight: 1.5 }}
                    >
                      {info.subtitle}
                    </Typography>
                  )}

                  {/* Extra properties */}
                  {info.type && (
                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {info.type}
                    </Typography>
                  )}
                  {info.dates && (
                    <Typography variant="h5" color="text.secondary">
                      {info.dates}
                    </Typography>
                  )}
                  {info.status && (
                    <Chip 
                      label={info.status} 
                      color={info.statusColor || 'default'} 
                      size="small" 
                      sx={{ my: 1, alignSelf: 'flex-start' }}
                    />
                  )}
                  {info.description && (
                    <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>
                      {info.description}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExplorationGrid;
