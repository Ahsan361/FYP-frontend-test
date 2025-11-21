import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom components
import Button from "../../../components/ui/Button";

function VediosSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
   

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:{xs:4, md:8}}} spacing={4}>
        {/* Left Text Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Stack spacing={4}>
                <Typography variant="h4" sx={{ fontSize: {xs:"2rem", md:"4rem"}, fontWeight: "bold" }}>
                    Videos for young learners
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                    From History Hotline to Curators Corner, this playlist of short videos brings history to life.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                        The videos cover historical periods taught in school curriculums, so you can watch in the classroom or at home. Don't forget, you can come in and see the objects in person once you've learned all about them!
                </Typography>
                <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                    <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                    Watch the playlist
                    </Typography>
                </Button>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="/room4.jpg"
                alt="Private Tour"
                style={{ width: "70%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Watch a selection of short videos about people, objects and culture from throughout history.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default VediosSection;






