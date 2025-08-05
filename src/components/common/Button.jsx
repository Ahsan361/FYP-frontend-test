import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'translateY(0)',
  boxShadow: variant === 'contained' 
    ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
    : 'none',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'contained' 
      ? '0 8px 25px rgba(0, 0, 0, 0.25)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
  },

  '&:active': {
    transform: 'translateY(0)',
    transition: 'transform 0.1s',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },

  '&:hover::before': {
    left: '100%',
  },

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
  size = 'medium',
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