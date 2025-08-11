import { Box, IconButton, Avatar, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Login, Logout } from "@mui/icons-material";

// Custom components
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

function RightActions({ user, isMobile, handleMobileMenuToggle, mobileMenuOpen }) {
  const theme = useTheme();
  // Use MUI's useMediaQuery to detect screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Below 600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px

  return (
    <Stack
      direction="row"
      spacing={{ xs: 0.5, sm: 1, md: 1.5 }} // Responsive spacing
      alignItems="center"
      sx={{
        // Ensure touch-friendly sizes on mobile
        "& .MuiIconButton-root": {
          width: { xs: 40, sm: 44 },
          height: { xs: 40, sm: 44 },
        },
      }}
    >
      <ThemeToggle />
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 }, // Smaller gap on mobile
          }}
        >
          {/* Hide user name on small screens to save space */}
          {!isSmallScreen && (
            <Typography
              variant={isMediumScreen ? "caption" : "body2"} // Smaller text on medium screens
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              {user.name}
            </Typography>
          )}
          <IconButton
            aria-label="User profile"
            sx={{
              p: 0, // Reduce padding for avatar
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                width: { xs: 32, sm: 36, md: 40 }, // Responsive avatar size
                height: { xs: 32, sm: 36, md: 40 },
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="contained"
          startIcon={<Login />}
          size={isSmallScreen ? "small" : "medium"} // Smaller button on mobile
          sx={{
            px: { xs: 1, sm: 2 }, // Adjust padding
            fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font size
          }}
        >
          {isSmallScreen ? "Sign In" : "Sign In"} {/* Optional: Change text if needed */}
        </Button>
      )}
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