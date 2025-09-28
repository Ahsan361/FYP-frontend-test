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
      image: "/assets/landing-page/static-hero-section/cover1.jpg",
      title: "Preserving Pakistan’s Heritage, Digitally. ",
      subtitle: "",
      description:
        "Discover artifacts, exhibitions, and stories that celebrate our cultural legacy",
      buttonText: "Explore Our Work",
    },
    {
      id: 2,
      image: "/assets/landing-page/static-hero-section/cover5.jpg",
      title: "Historic Locations of Pakistan",
      subtitle: "Journey through time with our heritage landmarks",
      description:
        "Explore iconic sites like Mohenjo-daro, Taxila, Lahore Fort, and Makli Necropolis. Each monument holds the story of civilizations that shaped our land.",
      buttonText: "Explore Landmarks",
    },
    {
      id: 3,
      image: "/assets/landing-page/static-hero-section/cover3.jpg",
      title: "Stories Through Textiles",
      subtitle:
        "Unraveling Pakistan’s rich cultural identity; the Hard work behind every weave!",
      description:
        "Discover the history of Pakistan’s cultural identity woven into fabrics and patterns",
      buttonText: "Explore Collections",
    },
    {
      id: 4,
      image: "/assets/landing-page/static-hero-section/cover4.jpg",
      title: "Where culture meets community",
      subtitle:
        "A trusted space to discover unique pieces, support local creators, and share stories through exchange.",
      description: "",
      buttonText: "Buy & Sell Now",
    },
    {
      id: 5,
      image: "/assets/landing-page/static-hero-section/cover2.jpg",
      title: "Heritage Across Pakistan",
      subtitle: "",
      description:
        "From ancient cities to hidden cultural treasures. \n\n Explore the stories tied to historic locations and landmarks that define our nation’s identity",
      buttonText: "Get Started",
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

              <Button variant="contained" size="large">
                {slide.buttonText}
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
