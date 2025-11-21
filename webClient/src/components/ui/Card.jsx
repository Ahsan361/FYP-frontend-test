import React, { useState, useEffect, useRef } from 'react';
import { Card as MuiCard, CardContent, CardActions, CardMedia, Typography, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'translateY(0)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 12px 40px rgba(0, 0, 0, 0.15)'
        : '0 12px 40px rgba(0, 0, 0, 0.4)',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },

  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));

const AnimatedCardMedia = styled(CardMedia)({
  transition: 'transform 0.3s ease, opacity 0.4s ease',
  '.MuiCard-root:hover &': {
    transform: 'scale(1.05)',
  },
});

// Lightweight placeholder SVG
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(99,102,241);stop-opacity:0.2" /%3E%3Cstop offset="100%25" style="stop-color:rgb(139,92,246);stop-opacity:0.2" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="200" fill="url(%23grad)" /%3E%3C/svg%3E';

const LazyCardMedia = ({ image, alt, sx, ...props }) => {
  const [imageSrc, setImageSrc] = useState(placeholderImage);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (!image) {
      setIsLoading(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [image]);

  useEffect(() => {
    if (isInView && image) {
      const img = new Image();
      img.src = image;
      
      img.onload = () => {
        setImageSrc(image);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setIsLoading(false);
        // Keep placeholder on error
      };
    }
  }, [isInView, image]);

  return (
    <Box ref={imgRef} sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      <AnimatedCardMedia
        component="img"
        image={imageSrc}
        alt={alt}
        sx={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.4s ease',
          ...sx,
        }}
        {...props}
      />
    </Box>
  );
};

const Card = ({
  children,
  elevation = 1,
  onClick,
  image,
  actions,
  sx = {},
  ...props
}) => {
  return (
    <StyledCard
      elevation={elevation}
      onClick={onClick}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        ...sx,
      }}
      {...props}
    >
      {image && (
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: '100%', sm: '40%', md: '100%' },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <LazyCardMedia
            image={image}
            alt="Card image"
            sx={{
              height: { xs: 200, sm: '100%', md: 280 },
              objectFit: 'cover',
              width: '100%',
            }}
          />
        </Box>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
          {children}
        </CardContent>

        {actions && (
          <CardActions sx={{ justifyContent: 'flex-end', p: { xs: 2, sm: 3 } }}>
            {actions}
          </CardActions>
        )}
      </Box>
    </StyledCard>
  );
};

export default Card;