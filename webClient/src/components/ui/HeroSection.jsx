import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Box, Typography, Breadcrumbs, Link, Stack } from "@mui/material";
import { Facebook, Twitter, Email, WhatsApp, Info as InfoIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";

// Custom components
import { lightTheme, darkTheme } from "../../styles/theme";
import Button from "./Button";
import AnimatedIconButton from "./AnimatedIconButton";

function HeroSection({ heading, buttonText, description, imageUrl, showButton = true }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "50vh", md: "90vh" },
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, md: 0 },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: 16,
            bottom: 16,
            zIndex: 3,
          }}
        >
          <AnimatedIconButton
            icon={<InfoIcon fontSize="large" />}
            sx={{
              backgroundColor: "transparent",
              color: theme.palette.mode === "dark" ? theme.palette.primary.main : "white",
              transition: "color 0.2s ease-in-out",
              "&:hover": {
                color: theme.palette.primary.dark,
              },
            }}
            onClick={() => setShowDetails((prev) => !prev)}
            aria-label="Show image details"
          />
        </Box>

        {/* Details Panel */}
        {showDetails && (
          <Box
            sx={{
              position: "absolute",
              right: 16,
              bottom: 70,
              background: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.57)",
              color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 250,
              zIndex: 3,
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {description}
            </Typography>
          </Box>
        )}
        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: { xs: "100%", sm: "500px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            color="white"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            {heading}
          </Typography>
          {showButton && (
            <Button
              variant="contained"
              size="large"
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </Box>

      {/* Breadcrumb + Share */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          px: { xs: 2, sm: 4, md: 6 },
          pt: { xs: 2, sm: 4, md: 2 },
          pb: { xs: 2, sm: 4, md: 14 },
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator="›"
          sx={{
            mb: { xs: 2, sm: 0 },
            "& .MuiBreadcrumbs-separator": {
              color: theme.palette.text.secondary,
            },
          }}
        >
          <Link
            underline="hover"
            color={theme.palette.text.secondary}
            href="/"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.5rem" },
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          <Typography
            color="text.primary"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.5rem" },
              fontWeight: 600,
            }}
          >
            Visit
          </Typography>
        </Breadcrumbs>

        {/* Share Icons */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "0.85rem", sm: "1rem", md:"1.5rem" },
            }}
          >
            Share the page
          </Typography>
          {[
          { Icon: Facebook, label: "Facebook" },
          { Icon: Twitter, label: "Twitter" },
          { Icon: Email, label: "Email" },
          { Icon: WhatsApp, label: "WhatsApp" },
        ].map(({ Icon, label }, index) => (
          <AnimatedIconButton
            key={index}
            icon={
              <Icon
                sx={{
                  fontSize: { xs: 18, sm: 24, md: 32 } // responsive sizes
                }}
              />
            }
            size="small"
            color="primary"
            sx={{
              transition: "color 0.2s ease-in-out",
              "&:hover": {
                color: theme.palette.primary.dark,
              },
            }}
            aria-label={`Share on ${label}`}
          />
        ))}

        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default HeroSection;