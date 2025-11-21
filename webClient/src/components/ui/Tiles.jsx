// ArtifactCard.jsx (Updated for responsiveness)
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../../styles/theme";
import Button from "./Button";

function Tiles({ title, image, artifactName, artifactDetail, buttonText, onButtonClick }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: 2, md: 6 },
        py: { xs: 3, md: 4 },
        backgroundColor: theme.palette.mode === "dark" ? "#1F2937" : "white",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Image */}
        <Grid size={{ xs:12, md:3}}>
          <Box
            component="img"
            src={image}
            alt={artifactName}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: { xs: 200, md: 250 },
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
        </Grid>

        {/* Text Content */}
        <Grid size={{xs:12, md:7}}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              color: theme.palette.mode === "dark" ? "white" : "black",
            }}
          >
            {artifactName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              fontStyle: "italic",
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
              color: theme.palette.text.secondary,
            }}
          >
            {artifactDetail}
          </Typography>
        </Grid>

        {/* Button */}
        <Grid size={{ xs:12, md:2}} display="flex" justifyContent={{ xs: "flex-start", md: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
            }}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Tiles;
