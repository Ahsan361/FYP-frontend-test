import { LogoContainer } from "./StyledComponents";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const NavbarLogo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // Detect large screens

  return (
    <LogoContainer>
      <Box
        sx={{
          width: isMobile ? "2rem" : isLargeScreen ? "2rem" : "1.5rem", // Responsive logo size
          height: isMobile ? "2rem" : isLargeScreen ? "2rem" : "1.5rem",
          borderRadius: theme.shape.borderRadius, // Use theme-based border radius
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: theme.spacing(isMobile ? 1 : 2), // Smaller margin on mobile
          boxShadow: theme.shadows[4], // Use theme-based shadow
        }}
      >
        <Typography
          variant={isMobile ? "body1" : "h6"} // Smaller variant on mobile
          sx={{
            color: "white",
            fontSize: isMobile ? "0.9rem" : isLargeScreen ? "1.4rem" : "1.2rem", // Responsive font size
            fontWeight: 700,
          }}
        >
          M
        </Typography>
      </Box>
      <Box>
        <Typography
          variant={isMobile ? "h6" : isLargeScreen ? "h4" : "h5"} // Responsive heading size
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          MIRAS
        </Typography>
        <Typography
          variant={isMobile ? "caption" : "body2"} // Smaller text on mobile
          sx={{
            color: theme.palette.text.secondary,
            fontSize: isMobile ? "0.7rem" : isLargeScreen ? "0.9rem" : "0.8rem", // Responsive font size
          }}
        >
          Digital Gallery
        </Typography>
      </Box>
    </LogoContainer>
  );
};

export default NavbarLogo;