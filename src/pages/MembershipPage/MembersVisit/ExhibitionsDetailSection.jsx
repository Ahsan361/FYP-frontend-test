import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function ExhibitionsDetailSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:{xs:4, md:8}}} spacing={4}>
        {/* Left Text Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Typography variant="h4" sx={{ fontSize: {xs:"2rem", md:"4rem"}, fontWeight: "bold" }}>
                Exhibitions
            </Typography>

            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Members get unlimited entry to all special exhibitions.
            </Typography>

            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Hiroshige: artist of the open road showcases the work of 19th century Japanese artist Utagawa Hiroshige (until 7 September 2025), featuring fashionable figures and energetic city views, remote landscapes and impressions of the natural world.
            </Typography>
            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Ancient India: living traditions (until 19 October 2025) is a major exhibition exploring the origins of Hindu, Jain and Buddhist sacred art in the ancient and powerful nature spirits of India, and the spread of this art beyond the subcontinent.
            </Typography>
            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Members can also look forward to two further exhibitions within the next 12 months.
            </Typography>
            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                Please visit the Membership FAQs page for more information on visiting the Museum.
            </Typography>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:6}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="/room4.jpg"
                alt="Private Tour"
                style={{ width: "70%" }}
                />
                <Typography variant="body2" sx={{ mt: 1, paddingRight:{xs:6, md:12}, paddingLeft:{xs:6, md:12}}}>
                    Hiroshige: artist of the open road offers a rare chance to see the artist's visually stunning prints depicting Edo Japan, exploring the natural beauty of the landscape and the pleasures of urban life.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default ExhibitionsDetailSection;






