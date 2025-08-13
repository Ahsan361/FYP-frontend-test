import { Box, useTheme, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import DropdownMenu from "../Dropdown/dropdown";
import { NavButton } from "./StyledComponents";

const DesktopNavigation = ({ navItems, openDropdown, setOpenDropdown, anchorEl, setAnchorEl, buttonRefs }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        alignItems: "center",
        gap: 2,
        px: 2,
        position: "relative",
      }}
    >
      {/* Render all nav buttons */}
      {navItems.map((item, index) => {
        const hasDropdown = item.dropdown && item.dropdown.length > 0;
        const isOpen = openDropdown === index;

        return (
          <NavButton
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            startIcon={item.icon}
            endIcon={
              hasDropdown ? (isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />) : null
            }
            onClick={(e) => {
              e.stopPropagation();
              if (hasDropdown) {
                if (isOpen) {
                  setOpenDropdown(null);
                  setAnchorEl(null);
                } else {
                  setOpenDropdown(index);
                  setAnchorEl(buttonRefs.current[index]);
                }
              }
            }}
          >
            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"} }}>
              {item.label}
            </Typography>
          </NavButton>
        );
      })}

      {/* Render dropdown using extracted component */}
      {openDropdown !== null &&
        navItems[openDropdown]?.dropdown &&
        navItems[openDropdown].label !== "Exibition and Events" && (
          <DropdownMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
              setOpenDropdown(null);
            }}
            dropdownItems={navItems[openDropdown].dropdown}
          />
        )}
    </Box>
  );
};

export default DesktopNavigation;