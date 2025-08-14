import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function DFiller() {
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
                    Eye-opener tours
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Eye-opener tours introduce visitors to the Museum's collection through a variety of guided talks that take place in different galleries across the Museum. There are 15 tours that run every day on a range of topics.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ❛Since I was an undergraduate archaeology student in Syria, it was one of my dreams to visit the British Museum one day and see the objects that I spent my time studying in books and museum catalogues.❜
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ❛In the beginning, I wasn't sure that I could conduct the Eye-opener tour. However, with the support of the Volunteers' Office and my fellow volunteers, I was able to overcome my worries.❜
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ~ Mohamad, Eye-opener tours
                </Typography>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:4}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="room4.jpg"
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

export default DFiller;






