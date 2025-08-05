import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
        boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
      },
    },
  },
  '& .MuiInputLabel-root': {
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

const Input = ({ 
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error = false,
  helperText,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  startIcon,
  endIcon,
  multiline = false,
  rows = 4,
  required = false,
  disabled = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledTextField
      type={isPassword ? (showPassword ? 'text' : 'password') : type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      required={required}
      disabled={disabled}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: (
          <>
            {isPassword && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
            {endIcon && !isPassword && (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            )}
          </>
        ),
      }}
      {...props}
    />
  );
};

export default Input;