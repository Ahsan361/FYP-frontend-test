import { Box, useTheme } from "@mui/material";
import {  Menu as MenuIcon, Close as CloseIcon, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import DropdownMenu from "../Dropdown/dropdown"
import { NavButton } from "./StyledComponents";

const DesktopNavigation = ({ navItems, openDropdown, setOpenDropdown }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        alignItems: "center",
        gap: 2,
        px: 2,
        position: "relative",
        width: "100%",
      }}
    >
      {/* Render all nav buttons */}
      {navItems.map((item, index) => {
        const hasDropdown = item.dropdown && item.dropdown.length > 0;
        const isOpen = openDropdown === index;

        return (
          <Box key={index}>
            <NavButton
              startIcon={item.icon}
              endIcon={
                hasDropdown ? (isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />) : null
              }
              onClick={(e) => {
                e.stopPropagation();
                if (hasDropdown) {
                  setOpenDropdown(isOpen ? null : index);
                }
              }}
              sx={{
                backgroundColor: isOpen
                  ? theme.palette.action.selected
                  : "transparent",
              }}
            >
              {item.label}
            </NavButton>
          </Box>
        );
      })}

      {/* Render dropdown using extracted component */}
      {openDropdown !== null &&
        navItems[openDropdown]?.dropdown &&
        navItems[openDropdown].label !== "Exibition and Events" && (
          <DropdownMenu dropdownItems={navItems[openDropdown].dropdown} />
        )}
    </Box>
  );
};

export default DesktopNavigation;