import React, { useCallback, useEffect } from "react";
import { Menu, MenuItem, Typography, Grid, Box, Divider } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function DropdownMenu({ anchorEl, open, onClose, dropdownItems = [] }) {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize navigate

  const isAnchorValid = useCallback((element) => {
    if (!element) return false;
    return (
      document.body.contains(element) &&
      element.offsetParent !== null &&
      getComputedStyle(element).display !== "none"
    );
  }, []);

  useEffect(() => {
    if (!open || !anchorEl) return;

    const checkAnchor = () => {
      if (!isAnchorValid(anchorEl)) {
        onClose();
      }
    };

    checkAnchor();
    const resizeObserver = new ResizeObserver(checkAnchor);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", checkAnchor);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkAnchor);
    };
  }, [anchorEl, open, onClose, isAnchorValid]);

  if (!dropdownItems.length) return null;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            width: "100vw",
            maxWidth: "100%",
            left: "0 !important",
            borderRadius: 0,
            boxShadow: theme.shadows[8],
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            py: 2,
          },
        },
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 4, md: 20 } }}>
        <Grid container spacing={2}>
          {dropdownItems.map((subItem, subIndex) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subIndex}>
              <MenuItem
                onClick={() => {
                  if (subItem.path) {
                    navigate(subItem.path); // Navigate to the sub-item path
                    onClose(); // Close the dropdown
                  }
                }}
                sx={{
                  px: 2,
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: "44px",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 500,
                    flex: 1,
                    textAlign: "left",
                    color: theme.palette.text.primary,
                  }}
                >
                  {subItem.label}
                </Typography>
                <ArrowForwardIos
                  sx={{
                    fontSize: 28,
                    color: theme.palette.text.secondary,
                    ml: 1,
                  }}
                />
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Menu>
  );
}

export default DropdownMenu;