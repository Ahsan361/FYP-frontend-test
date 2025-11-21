import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";

//my custom components
import { lightTheme, darkTheme } from '../../../styles/theme';

function VolunteerReasoningSection() {
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
                        Why Volunteer?
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Here are some of the benefits of volunteering at the British Museum:
                </Typography>
                <Typography component="div" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}, pl:4}}>
                    <ul>
                        <li>Meet people from around the world</li>
                        <li>Learn about world cultures</li>
                        <li>Make new friends</li>
                        <li>Share your passion and enthusiasm</li>
                        <li>Learn new skills</li>
                        <li>Become part of a supportive team and community</li>
                        <li>Access to exclusive events and training for volunteers</li>
                        <li>Enjoy the Museum and its collection</li>
                        <li>Read the British Museum's:</li>
                    </ul>
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
                    Visitors learning about coins. © Benedict Johnson
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default VolunteerReasoningSection;






