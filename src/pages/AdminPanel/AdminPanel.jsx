import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import {
  CssBaseline,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemButton,
} from '@mui/material';

import {
  Home,
  Archive,
  Users,
  Settings,
  LogOut,
  Menu as MenuIcon,
  Bell,
  Search,
  User,
  Gavel,
  Calendar,
  Image,
  Blocks,
  ClipboardList,
  ShoppingCart,
  GalleryHorizontal,
} from 'lucide-react';

// Import theme
import { lightTheme, darkTheme } from '../../styles/theme';

//import context
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

// Import components
import { ThemeToggle } from '../../components/ui';

// Import admin sections
import AdminHome from './AdminHome';
import AdminArtifacts from './AdminArtifacts';
import AdminUsers from './AdminUsers';
import AdminAuctions from './AdminAuctions';
import AdminBlockchain from './AdminBlockChain';
import AdminEventRegistration from "./AdminEventRegistration";
import AdminEvents from './AdminEvents';
import AdminExhibitions from './AdminExhibitions';
import AdminMarketplace from './AdminMarketPlace';
import AdminMediaOwnership from './AdminArtifactMedia';
import AdminExhibitionRegistration from './AdminExhibitionRegistration';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: Home, key: 'home' },
  { text: 'Artifacts', icon: Archive, key: 'artifacts' },
  { text: 'Users', icon: Users, key: 'users' },
  { text: 'Auctions', icon: Gavel, key: 'auctions' },
  { text: 'Events', icon: Calendar, key: 'events' },
  { text: 'Event Registration', icon: ClipboardList, key: 'eventBookings' },
  { text: 'Exhibitions', icon: Image, key: 'exhibitions' },  
  { text: 'Exhibitions Registration', icon: Image, key: 'exhibitionBookings' },  
  { text: 'Blockchain', icon: Blocks, key: 'blockchain' },
  { text: 'Market Place', icon: ShoppingCart, key: 'marketplace' },
  { text: 'Artifact Media', icon: GalleryHorizontal, key: 'artifactMedia' },
];

function AdminPanel() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
    navigate("/profile"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
    handleProfileClose(); // close dropdown menu
    navigate("/login"); 
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <AdminHome />;
      case 'artifacts':
        return <AdminArtifacts />;
      case 'users':
        return <AdminUsers />;
      case 'auctions':
        return <AdminAuctions />;
      case 'blockchain':
        return <AdminBlockchain />;        
      case 'eventBookings':
        return <AdminEventRegistration />;           
      case 'events':
        return <AdminEvents />;    
      case 'exhibitions':
        return <AdminExhibitions />;            
      case 'exhibitionBookings':
      return <AdminExhibitionRegistration />;           
        case 'marketplace':
        return <AdminMarketplace />;         
      case 'artifactMedia':
        return <AdminMediaOwnership />;                 
      default:
        return <AdminHome />;
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', }}>
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="white">
          MIRAS Admin
        </Typography>
        <Typography variant="caption" color="rgba(255,255,255,0.8)">
          Cultural Heritage Platform
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: "hidden", pt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.key}>
              <ListItemButton onClick={() => setActiveSection(item.key)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 0.5,
                  backgroundColor:
                    activeSection === item.key
                      ? theme.palette.mode === 'dark'
                        ? theme.palette.primary.main + '40'
                        : theme.palette.primary.main + '15'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.main + '20'
                        : theme.palette.primary.main + '08',
                  },
                }}
              >
              <ListItemIcon
                sx={{
                  color:
                    activeSection === item.key
                      ? theme.palette.primary.main
                      : 'inherit',
                  minWidth: 40,
                }}
              >
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: activeSection === item.key ? 600 : 400,
                    color:
                      activeSection === item.key
                        ? theme.palette.primary.main
                        : 'inherit',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            position: 'fixed', // 🟢 Keep it fixed
            height: '100vh',
            top: 0,
            left: 0,
            overflowX: 'hidden',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          ml: { sm: `${drawerWidth}px` }, // 🟢 Push content beside sidebar
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
          overflowY: 'auto', // 🟢 Only main section scrolls
        }}
      >
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            {/* Header Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit">
                <Search size={20} />
              </IconButton>

              <IconButton color="inherit">
                <Bell size={20} />
              </IconButton>

              <ThemeToggle />

              <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
                <Avatar 
                  src={user?.profileImage?.url || ""} 
                  sx={{ width: 32, height: 32 }}
                >
                    { user?.username?.[0]?.toUpperCase()}  
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
          PaperProps={{
            sx: { width: 200, mt: 1.5 },
          }}
        >
          <MenuItem onClick={handleProfileClose}>
            <User size={16} style={{ marginRight: 8 }} />
             {user?.username || "Profile"}
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{ color: 'error.main' }}
          >
            <LogOut size={16} style={{ marginRight: 8 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Main Page Content */}
        <Box sx={{ pt: 10, px: 2 }}>{renderContent()}</Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminPanel;
