import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

const Loading = ({ 
  type = 'spinner', 
  message = 'Loading...', 
  size = 40,
  lines = 3,
  height = 40,
  width = '100%',
  ...props 
}) => {
  if (type === 'skeleton') {
    return (
      <Box {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={width}
            height={height}
            sx={{ mb: 1, borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <StyledBox {...props}>
      <CircularProgress 
        size={size} 
        thickness={4}
        sx={{
          color: 'primary.main',
          mb: 2,
        }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </StyledBox>
  );
};

export default Loading;