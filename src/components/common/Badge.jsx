import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme, variant, color }) => ({
  transition: 'all 0.2s ease',
  fontWeight: 500,
  
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.palette.mode === 'light' 
      ? '0 2px 8px rgba(0, 0, 0, 0.15)'
      : '0 2px 8px rgba(0, 0, 0, 0.3)',
  },

  ...(variant === 'gradient' && {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    },
  }),
}));

const Badge = ({ 
  label, 
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  icon,
  onDelete,
  onClick,
  ...props 
}) => {
  return (
    <StyledChip
      label={label}
      variant={variant === 'gradient' ? 'filled' : variant}
      color={variant === 'gradient' ? 'default' : color}
      size={size}
      icon={icon}
      onDelete={onDelete}
      onClick={onClick}
      clickable={!!onClick}
      {...props}
    />
  );
};

export default Badge;