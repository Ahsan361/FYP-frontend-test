import React from "react";
import { useState, useContext } from "react";
import { 
  StyledAppBar, 
  StyledDrawer, 
  LogoContainer, 
  NavButton, 
  StyledListItem 
} from "./StyledComponents";
import { 
  Toolbar, 
  Box, 
  IconButton, 
  List, 
  ListItemText, 
  Menu, 
  MenuItem, 
  Avatar, 
  Typography, 
  Stack,
  useMediaQuery,
  useTheme,
  Divider
} from "@mui/material";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { 
    Menu as MenuIcon, 
    Close as CloseIcon, 
    Home,
    Search,
    Info,
    ContactMail,
    Login,
    Logout
} from "@mui/icons-material";
//custom components
import { UserContext } from "../contexts/UserContext";
import ThemeToggle  from "../ui/ThemeToggle";
import Button from "../ui/Button";

const Logo = () => {
 const theme = useTheme();
  return (
    <LogoContainer>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontSize: "1.2rem" }}>
          M
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          MIRAS
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          Digital Gallery
        </Typography>
      </Box>
    </LogoContainer>
  );
};

const DesktopNavigation = ({ navItems }) => (
  <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 1, px: 2 }}>
    {navItems.map((item, index) => (
      <NavButton key={index} startIcon={item.icon}>
        {item.label}
      </NavButton>
    ))}
  </Box>
);

const RightActions = ({ user , isMobile, handleMobileMenuToggle }) => {
  const theme = useTheme();
  return (
   <Stack direction="row" spacing={1.5} alignItems="center">
      <ThemeToggle />
      {user ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
          <IconButton>
            <Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>
          </IconButton>
        </Box>
      ) : (
        <Button variant="contained" startIcon={<Login />}>Sign In</Button>
      )}
      {isMobile && (
        <IconButton
          onClick={handleMobileMenuToggle}
          sx={{ width: 44, height: 44, borderRadius: "12px", backgroundColor: "rgba(0,0,0,0.04)" }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Stack>
  );
};

const MobileMenu = ({ mobileMenuOpen, handleMobileMenuToggle, navItems, user }) => {
    const theme = useTheme();
    return (
  <StyledDrawer anchor="right" open={mobileMenuOpen} onClose={handleMobileMenuToggle} sx={{
    "& .MuiDrawer-paper": {
      "&::-webkit-scrollbar": {
        display: "none"
      },
    }
  }}>
  <Box sx={{ width: 280, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header Section */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        p: 3,
        m: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.85)',
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontsize: "1rem", color: "white" }}>
                Menu
            </Typography>
        </Box>
            <IconButton 
            onClick={handleMobileMenuToggle}
            sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "black",
                width: 32,
                height: 32,
                borderRadius: "32%",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
            }}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
    </Box>

    {/* Navigation Section */}
    
        <List>
            {navItems.map((item, index) => (
            <React.Fragment key={index}>
                <StyledListItem 
                button={true}
                sx={{
                    mb: 1,
                    borderRadius: 2,
                }}
                >
                <ListItemText 
                    primary={item.label}
                    slotProps={{
                    primary: {
                        sx: {
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'text.primary'
                        }
                    }
                    }}
                />   
                </StyledListItem>
                {index < navItems.length - 1 && <Divider sx={{borderColor: theme.palette.primary.lightmain}} />}
            </React.Fragment>
            ))}
        </List>


      {/* User Profile Section */}
      {user && (
        <Box sx={{ 
          p: 3, 
          borderTop: "1px solid #f0f0f0",
          backgroundColor: "#f9f9f9"
        }}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 3, 
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#fff",
            border: "1px solid #e8e8e8"
          }}>
            <Avatar 
              src={user.avatar}
              sx={{
                width: 48,
                height: 48,
                fontSize: "1.2rem",
                fontWeight: 600
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#333",
                  mb: 0.5
                }}
              >
                {user.name}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{
                  color: "#666",
                  fontSize: "0.85rem",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
          
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<Logout />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
              borderColor: "#d32f2f",
              color: "#d32f2f", 
              "&:hover": {
                backgroundColor: "#fef2f2",
                borderColor: "#d32f2f"
              }
            }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Box>
  </StyledDrawer>
)};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const user = useContext(UserContext);

  const navItems = [
    { label: "Booking", icon: <Home  />, path: "/booking", active: true },
    { label: "Exibition and Events", icon: <Search />, path: "/explore" },
    { label: "Collections", icon: <ViewCarouselIcon />, path: "/collections", badge: "12" },
    { label: "About", icon: <Info />, path: "/about" },
    { label: "Contact", icon: <ContactMail />, path: "/contact" },
  ];

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleNotificationMenuClose = () => setNotificationMenuAnchor(null);
  
  const handleNotificationMenuOpen = (event) => setNotificationMenuAnchor(event.currentTarget);

  return (
    <StyledAppBar>
      <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3, lg: 4 }, justifyContent: "space-between" }}>
        <Logo />
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <DesktopNavigation navItems={navItems} />
        </Box>
        <RightActions 
          user={user} 
          isMobile={isMobile}
          handleMobileMenuToggle={handleMobileMenuToggle}
        />
      </Toolbar>
      {isMobile && <MobileMenu mobileMenuOpen={mobileMenuOpen} handleMobileMenuToggle={handleMobileMenuToggle} navItems={navItems} user={user} />}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>Notifications</MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export const NavbarWithProvider = () => {
  const user = { name: "John Doe", email: "john.doe@example.com", avatar: "/avatar.png" };
  return (
    <UserContext.Provider value={user}>
      <Navbar />
    </UserContext.Provider>
  );
};

export default Navbar;