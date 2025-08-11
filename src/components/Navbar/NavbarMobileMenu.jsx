import React, { useEffect, useState } from "react";
import { StyledDrawer, StyledListItem } from "./StyledComponents";
import { 
  Box, 
  IconButton, 
  List, 
  ListItemText, 
  Avatar, 
  Typography, 
  useTheme, 
  Divider, 
  Collapse, 
  ListItemIcon 
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Close as CloseIcon, 
  Logout, 
  ExpandMore, 
  ExpandLess, 
  ArrowForwardIos 
} from "@mui/icons-material";

//custom components
import Button from "../ui/Button";

function MobileMenu({ mobileMenuOpen, handleMobileMenuToggle, navItems, user }) {
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState({});

  // Reset expanded items when menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setExpandedItems({});
    }
  }, [mobileMenuOpen]);

  const handleItemToggle = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <StyledDrawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "80vw", sm: 280, md: 320 },
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 2, sm: 3 },
            m: 0,
            backgroundColor: "rgba(17, 24, 39, 0.85)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontSize: "1rem", color: "white" }}>
              Menu
            </Typography>
          </Box>
          <IconButton
            onClick={handleMobileMenuToggle}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "black",
              width: "2rem",
              height: "2rem",
              borderRadius: "32%",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Navigation Section */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <List sx={{ py: 1 }}>
            {navItems.map((item, index) => {
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              const isExpanded = expandedItems[index];

              return (
                <React.Fragment key={index}>
                  {/* Main Navigation Item */}
                  <StyledListItem
                    button={true}
                    onClick={() => (hasDropdown ? handleItemToggle(index) : null)}
                    sx={{
                      mb: 0.5,
                      borderRadius: 2,
                      minHeight: 48,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                        transform: "translateX(4px)",
                      },
                      ...(isExpanded && {
                        backgroundColor: theme.palette.primary.main + "10",
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                      }),
                    }}
                  >
                    {/* Icon */}
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isExpanded ? theme.palette.primary.main : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {/* Label */}
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: "1rem",
                            fontWeight: isExpanded ? 600 : 500,
                            color: isExpanded ? theme.palette.primary.main : "text.primary",
                            transition: "all 0.2s ease",
                          },
                        },
                      }}
                    />

                    {/* Dropdown Indicator */}
                    {hasDropdown && (
                      <IconButton
                        size="small"
                        sx={{
                          ml: 1,
                          color: isExpanded ? theme.palette.primary.main : "text.secondary",
                          transition: "all 0.3s ease",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <ExpandMore fontSize="small" />
                      </IconButton>
                    )}
                  </StyledListItem>

                  {/* Dropdown Items */}
                  {hasDropdown && (
                    <Collapse in={isExpanded} timeout={300} unmountOnExit>
                      <List
                        sx={{
                          pl: 2,
                          py: 0,
                          backgroundColor:
                            theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
                          borderRadius: 1,
                          mx: 1,
                          mb: 1,
                        }}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <StyledListItem
                            key={subIndex}
                            button={true}
                            sx={{
                              py: 1,
                              px: 2,
                              borderRadius: 1,
                              minHeight: 40,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                                transform: "translateX(8px)",
                                pl: 3,
                              },
                            }}
                          >
                            {/* Sub-item Icon */}
                            <ListItemIcon sx={{ minWidth: 30, opacity: 0.6 }}>
                              <ArrowForwardIos sx={{ fontSize: "0.75rem", color: "text.secondary" }} />
                            </ListItemIcon>

                            {/* Sub-item Text */}
                            <ListItemText
                              primary={subItem}
                              slotProps={{
                                primary: {
                                  sx: {
                                    fontSize: "0.875rem",
                                    fontWeight: 400,
                                    color: "text.secondary",
                                    lineHeight: 1.4,
                                  },
                                },
                              }}
                            />
                          </StyledListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}

                  {/* Divider */}
                  {index < navItems.length - 1 && (
                    <Divider
                      sx={{
                        borderColor: theme.palette.primary.lightmain,
                        mx: 2,
                        my: 1,
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>

        {/* User Profile Section */}
        {user && (
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderTop: "1px solid #f0f0f0",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#fff",
                border: "1px solid #e8e8e8",
              }}
            >
              <Avatar
                src={user.avatar}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.2rem",
                  fontWeight: 600,
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
                    mb: 0.5,
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
                    whiteSpace: "nowrap",
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
                  borderColor: "#d32f2f",
                },
              }}
            >
              Sign Out
            </Button>
          </Box>
        )}
      </Box>
    </StyledDrawer>
  );
}

export default MobileMenu;