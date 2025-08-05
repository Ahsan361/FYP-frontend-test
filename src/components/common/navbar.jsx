import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  Search,
  Collections,
  Info,
  ContactMail,
  AccountCircle,
  Notifications,
  Settings,
  Logout,
  Login,
  FavoriteBorder,
  BookmarkBorder
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ThemeToggle from './ThemeToggle';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'transparent', // Prevent transparent prop from being passed to DOM
})(({ theme, transparent }) => ({
  transition: 'all 0.5s ease-in-out',
  backdropFilter: 'blur(10px)',
  backgroundColor: transparent 
    ? theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.85)' 
      : 'rgba(17, 24, 39, 0.85)'
    : theme.palette.background.default,
  boxShadow: transparent 
    ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
    : theme.shadows[4],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&:hover': {
    transform: 'scale(1.05) rotate(1deg)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.text.primary,
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(1, 2.5),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent)`,
    transition: 'left 0.5s',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    '&:before': {
      left: '100%',
    },
  },
}));

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'button', // Prevent button prop from being passed to DOM
})(({ theme }) => ({
  borderRadius: 12,
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    transform: 'translateX(8px)',
    boxShadow: theme.shadows[2],
  },
}));

const Navbar = ({
  title = "MIRAS",
  subtitle = "Cultural Heritage",
  logo,
  navigationItems = [],
  transparent = false,
  fixed = true,
  elevation = 1,
  showSearch = true,
  showNotifications = true,
  showProfile = true,
  user = null,
  onLogoClick,
  onMenuClick,
  onLogin,
  onLogout,
  onProfileClick,
  onNotificationClick,
  customActions = null,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [notificationCount] = useState(3);

  const defaultNavItems = [
    { label: 'Home', icon: <Home />, path: '/', onClick: () => console.log('Home clicked') },
    { label: 'Explore', icon: <Search />, path: '/explore', onClick: () => console.log('Explore clicked') },
    { label: 'Collections', icon: <Collections />, path: '/collections', onClick: () => console.log('Collections clicked') },
    { label: 'About', icon: <Info />, path: '/about', onClick: () => console.log('About clicked') },
    { label: 'Contact', icon: <ContactMail />, path: '/contact', onClick: () => console.log('Contact clicked') },
  ];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavItems;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      console.log('Logo clicked');
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    if (onMenuClick) {
      onMenuClick(item);
    }
  };

  const renderLogo = () => (
    <LogoContainer onClick={handleLogoClick}>
      {logo && (
        <Box 
          component="img" 
          src={logo} 
          alt="Logo" 
          sx={{ 
            height: 40, 
            mr: 1.5,
            filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none'
          }} 
        />
      )}
      <Box>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 800, 
            lineHeight: 3, 
            color: theme.palette.text.primary,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '0.75rem', 
              opacity: 0.7, 
              lineHeight: 1, 
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </LogoContainer>
  );

  const renderDesktopNavigation = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 6 }}>
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          startIcon={item.icon}
          onClick={() => handleMenuItemClick(item)}
        >
          {item.label}
        </NavButton>
      ))}
    </Box>
  );

  const renderRightActions = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.primary' }}>
      {customActions}
      <ThemeToggle />
      
      {showSearch && !isMobile && (
        <Tooltip title="Search Artifacts" arrow>
          <IconButton 
            color="inherit"
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <Search />
          </IconButton>
        </Tooltip>
      )}
      
      {showNotifications && (
        <Tooltip title="Notifications" arrow>
          <IconButton 
            color="inherit" 
            onClick={onNotificationClick}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <Badge 
              badgeContent={notificationCount} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  animation: notificationCount > 0 ? 'pulse 2s infinite' : 'none',
                }
              }}
            >
              <Notifications />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
      
      {showProfile && (
        <>
          {user ? (
            <Tooltip title="Profile" arrow>
              <IconButton 
                onClick={handleProfileMenuOpen} 
                sx={{ 
                  p: 0, 
                  ml: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{ 
                    width: 36, 
                    height: 36,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              size="small"
              startIcon={<Login />}
              onClick={onLogin}
              sx={{ 
                ml: 1,
                borderRadius: 20,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              Login
            </Button>
          )}
        </>
      )}
      
      {isMobile && (
        <IconButton
          color="inherit"
          onClick={handleMobileMenuToggle}
          sx={{ 
            ml: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );

  const renderMobileDrawer = () => (
    <StyledDrawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      ModalProps={{ keepMounted: true }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Menu
        </Typography>
        <IconButton 
          onClick={handleMobileMenuToggle}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {showSearch && (
        <>
          <StyledListItem button onClick={() => console.log('Mobile search')}>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Search Artifacts" />
          </StyledListItem>
          <Divider sx={{ my: 1 }} />
        </>
      )}

      <List>
        {navItems.map((item, index) => (
          <StyledListItem
            key={index}
            button
            onClick={() => handleMenuItemClick(item)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </StyledListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      {user ? (
        <>
          <StyledListItem>
            <ListItemIcon>
              <Avatar src={user.avatar} sx={{ width: 24, height: 24 }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </ListItemIcon>
            <ListItemText 
              primary={user.name} 
              secondary={user.email}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </StyledListItem>
          <StyledListItem button onClick={() => console.log('Favorites')}>
            <ListItemIcon><FavoriteBorder /></ListItemIcon>
            <ListItemText primary="Favorites" />
          </StyledListItem>
          <StyledListItem button onClick={() => console.log('Bookmarks')}>
            <ListItemIcon><BookmarkBorder /></ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </StyledListItem>
          <StyledListItem button onClick={() => console.log('Settings')}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </StyledListItem>
          <StyledListItem button onClick={onLogout}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledListItem>
        </>
      ) : (
        <StyledListItem button onClick={onLogin}>
          <ListItemIcon><Login /></ListItemIcon>
          <ListItemText primary="Login" />
        </StyledListItem>
      )}
    </StyledDrawer>
  );

  const renderProfileMenu = () => (
    <Menu
      anchorEl={profileMenuAnchor}
      open={Boolean(profileMenuAnchor)}
      onClose={handleProfileMenuClose}
      onClick={handleProfileMenuClose}
      PaperProps={{
        elevation: 8,
        sx: {
          mt: 1.5,
          minWidth: 220,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          '& .MuiMenuItem-root': {
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateX(4px)',
            }
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {user && (
        <>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <Divider />
        </>
      )}
      
      <MenuItem onClick={onProfileClick}>
        <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => console.log('Favorites')}>
        <ListItemIcon><FavoriteBorder fontSize="small" /></ListItemIcon>
        Favorites
      </MenuItem>
      <MenuItem onClick={() => console.log('Bookmarks')}>
        <ListItemIcon><BookmarkBorder fontSize="small" /></ListItemIcon>
        Bookmarks
      </MenuItem>
      <MenuItem onClick={() => console.log('Settings')}>
        <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogout}>
        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <style>{`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`}</style>
      
      <StyledAppBar 
        position={fixed ? "fixed" : "static"} 
        transparent={transparent}
        elevation={elevation}
        {...props}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          {renderLogo()}
          {renderDesktopNavigation()}
          <Box sx={{ flexGrow: 1 }} />
          {renderRightActions()}
        </Toolbar>
      </StyledAppBar>
      
      {renderMobileDrawer()}
      {renderProfileMenu()}
      {fixed && <Toolbar sx={{ minHeight: 70 }} />}
    </>
  );
};

export default Navbar;