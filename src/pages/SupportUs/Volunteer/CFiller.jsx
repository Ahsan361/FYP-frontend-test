import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function CFiller() {
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
                src="room4.jpg"
                alt="Private Tour"
                style={{ width: "100%" }}
                />
                <Typography variant="body2" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.2rem"}}}>
                    © Benedict Johnson
                </Typography>
                
            </Box>
        </Grid>
        {/* Right Text Section */}
        <Grid size={{sm:12, md:8}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Stack spacing={4}>
                <Typography variant="h4" sx={{ fontSize: {xs:"2rem", md:"4rem"}, fontWeight: "bold" }}>
                    Behind the scenes
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Volunteering opportunities behind the scenes vary according to the work of each department and their current needs.
                </Typography>
                 <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Departmental volunteers help with tasks such as cataloguing objects, evaluating exhibitions and delivering learning programmes.
                </Typography>
                 <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ❛I really enjoy volunteering with the Communities department. I get to see so many interesting things from all over the world. For example, the beautifully made padded jacket from Western China is so practical and warm, and is decorated with wonderful colours. I also love being part of a team and discovering the variety of work that's conducted within the museum.❜
                </Typography>
                 <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ~ Jane, Communities team
                </Typography>
            </Stack>
        </Grid>

    </Grid>

    </ThemeProvider>
    )
}

export default CFiller;






