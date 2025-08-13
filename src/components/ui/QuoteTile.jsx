import { CssBaseline, ThemeProvider, Typography, Grid } from "@mui/material";
import { lightTheme, darkTheme } from "../../styles/theme";
import { useSelector } from "react-redux";

function QuoteTile({ quote, author }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ py: 2 }}>
        <Grid
          size={{ xs: 12, sm: 12, md: 12 }}
          sx={{
            height: "100%",
            backgroundColor:
              theme.palette.mode === "dark" ? "#1F2937" : "black",
            p: { xs: 2, sm: 4, md: 8 },
            color: "white",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
              lineHeight: 1.5,
              mb: 2,
            }}
          >
            ❛{quote}❜
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem" },
              lineHeight: 1.5,
            }}
          >
            ~ {author}
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default QuoteTile;
