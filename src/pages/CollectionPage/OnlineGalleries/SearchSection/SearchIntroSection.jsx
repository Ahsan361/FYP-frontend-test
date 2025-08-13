import { Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

function SearchIntroSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Grid 
      container
      sx={{
        minHeight: "auto", 
        pr: { xs: 2, sm: 4, md: 14 },
        pt: { xs: 14, sm: 4, md: 8 },

      }}
    >
      {/* Left Side */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.4rem" },
            fontWeight: 600,
            lineHeight: 1.3,
            textAlign: "center",
            color:"white"
          }}
        >
          Explore the Museum
        </Typography>
      </Grid>

      {/* Right Side */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "center",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.5rem" },
              lineHeight: 1.5,
              textAlign: { xs: "center", sm: "left" },
              color:"white"
            }}
          >
            Welcome to Collection Online. For help and further information,
            read our online guide.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.5rem" },
              lineHeight: 1.5,
              textAlign: { xs: "center", sm: "left" },
              color:"white"
            }}
          >
            The documentation and digitisation of the British Museum collection
            was generously supported by The Headley Trust.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchIntroSection;
