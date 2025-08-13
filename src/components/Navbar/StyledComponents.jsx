import { styled } from '@mui/material/styles';
import { AppBar, Drawer, Box, Button, ListItem } from '@mui/material';
import { shouldForwardProp } from "@mui/system";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: 'all 0.5s ease-in-out',
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.85)' 
    : 'rgba(17, 24, 39, 0.85)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: '15%',
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: "280",
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&:hover': {
    transform: 'scale(1.05) rotate(1deg)',
  },
}));

export const NavButton = styled(Button)(({ theme }) => ({
  // fontSize: "0.9rem",

  // [theme.breakpoints.up('sm')]: {
  //   fontSize: "1rem",
  // },
  // [theme.breakpoints.up('md')]: {
  //   fontSize: "1.5rem",
  // },
  
  margin: theme.spacing(0, 1),
  color: theme.palette.text.primary,
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 0,
  padding: theme.spacing(1, 0.5),
  position: 'relative',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(4px)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
  '&.MuiButton-root': {
    '& .MuiTouchRipple-root': {
      display: 'none'
    }
  }
}));
export const StyledListItem = styled(
  (props) => <ListItem {...props} />,
  {
    shouldForwardProp: (prop) => prop !== 'button'
  }
)(({ theme }) => ({
  borderRadius: 12,
  margin: theme.spacing(),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

}));
