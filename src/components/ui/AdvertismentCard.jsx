import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

// Custom components
import Button from "./Button";
import { lightTheme, darkTheme } from "../../styles/theme";

function AdvertisementSection({ heading, detail, buttonText, buttonPath, showButton = true, AdditionalDetails }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background
            : "black",
        color: theme.palette.text.secondary,
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1F2937" : "white",
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          {/* Left Side */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 500,
                fontSize: { xs: "1.5rem", md: "3rem" },
                color: theme.palette.mode === "dark" ? "white" : "black",
                lineHeight: 1.2,
              }}
            >
              {heading}
            </Typography>
          </Grid>

          {/* Right Side */}
          <Grid size={{ xs: 12, md: 6 }}>
          {/* Always show detail */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.5rem", md:"1.8rem"},
              color: theme.palette.mode === "dark" ? "white" : "black",
              mb: 3,
            }}
          >
            {detail}
          </Typography>

          {/* Conditionally show button or list */}
          {showButton ? (
            <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={() => navigate(buttonPath)}>
              <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                {buttonText}
              </Typography>
            </Button>
          ) : (
            <Box
              component="ul"
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "black",
                fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"},
                pl: 2,
                mb: 0,
              }}
            >
              {AdditionalDetails?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Box>
          )}
        </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default AdvertisementSection;
