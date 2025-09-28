import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import Button from "./Button";
import { lightTheme, darkTheme } from "../../styles/theme";

function DynamicAdvertisementSection({ 
  heading, 
  detail, 
  buttonText, 
  showButton = true, 
  AdditionalDetails, 
  backgroundImage
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <Box
      sx={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: { xs: "400px", md: "600px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 6 },
        color: theme.palette.mode === "dark" ? "white" : "black",
      }}
    >
      <Box
        sx={{
          backgroundColor: darkMode 
            ? "rgba(0, 0, 0, 0.6)"   // semi-transparent dark box in dark mode
            : "rgba(255, 255, 255, 0.6)", // semi-transparent light box in light mode
          borderRadius: 2,
          p: { xs: 3, md: 5 },
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          maxWidth: "600px",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "1.8rem", md: "3rem" },
            lineHeight: 1.2,
            mb: 3,
          }}
        >
          {heading}
        </Typography>

        {/* Detail Text */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.4rem" },
            mb: 3,
            lineHeight: 1.4,
          }}
        >
          {detail}
        </Typography>

        {/* Button or Additional Details */}
        {showButton ? (
          <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1.2rem" } }}>
              {buttonText}
            </Typography>
          </Button>
        ) : (
          <Box component="ul" sx={{ pl: 2 }}>
            {AdditionalDetails?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DynamicAdvertisementSection;
