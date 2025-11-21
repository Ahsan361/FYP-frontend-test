import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";

//my custom components
import { lightTheme, darkTheme } from '../../../styles/theme';

function BFiller() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
   
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:{xs:4, md:8}}} spacing={4}>
        {/* left Image Section */}
        <Grid size={{sm:12, md:4}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="/room4.jpg"
                alt="Private Tour"
                style={{ width: "100%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Collection Care student takes a dust sample from the base of the totem pole in the Great Court.
                </Typography>
            </Box>
        </Grid>
        {/* Right Text Section */}
        <Grid size={{sm:12, md:8}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Stack spacing={4}>
                <Typography variant="h4" sx={{ fontSize: {xs:"2rem", md:"4rem"}, fontWeight: "bold" }}>
                    Caring for the collection
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Conserving the eight million objects at the Museum is an ongoing and vital part of the Museum's work – and donations help safeguard the collection for future generations.
                </Typography>
            </Stack>
        </Grid>

    </Grid>

    </ThemeProvider>
    )
}

export default BFiller;






