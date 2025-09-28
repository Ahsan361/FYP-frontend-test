import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function CardsGrid({ categories }) {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 6 } }}>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((item, index) => (
          <Grid size={{xs:12, sm:6, md:4}} key={index}>
            <Box sx={{ textAlign: "center" }}>
              {/* Image */}
              <Box
                component="img"
                src={item.image}
                alt={item.category}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  mb: 2,
                }}
              />

              {/* Category Text */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  fontWeight: 400,
                  textDecoration: item.link ? "underline" : "none",
                  cursor: item.link ? "pointer" : "default",
                }}
                onClick={() => {
                  if (item.link) window.location.href = item.link;
                }}
              >
                {item.category}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardsGrid;
