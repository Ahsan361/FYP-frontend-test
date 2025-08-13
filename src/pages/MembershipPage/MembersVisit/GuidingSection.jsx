import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function GuidingSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
   

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:{xs:4, md:8}}} spacing={4}>
        {/* Left Text Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Typography variant="h4" sx={{ fontSize: {xs:"2rem", md:"4rem"}, fontWeight: "bold" }}>
            Entering the Museum
            </Typography>

            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Members no longer need to join queues that develop outside the Museum gates. Instead, you can go straight to the front of the queue, show your valid Membership card – or confirmation email if you've joined recently – and security colleagues will guide you to the Members' lane (leading to the security tent). This procedure will be in place at both entrances, but we recommend that you use the Main entrance on Great Russell Street for the quickest possible access.
            </Typography>

            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Please note that our security team will ask at the entrance to see your Membership card or confirmation email. The number of Members and guests eligible to skip the queue will correspond with the total on your Membership card or confirmation email – Admits 1 or Admits 2. Members can still get expedited entry for up to four children under the age of 16. If your Membership card has expired you won't be able to skip the queue. 
            </Typography>
            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                If your card has expired, or if you have any other queries, please contact the Membership office before your visit and we'll be happy to help.
            </Typography>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="room4.jpg"
                alt="Private Tour"
                style={{ width: "70%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Aerial photograph of the British Museum building.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default GuidingSection;






