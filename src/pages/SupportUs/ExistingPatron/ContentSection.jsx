import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function ContentSection() {
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
                    Patrons' content
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    As a Patron of the British Museum, you receive exclusive access to the Museum collection and our team of curators and experts. You also enjoy:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    <strong>Patrons' e-newsletter</strong><br />
                    We send Patrons regular e-newsletters to update you on upcoming events and interesting stories from across the Museum. If you have updated your email address or you aren't receiving the e-newsletter please get in touch by emailing patrons@britishmuseum.org.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    <strong>The British Museum Magazine</strong><br />
                    Published three times a year, the British Museum Magazine is a collection of insightful articles and essays from our world-leading experts on the collection, its history, research and conservation. The magazine also explores our exhibitions programme, provides updates about recent acquisitions and loans, and highlights unexplored objects from our collection. As a Patron, you receive a copy of the British Museum Magazine every season and you can also access over 100 past issues of the British Museum Magazine online(Opens in new window). 
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                   <strong> Patrons' digital content</strong><br />
                    We're proud that British Museum Patrons come from all over the world, but this means you're not always able to travel to the Museum in Bloomsbury to explore the collection in person. As a Patron, you can enjoy exclusive digital content which brings you closer to the collection and our current work wherever you are in the world. Enjoy exclusive Patrons' content and presentations, both live and with our past online events(Opens in new window). We also invite Patrons to enjoy the Museum's past public events programme(Opens in new window).
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

export default ContentSection;






