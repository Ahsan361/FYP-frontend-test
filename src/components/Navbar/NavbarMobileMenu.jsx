import React, {useEffect} from "react";
import { StyledDrawer, StyledListItem } from "./StyledComponents";
import { Box, IconButton, List, ListItemText, Avatar, Typography, useTheme, Divider} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Logout} from "@mui/icons-material";

//custom components
import Button from "../ui/Button";

function MobileMenu ({ mobileMenuOpen, handleMobileMenuToggle, navItems, user }) {
    const theme = useTheme();
    return (
  <StyledDrawer anchor="right" open={mobileMenuOpen} onClose={handleMobileMenuToggle} sx={{
    "& .MuiDrawer-paper": {
      "&::-webkit-scrollbar": {
        display: "none"
      },
    }
  }}>
  <Box sx={{ width: 280, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header Section */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        p: 3,
        m: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.85)',
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontsize: "1rem", color: "white" }}>
                Menu
            </Typography>
        </Box>
            <IconButton 
            onClick={handleMobileMenuToggle}
            sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "black",
                width: 32,
                height: 32,
                borderRadius: "32%",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
            }}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
    </Box>

    {/* Navigation Section */}
    
        <List>
            {navItems.map((item, index) => (
            <React.Fragment key={index}>
                <StyledListItem 
                button={true}
                sx={{
                    mb: 1,
                    borderRadius: 2,
                }}
                >
                <ListItemText 
                    primary={item.label}
                    slotProps={{
                    primary: {
                        sx: {
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'text.primary'
                        }
                    }
                    }}
                />   
                </StyledListItem>
                {index < navItems.length - 1 && <Divider sx={{borderColor: theme.palette.primary.lightmain}} />}
            </React.Fragment>
            ))}
        </List>


      {/* User Profile Section */}
      {user && (
        <Box sx={{ 
          p: 3, 
          borderTop: "1px solid #f0f0f0",
          backgroundColor: "#f9f9f9"
        }}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 3, 
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#fff",
            border: "1px solid #e8e8e8"
          }}>
            <Avatar 
              src={user.avatar}
              sx={{
                width: 48,
                height: 48,
                fontSize: "1.2rem",
                fontWeight: 600
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#333",
                  mb: 0.5
                }}
              >
                {user.name}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{
                  color: "#666",
                  fontSize: "0.85rem",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
          
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<Logout />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
              borderColor: "#d32f2f",
              color: "#d32f2f", 
              "&:hover": {
                backgroundColor: "#fef2f2",
                borderColor: "#d32f2f"
              }
            }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Box>
  </StyledDrawer>
)};

export default MobileMenu;