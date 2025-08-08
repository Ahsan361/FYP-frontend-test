
import { LogoContainer } from "./StyledComponents";
import { Box, Typography, useTheme } from "@mui/material";

const NavbarLogo = () => {
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

export default NavbarLogo;