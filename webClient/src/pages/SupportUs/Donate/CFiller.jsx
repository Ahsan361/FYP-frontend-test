import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";

//my custom components
import { lightTheme, darkTheme } from '../../../styles/theme';

function AFiller() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
   

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:{xs:4, md:8}}} spacing={4}>
        {/* Left Text Section */}
        <Grid size={{sm:12, md:8}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Stack spacing={4}>
                <Typography variant="h4" sx={{ fontSize: {xs:"2rem", md:"4rem"}, fontWeight: "bold" }}>
                    Bringing the Collection to more people
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    From loaning objects to museums nationwide to community outreach and from relaxed events for the learning disabled to free family activities, donations help us to share the Collection with more people, in more ways.
                </Typography>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:4}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="/room4.jpg"
                alt="Private Tour"
                style={{ width: "100%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Young visitor taking part in a Hands on desks session. © Benedict Johnson.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default AFiller;






