import { LogoContainer } from "./StyledComponents";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes"; 

const NavbarLogo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(routes.home); // Navigate to landing page ("/")
  };

  return (
    <LogoContainer onClick={handleLogoClick} >
      <Box
        sx={{
          width: isMobile ? "2rem" : isLargeScreen ? "2.5rem" : "2.5rem", // Responsive logo size
          height: isMobile ? "2rem" : isLargeScreen ? "2.5rem" : "2.5rem",
          borderRadius: "0.1rem",
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
            fontSize: isMobile ? "1.5rem" : isLargeScreen ? "2.4rem" : ".2rem", // Responsive font size
            fontWeight: 700,
          }}
        >
          M
        </Typography>
      </Box>
      <Box>
        <Typography
          variant={isMobile ? "h6" : isLargeScreen ? "h5" : "h6"}
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: isMobile ? "1.1rem" : isLargeScreen ? "1.4rem" : "1.2rem",
            fontFamily: "'Playfair Display', serif", // Elegant font for brand
            letterSpacing: "0.05em",
          }}
        >
          MIRAS
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: isMobile ? "0.7rem" : isLargeScreen ? "0.9rem" : "0.8rem",
            fontFamily: "'Roboto', sans-serif",

            opacity: 0.8,
          }}
        >
          Digital Gallery
        </Typography>
      </Box>
    </LogoContainer>
  );
};

export default NavbarLogo;