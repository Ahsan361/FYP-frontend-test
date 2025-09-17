// src/components/dashboard/UserDashboardHeader.jsx
import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import NavbarLogo from "../../components/Navbar/NavbarLogo";
import RightActions from "../../components/Navbar/NavbarRightActions";

function UserDashboardHeader({ user, setUser, mobileMenuOpen, handleMobileMenuToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      color="default"
      elevation={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: 100, 
      }}
    >
      <Toolbar
        sx={{
          height: "100%", // Fill full AppBar height
        px: { xs: 2, sm: 3, lg: 4 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // Keep content centered vertically
        }}
      >
        {/* Left: Logo */}
        <NavbarLogo />

        {/* Center: Empty Box (to keep same spacing style as main navbar) */}
        <Box sx={{ flex: 1 }} />

        {/* Right: Actions */}
        <RightActions
          user={user}
          setUser={setUser}
          isMobile={isMobile}
          handleMobileMenuToggle={handleMobileMenuToggle}
          mobileMenuOpen={mobileMenuOpen}
        />
      </Toolbar>
    </AppBar>
  );
}

export default UserDashboardHeader;
