import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  useMediaQuery,
  List,
  ListItem,
  Link
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../../styles/theme";

function ListCard({ title, items }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [expanded, setExpanded] = useState([]); // Changed to array to track multiple open accordions

  const handleToggle = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded
        ? [...prev, panel] // Add panel ID to array if expanded
        : prev.filter((id) => id !== panel) // Remove panel ID if collapsed
    );
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "transparent !important",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 8 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        sx={{
          fontWeight: 700,
          mb: 2,
          textAlign: { xs: "center", sm: "left" },
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>

      {items.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded.includes(item.id)} 
          onChange={handleToggle(item.id)}
          sx={{
            backgroundColor: "transparent",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary sx={{ px: 0, backgroundColor: "transparent" }}>
            <Box display="flex" alignItems="center">
              {expanded.includes(item.id) ? (
                <CloseIcon
                  sx={{ transition: "transform 0.3s", fontSize: 24, mr: 1 }}
                />
              ) : (
                <AddIcon
                  sx={{ transition: "transform 0.3s", fontSize: 24, mr: 1 }}
                />
              )}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1rem", sm: "2rem" }
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, py: 0, backgroundColor: "transparent" }}>
            <List
              sx={{
                pl: { xs: 6, sm: 6, md: 8 },
                backgroundColor: "transparent",
                pt: 0,
              }}
            >
              {item.details.map((detail, i) => {
                const isNoBullet = typeof detail === "object" && detail.noBullet;
                const textContent =
                  typeof detail === "string" || React.isValidElement(detail)
                    ? detail
                    : detail.text;

                return (
                  <ListItem
                    key={i}
                    sx={{
                      display: isNoBullet ? "block" : "list-item",
                      listStyleType: isNoBullet ? "none" : "disc",
                      py: 0.5,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "1.2rem" },
                        fontWeight: 400,
                      }}
                    >
                      {textContent}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default ListCard;