import React from 'react';
import { Card as MuiCard, CardContent, CardActions, CardMedia, Typography, Box } from '@mui/material';
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
  transition: 'transform 0.3s ease',
  '.MuiCard-root:hover &': {
    transform: 'scale(1.05)',
  },
});

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
          }}
        >
          <AnimatedCardMedia
            component="img"
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
        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md:4 } }}>
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
