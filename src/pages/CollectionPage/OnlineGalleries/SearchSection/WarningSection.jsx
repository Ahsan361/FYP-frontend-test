import { Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

function WarningSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Grid
      container
      sx={{
        px: { xs: 2, sm: 4, md: 14 },
        pl: { xs: 2, sm: 4, md: 24 },
        minHeight: "auto",
      }}
    >
      {/* Left Column - Heading */}
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
            fontWeight: 700,
            lineHeight: 1.3,
            textAlign: { xs: "center", md: "left" },
            color:"white"
          }}
        >
          Content Warning
        </Typography>
      </Grid>

      {/* Right Column - Description */}
      <Grid
        size={{ xs: 12, md: 10 }}
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
            maxWidth: "1000px",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.5rem" },
              lineHeight: 1.6,
              textAlign: { xs: "center", md: "left" },
              color:"white"
            }}
          >
            This working database includes information generated over more than
            250 years of the Museum's history. Some of the collection, or the
            records that describe it, may include culturally sensitive content,
            or language, practices, or attitudes that the Museum would no
            longer consider appropriate. We are committed to addressing these
            issues. You can suggest general improvements by emailing{" "}
            <strong>collectiondatabase@britishmuseum.org</strong> or give
            specific feedback through the link at the bottom of each record,
            which will be reviewed by the relevant department.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default WarningSection;
