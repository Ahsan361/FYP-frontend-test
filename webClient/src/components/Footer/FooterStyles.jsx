import { Box, styled } from '@mui/material';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' 
    ? theme.palette.grey[900] 
    : theme.palette.background.paper,
  color: theme.palette.mode === 'light' 
    ? theme.palette.common.white 
    : theme.palette.text.primary,
  marginTop: 'auto',
  padding: theme.spacing(4, 6, 6),
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

export default StyledFooter;