import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedIconButton = ({ icon, sx: customSx = {}, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95, rotate: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <IconButton 
        sx={{ 
          width: 44, 
          height: 44, 
          borderRadius: "12px", 
          backgroundColor: "rgba(0,0,0,0.04)", 
          ...customSx 
        }} 
        {...props}
      >
        {icon}
      </IconButton>
    </motion.div>
  );
};

export default AnimatedIconButton;