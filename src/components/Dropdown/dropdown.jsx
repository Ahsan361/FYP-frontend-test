// src/components/DropdownMenu.jsx
import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function DropdownMenu ({ dropdownItems = [] }) {
  const theme = useTheme();

  if (!Array.isArray(dropdownItems) || dropdownItems.length === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "72px",
        left: 0,
        right: 0,
        width: "100vw",
        backgroundColor: theme.palette.background.paper,
        color: "text.secondary",
        borderTop: `1px solid ${theme.palette.primary.lightmain}`,
        boxShadow: theme.shadows[8],
        zIndex: 1300,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        px: 6,
        py: 4,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          maxWidth: "1200px",
          width: "100%",
          alignItems: "start",
        }}
      >
        {dropdownItems.map((subItem, subIndex) => (
          <MenuItem
            key={subIndex}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "48px",
              border: `1px solid ${theme.palette.divider}`,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                borderColor: theme.palette.primary.main,
                transform: "translateY(-1px)",
                boxShadow: theme.shadows[2],
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                flex: 1,
                textAlign: "left",
              }}
            >
              {subItem}
            </Typography>
            <ArrowForwardIos
              sx={{
                fontSize: 14,
                color: theme.palette.text.secondary,
                ml: 2,
              }}
            />
          </MenuItem>
        ))}
      </Box>
    </Box>
  );
};

export default DropdownMenu;
