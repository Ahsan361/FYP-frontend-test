// carosal slider
import { useState, useEffect } from "react";
import {Box, Typography, useTheme, useMediaQuery,} from "@mui/material";
import {Search} from "@mui/icons-material";
import { Button, SlideNavButton } from '../../components/ui';

const StaticHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",        
      title: "Modern Interior Design",
      subtitle: "Transform your space with our expert design solutions",
      description:
        "Creating beautiful, functional spaces that reflect your personality and lifestyle.",
      buttonText: "Explore Our Work",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=600&fit=crop",
      title: "Luxury Living Spaces",
      subtitle: "Experience the finest in residential design",
      description:
        "From concept to completion, we bring your dream home to life.",
      buttonText: "Get Started",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      title: "Commercial Excellence",
      subtitle: "Professional spaces that inspire productivity",
      description:
        "Designing offices and commercial spaces that enhance business success.",
      buttonText: "View Projects",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop",
      title: "Architectural Innovation",
      subtitle: "Where creativity meets functionality",
      description:
        "Innovative architectural solutions for modern living and working.",
      buttonText: "Learn More",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "70vh", md: "80vh" },
        overflow: "hidden",   
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: `${slides.length * 100}%`,
          height: "100%",
          transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              width: `${100 / slides.length}%`,
              height: "100%",
              position: "relative",
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Content on the picture that is displayed */}
            <Box
              sx={{
                textAlign: "center",
                color: "white",
                px: { xs: 3, md: 6 },
                maxWidth: "800px",
                animation:
                  currentSlide === index ? "fadeInUp 0.8s ease-out" : "none",
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(30px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Typography
                variant={isMobile ? "h4" : "h2"}
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                }}
              >
                {slide.title}
              </Typography>

              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  mb: 3,
                  fontWeight: 400,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                }}
              >
                {slide.subtitle}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: { xs: "16px", md: "18px" },
                  opacity: 0.9,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                }}
              >
                {slide.description}
              </Typography>

              <Button variant="contained" size="large" startIcon={<Search />}>
                Explore Artifacts
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

        < SlideNavButton 
        onClick={goToPreviousSlide}
        direction="prev"
        />

         < SlideNavButton 
        onClick={goToNextSlide}
        direction="next"
        />

      <Box
  sx={{
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 1,
    bgcolor: "rgba(0, 0, 0, 0.1)",
    padding: "8px 12px",
    borderRadius: "20px",
    backdropFilter: "blur(8px)",
  }}
>
  {slides.map((_, index) => (
    <Box
      key={index}
      onClick={() => goToSlide(index)}
      sx={{
        width: 15,
        height: 2,
        bgcolor: currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "white",
          transform: "scale(1.2)",
        },
      }}
    />
  ))}
</Box>
    </Box>
  );
};

export default StaticHeroSection;
