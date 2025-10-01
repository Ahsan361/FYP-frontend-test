import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Typography, Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from "react-redux";

// Import your custom components and themes
import { lightTheme, darkTheme } from '../../styles/theme';
import Button from "../../components/ui/Button";

const CarouselSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  // Sample data - replace with your own images and subtitles
  const slides = [
    {
      image: '/assets/pages/e1.jpg',
       subtitle: "Lahore Museum - Architectural Heritage & Artifacts"
    },
    {
      image: '/assets/pages/s2.jpg',
      subtitle: "Natural History Museum - Flora, Fauna & Fossils"
    },
    {
      image: '/assets/pages/q-h2.jpg',
       subtitle: "Pakistan Monument Museum - Symbol of Unity"
    },
    {
      image: '/assets/pages/e-e/wg3i.jpg',
      subtitle: "Islamabad Museum - New Exhibits & Heritage Preserved"
    },
    {
      image: '/assets/pages/e-e/g1l.jpg',
      subtitle: 'Desert Sand Dunes'
    }
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const getVisibleSlides = () => {
    const visibleSlides = [];
    const totalSlides = slides.length;
    
    // Show 3 cards: previous, current, next
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      visibleSlides.push({ ...slides[index], originalIndex: index });
    }
    
    return visibleSlides;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{
          maxWidth: { xs: '100%', sm: '800px', md: '1200px' },
          mx: 'auto',
          mt: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 4 }
        }}
      >
        {/* Main Carousel Container */}
        <Box sx={{ position: 'relative' }}>
          {/* Cards Container */}
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, sm: 3, md: 4 },
              py: { xs: 4, sm: 6, md: 8 }
            }}
          >
            {getVisibleSlides().map((slide, index) => {
              const isActive = index === 1; // Middle card is active
              
              return (
                <Box
                  key={`${slide.originalIndex}-${index}`}
                  onClick={() => {
                    if (index === 0) goToPrevious();
                    if (index === 2) goToNext();
                  }}
                  sx={{
                    transition: 'all 0.5s ease',
                    cursor: 'pointer',
                    transform: isActive ? 'scale(1.1)' : 'scale(0.9)',
                    opacity: isActive ? 1 : 0.6,
                    zIndex: isActive ? 10 : 1,
                    '&:hover': {
                      opacity: isActive ? 1 : 0.8
                    }
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 3,
                      boxShadow: theme.shadows[8],
                      overflow: 'hidden',
                      width: { xs: '250px', sm: '280px', md: '300px' }
                    }}
                  >
                    {/* Image */}
                    <Box 
                      sx={{ 
                        height: { xs: '320px', sm: '360px', md: '400px' },
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        component="img"
                        src={slide.image}
                        alt={slide.subtitle}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    
                    {/* Subtitle */}
                    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
                      <Typography
                        variant={isActive ? "h6" : "body1"}
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.mode === "dark" 
                            ? theme.palette.text.primary 
                            : isActive ? "#101010" : theme.palette.text.secondary,
                          fontSize: {
                            xs: isActive ? "1rem" : "0.9rem",
                            sm: isActive ? "1.1rem" : "1rem",
                            md: isActive ? "1.25rem" : "1.1rem"
                          }
                        }}
                      >
                        {slide.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Navigation Buttons */}
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: { xs: 8, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[4],
              zIndex: 20,
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                boxShadow: theme.shadows[8]
              }
            }}
          >
            <ChevronLeft size={24} />
          </IconButton>

          <IconButton
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: { xs: 8, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[4],
              zIndex: 20,
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                boxShadow: theme.shadows[8]
              }
            }}
          >
            <ChevronRight size={24} />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CarouselSlider;