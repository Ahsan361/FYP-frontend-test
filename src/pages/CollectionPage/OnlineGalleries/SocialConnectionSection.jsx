import { Box, Typography, Breadcrumbs, Link, Stack, IconButton, } from "@mui/material";
import { useSelector } from "react-redux";
import { Facebook, Twitter, Email, WhatsApp } from "@mui/icons-material";
import { lightTheme, darkTheme } from "../../../styles/theme";

function SocialConnectionSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    
    return(
    <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          px: { xs: 2, sm: 4, md: 6 },
          py: 2,
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Breadcrumbs separator="›">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Collection</Typography>
        </Breadcrumbs>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" fontWeight={600}>
            Share the page
          </Typography>
          {[Facebook, Twitter, Email, WhatsApp].map((Icon, index) => (
            <IconButton key={index} color="primary">
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </Box>
    )
}
export default SocialConnectionSection;