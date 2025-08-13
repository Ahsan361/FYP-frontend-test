import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "noBackground", 
})(({ theme, variant, noBackground }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'translateY(0)',
  boxShadow: variant === 'contained' && !noBackground
    ? '0 4px 12px rgba(0, 0, 0, 0.15)'
    : 'none',
  backgroundColor: noBackground ? 'transparent' : undefined,

  '&:hover': {
    transform: noBackground ? 'none' : 'translateY(-2px)',
    backgroundColor: noBackground ? 'transparent' : undefined,
    boxShadow: variant === 'contained' && !noBackground
      ? '0 8px 25px rgba(0, 0, 0, 0.25)'
      : 'none',
  },

  '&::before': noBackground
    ? { display: 'none' }
    : {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        transition: 'left 0.5s',
      },

  '&:hover::before': noBackground
    ? {}
    : { left: '100%' },

  '&.Mui-disabled': {
    transform: 'none',
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
}));



const Button = ({ 
  children, 
  loading = false, 
  variant = 'contained', 
  noBackground = false,
  size = 'large',
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      noBackground={noBackground}
      size={size}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <CircularProgress 
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
          color="inherit" 
        />
      ) : (
        children
      )}
    </StyledButton>
  );
};


export default Button;