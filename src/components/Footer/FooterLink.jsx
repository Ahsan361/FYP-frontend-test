import { Link, styled } from '@mui/material';

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === 'light' 
    ? theme.palette.grey[300] 
    : theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  position: 'relative',
  
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  
  '&:hover::after': {
    width: '100%',
  },
}));

export default FooterLink;

