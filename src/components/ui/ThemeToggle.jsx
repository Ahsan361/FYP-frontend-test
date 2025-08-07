import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <IconButton 
          onClick={handleToggle} 
          sx={{ width: 44, height: 44, borderRadius: "12px", backgroundColor: "rgba(0,0,0,0.04)" }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

export default ThemeToggle;