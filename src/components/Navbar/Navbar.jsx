import React, { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { StyledAppBar } from "./StyledComponents";
import { Toolbar, Box, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Menu as MenuIcon, Close as CloseIcon, Home, Search, Info, ContactMail, Logout } from "@mui/icons-material";

//custom components
import { UserContext } from "../contexts/UserContext";
import NavbarLogo from "./NavbarLogo";
import DesktopNavigation from "./NavbarDestopNavigation";
import RightActions from "./NavbarRightActions";
import MobileMenu from "./NavbarMobileMenu";
import NavbarWithProvider from "./NavbarWithProvider";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useContext(UserContext);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
      setAnchorEl(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Visit", icon: <Home />, path: "/Visit", dropdown: ["Hours & Admission", "Tickets & Pricing", "Guided Tours", "Group Visits", "Accessibility", "Parking Info", "Dining Options", "Gift Shop"], active: true },
    { label: "Exibition and Events", icon: <Search />, path: "/explore" },
    { label: "Collections", icon: <ViewCarouselIcon />, path: "/collections", badge: "12", dropdown: ["Contemporary Art", "Classical Paintings", "Modern Sculptures", "Photography", "Digital Art", "Installations"] },
    { label: "Membership", icon: <Info />, path: "/about", dropdown: ["Individual Membership", "Family Plans", "Student Discounts", "Corporate Benefits", "Membership Renewal", "Exclusive Events", "Member Perks", "Annual Pass", "VIP Access"] },
    { label: "Support Us", icon: <ContactMail />, path: "/contact", dropdown: ["Make a Donation", "Volunteer Programs", "Corporate Sponsorship", "Legacy Giving", "Art Acquisition Fund"] },
  ];

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleNotificationMenuClose = () => setNotificationMenuAnchor(null);
  const handleNotificationMenuOpen = (event) => setNotificationMenuAnchor(event.currentTarget);

  return (
    <StyledAppBar>
      <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3, lg: 4 }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <NavbarLogo />
        <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }} onClick={(e) => e.stopPropagation()}>
          <DesktopNavigation 
            navItems={navItems}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            buttonRefs={buttonRefs}
          />
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

export default Navbar;