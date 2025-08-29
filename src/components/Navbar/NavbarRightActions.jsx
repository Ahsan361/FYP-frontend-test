import { 
  Box, 
  IconButton, 
  Avatar, 
  Typography, 
  Stack, 
  useTheme, 
  useMediaQuery, 
  Tooltip 
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Custom components
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

function RightActions({ user, setUser, isMobile, handleMobileMenuToggle, mobileMenuOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();

  // Responsive checks
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    setUser(null); // update state in parent
    navigate("/login"); // redirect to login
  };

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
        // ✅ Logged-in state
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          <Tooltip title="Profile">
            <IconButton aria-label="User profile" sx={{ p: 0 }}>
              <Avatar src={user.avatar}>
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} aria-label="Logout">
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        // ✅ Logged-out state → Sign In button
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
            backgroundColor: mobileMenuOpen
              ? "rgba(0,0,0,0.08)"
              : "rgba(0,0,0,0.04)",
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
