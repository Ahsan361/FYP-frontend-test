import {forwardRef } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const SocialIconButton = forwardRef(({ children, ...props }, ref) => {
  const theme = useTheme();
  
  return (
    <motion.div
      whileHover={{ 
        y: -2,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 0 }}
    >
      <IconButton
        ref={ref}
        sx={{
          color: theme.palette.mode === 'light' 
            ? theme.palette.grey[400] 
            : theme.palette.text.secondary,
          transition: 'color 0.3s ease, background-color 0.3s ease',
          margin: theme.spacing(0, 0.5),
          
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : theme.palette.action.hover,
          },
        }}
        {...props}
      >
        {children}
      </IconButton>
    </motion.div>
  );
});

export default SocialIconButton;