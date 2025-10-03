import { Menu as MenuIcon, Close as CloseIcon, Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";

// Custom components
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

//api service
import { getProfile, updateUser } from "../../services/userService";

function RightActions({ user, setUser, isMobile, handleMobileMenuToggle, mobileMenuOpen }) {
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // State for profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleViewDashboard = () => {
    if (user.role === "user") {
      navigate("/userDashboard");
    } else {
      navigate("/adminDashboard");
    }
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    setUser(null); // update state in parent
    navigate("/login"); // redirect to login
    handleMenuClose();
  };

  useEffect(() => {
    // Check if user exists and has a token before making the API call
    if (!user || !user.token) return;

    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.token);
        setUserData(profileData);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, [user?.token]); // Use optional chaining in dependency array too

  return (
    <Stack
      direction="row"
      spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
      alignItems="center"
      sx={{
        "& .MuiIconButton-root": {
          width: { xs: 40, sm: 44 },
          height: { xs: 40, sm: 44 },
        },
      }}
    >
      <ThemeToggle />

      {user ? (
        // Logged-in state (both regular user and guest user)
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          <Tooltip title="Profile">
            <IconButton
              onClick={handleProfileClick}
              aria-label="User profile"
              sx={{ p: 0 }}
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={userData?.profileImage.url || user.avatar}>
                {userData?.profileImage.url ? "" : user.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "user-profile-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 2,
                boxShadow: theme.shadows[8],
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleViewProfile}>
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleViewDashboard}>
              <Typography variant="body2">View Dashboard</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography variant="body2" color="error.main">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        // Logged-out state → Sign In button
        <Button
          variant="contained"
          startIcon={<Login />}
          size={isSmallScreen ? "small" : "medium"}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      )}

      {/* Mobile menu toggle */}
      {isMobile && (
        <IconButton
          onClick={handleMobileMenuToggle}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          sx={{
            borderRadius: "12px",
            backgroundColor: mobileMenuOpen ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.12)",
            },
          }}
        >
          {mobileMenuOpen ? (
            <CloseIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          ) : (
            <MenuIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          )}
        </IconButton>
      )}
    </Stack>
  );
}

export default RightActions;