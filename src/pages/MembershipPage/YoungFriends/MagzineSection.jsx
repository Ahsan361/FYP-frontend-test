import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom components
import Button from "../../../components/ui/Button";

function MagzineSection() {
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
                    Read Remus magazine
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                    Remus is the magazine created especially for young history fans. With three new issues each year and an archive of over 60 magazines, it's a treasure trove of fascinating facts and fun activities.
                </Typography>
                <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                    <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                        Explore the archive
                    </Typography>
                </Button>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="/room2.png"
                alt="Private Tour"
                style={{ width: "70%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    A glimpse inside the pages of Remus magazine.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default MagzineSection;






