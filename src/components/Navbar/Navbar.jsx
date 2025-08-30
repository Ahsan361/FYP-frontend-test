import React, { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { StyledAppBar } from "./StyledComponents";
import { Toolbar, Box, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Menu as MenuIcon, Close as CloseIcon, Home, Search, Info, ContactMail, Logout } from "@mui/icons-material";

//custom components
import { UserContext } from "../../contexts/UserContext";
import NavbarLogo from "./NavbarLogo";
import DesktopNavigation from "./NavbarDestopNavigation";
import RightActions from "./NavbarRightActions";
import MobileMenu from "./NavbarMobileMenu";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useContext(UserContext);
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
    {
    label: "Visit",
    icon: <Home />,
    path: "/PlanVisitPage",
    active: true,
    dropdown: [
      { label: "Plan your visit", path: "/PlanVisitPage" },
      { label: "Family Visit", path: "/PlanVisitPage/family" },
      { label: "Group Visit", path: "/PlanVisitPage/group" },
      { label: "Object Trail", path: "/PlanVisitPage/object-trail" },
      { label: "Out of hour tours", path: "/PlanVisitPage/tours" },
      { label: "Museum Map", path: "/PlanVisitPage/map" },
    ],
  },
  {
    label: "Exhibition and Events",
    icon: <Search />,
    path: "/explore",
  },
  {
    label: "Collections",
    icon: <ViewCarouselIcon />,
    path: "/collections",
    badge: "12",
    dropdown: [
      { label: "Galleries", path: "/collections/galleries" },
      { label: "Online Collections", path: "/collections/online" },
    ],
  },
  {
    label: "Membership",
    icon: <Info />,
    path: "/about",
    dropdown: [
      { label: "Become Member", path: "/membership/become-member" },
      { label: "Existing Members", path: "/membership/existing" },
      { label: "Members Visit", path: "/membership/visit" },
      { label: "Young Friends", path: "/membership/young-friends" },
    ],
  },
  {
    label: "Support Us",
    icon: <ContactMail />,
    path: "/contact",
    dropdown: [
      { label: "Corporate Support", path: "/support/corporate" },
      { label: "Donate", path: "/support/donate" },
      { label: "Existing Patron", path: "/support/existing-patron" },
      { label: "Patron", path: "/support/patron" },
      { label: "Volunteer", path: "/support/volunteer" },
    ],
  },
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
          setUser={setUser} 
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