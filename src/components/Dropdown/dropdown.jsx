// src/components/DropdownMenu.jsx
import React, {useCallback, useEffect } from "react";
import { Menu, MenuItem, Typography, Grid, Paper } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function DropdownMenu({ 
  anchorEl, 
  open, 
  onClose, 
  dropdownItems = [],
  columns = 4
}) {
  const theme = useTheme();
  // Function to check if anchorEl is valid
  const isAnchorValid = useCallback((element) => {
    if (!element) return false;
    // Check if element is in the DOM and not hidden
    return (
      document.body.contains(element) &&
      element.offsetParent !== null && // Ensures element is not display: none
      getComputedStyle(element).display !== "none"
    );
  }, []);

  // Effect to monitor anchorEl and close menu if invalid
  useEffect(() => {
    if (!open || !anchorEl) return;

    const checkAnchor = () => {
      if (!isAnchorValid(anchorEl)) {
        onClose(); // Close the menu if anchor is invalid
      }
    };

    // Check immediately
    checkAnchor();

    // Set up a resize observer to detect layout changes
    const resizeObserver = new ResizeObserver(checkAnchor);
    if (anchorEl) {
      resizeObserver.observe(document.body); // Observe body for layout changes
    }

    // Optionally, listen for window resize to detect responsive changes
    window.addEventListener("resize", checkAnchor);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkAnchor);
    };
  }, [anchorEl, open, onClose, isAnchorValid]);

  if (!Array.isArray(dropdownItems) || dropdownItems.length === 0) return null;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
            sx: {
            mt: 1,
            width: "100vw", // 600px → 600 / 16 = 37.5rem
            maxWidth: "100vw",   // 800px → 800 / 16 = 50rem
            left: '0 !important', // Force alignment to screen’s left edge
            borderRadius: 0,
            boxShadow: theme.shadows[8],
            border: `1px solid ${theme.palette.divider}`,
            px: 2, // Padding in rem can also be used like px: '1.5rem'
            }
        }
        }}
    >
      <Grid container spacing={1}>
        {dropdownItems.map((subItem, subIndex) => (
          <Grid size ={{ xs:12 / columns}} key={subIndex}>
            <MenuItem
              onClick={onClose}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "44px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "translateX(4px)",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  flex: 1,
                  textAlign: "left",
                  color: theme.palette.text.primary,
                }}
              >
                {subItem}
              </Typography>
              <ArrowForwardIos
                sx={{
                  fontSize: 12,
                  color: theme.palette.text.secondary,
                  ml: 1,
                }}
              />
            </MenuItem>
          </Grid>
        ))}
      </Grid>
    </Menu>
  );
}

export default DropdownMenu;