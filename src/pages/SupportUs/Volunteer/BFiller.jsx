import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function BFiller() {
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
                    Hands on desks
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Volunteer-run Hands on desks allow visitors to handle real objects, and to find out more about the collection, through relaxed informal conversations.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Volunteers facilitate the object handling, encourage discussion and answer visitors' questions.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ❛The most enjoyable aspect of volunteering on the Hands on desks is the interaction with the visitors. Every time, I get to talk to different people from all over the world. Through discussions with them, I learn more about the objects.❜
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ❛My favourite memory is when I met a visitor from Turkey and we discussed the Arabic coffee pot. She worked at a museum in Istanbul and was an absolute expert in the objects! So instead of me giving her an introduction, she explained to me the whole history of Turkish coffee. That really made my day!❜
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    ~ Bihe, Islamic World Hands on desk 
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

export default BFiller;






