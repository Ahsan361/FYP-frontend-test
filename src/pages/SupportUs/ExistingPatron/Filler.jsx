import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function Filler() {
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
                    How your money helps
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    The generous donations made by our Patrons provide much-needed support to the Museum, facilitating the allocation of resources to the areas most in need. The Museum is committed to conserving and sharing the two million years of human history and culture within its walls; ensuring it remains a museum of the world for the world. 
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>                
                    The Museum is a charity and the vital donations made by our Patrons go towards supporting the Museum across many different areas and making sure that we are able to remain accessible and open to public audiences from across the world. This can include contributing to the care, preservation and display of the collection, as well as enabling the Museum to invest in ground-breaking research, whether in the laboratory in Bloomsbury or an archaeological excavation in Iraq. The British Museum and its rich collection tell the story of our shared humanity and we thank you for supporting us in stewarding this history for future generations. 
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    See how the support of our Patrons has helped fund projects across the Museum, including:
                </Typography>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:4}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="/room4.jpg"
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

export default Filler;






