// navbar/NavbarRightActions.jsx
import { Menu as MenuIcon, Close as CloseIcon, Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
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
  Badge,
  Divider,
} from "@mui/material";
import { ShoppingCart, Plus, Package, Store, Settings, LayoutDashboard, LogOut  } from "lucide-react";

// Custom components
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

// Contexts
import { CartContext } from "../../contexts/CartContext";

//api service
import { getProfile } from "../../services/userService";

function RightActions({ user, setUser, isMobile, handleMobileMenuToggle, mobileMenuOpen }) {
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { getCartCount } = useContext(CartContext);

  // State for profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [sellerMenuAnchor, setSellerMenuAnchor] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSellerMenuOpen = (event) => {
    setSellerMenuAnchor(event.currentTarget);
  };

  const handleSellerMenuClose = () => {
    setSellerMenuAnchor(null);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleMyOrders = () => {
    navigate("/marketplace/my-orders");
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    handleMenuClose();
  };

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.token);
        setUserData(profileData);
        
        // Update user context with latest data including stripeAccountId
        if (profileData.stripeAccountId && !user.stripeAccountId) {
          setUser((prev) => ({ ...prev, stripeAccountId: profileData.stripeAccountId }));
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, [user?.token]);

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

      {/* ============ MARKETPLACE: Cart Icon ============ */}
      {!isMobile && (
        <Tooltip title="Shopping Cart">
          <IconButton
            onClick={() => navigate("/cart")}
            aria-label="Shopping cart"
            sx={{
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingCart size={20} />
            </Badge>
          </IconButton>
        </Tooltip>
      )}

      {user ? (
        // Logged-in state
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          <Button
          variant="contained"
          size="small"
          startIcon={<Store size={16} />}
          onClick={() => navigate("/marketplace")}
          sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
        >
          Buy
        </Button>
          {/* User Profile Avatar */}
          <Tooltip title="Profile">
            <IconButton
              onClick={handleProfileClick}
              aria-label="User profile"
              sx={{ p: 0 }}
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={userData?.profileImage?.url || user.avatar}>
                {userData?.profileImage?.url ? "" : user.username?.charAt(0).toUpperCase()}
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
              <Settings size={18} style={{ marginRight: 8 }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleViewDashboard}>
              <LayoutDashboard size={18} style={{ marginRight: 8 }} />
              <Typography variant="body2">View Dashboard</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMyOrders}>
              <Package size={18} style={{ marginRight: 8 }} />
              <Typography variant="body2">My Orders</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate('/seller/onboarding'); handleMenuClose(); }}>
              <Store size={18} style={{ marginRight: 8 }} />
              <Typography variant="body2">Become a Seller</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogOut size={18} style={{ marginRight: 8 }} />
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