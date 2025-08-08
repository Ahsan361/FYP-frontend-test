import { Box, IconButton, Avatar, Typography, Stack, useTheme } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Login, Logout } from "@mui/icons-material";
//custom components
import ThemeToggle  from "../ui/ThemeToggle";
import Button from "../ui/Button";

function RightActions 
 ({ user , isMobile, handleMobileMenuToggle }) {
  const theme = useTheme();
  return (
   <Stack direction="row" spacing={1.5} alignItems="center">
      <ThemeToggle />
      {user ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
          <IconButton>
            <Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>
          </IconButton>
        </Box>
      ) : (
        <Button variant="contained" startIcon={<Login />}>Sign In</Button>
      )}
      {isMobile && (
        <IconButton
          onClick={handleMobileMenuToggle}
          sx={{ width: 44, height: 44, borderRadius: "12px", backgroundColor: "rgba(0,0,0,0.04)" }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default RightActions;