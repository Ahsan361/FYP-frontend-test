import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";

//my custom components
import { lightTheme, darkTheme } from '../../../styles/theme';

function CorporatePartnershipSection() {
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
                    Corporate partnership
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Unique access
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    <strong>Entertain</strong><br />
                    Corporate partners (and sponsors) enjoy unrivalled access to the Museum's spectacular galleries and Great Court for evening entertaining. Choose from nearly 80 galleries, and a wide range of entertaining options, from drinks for 1,000 guests in the Great Court to an intimate dinner for 20 guests in the Enlightenment gallery.  
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    <strong>Engage and Inspire</strong><br />
                    Invite your employees to visit must-see exhibitions for free, and encourage them to enjoy discounts in our shops and cafes. Inspire them with curator talks or behind-the-scenes tours, and incentivise them with invitations to our friends and family events.  
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    <strong>Enhance</strong><br />
                    Access British Museum assets for non-commercial purposes and benefit from recognition within the Museum and online. Build your network by joining ours.  
                </Typography>            
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    To discuss corporate partnership, and the options available within it, please email <a href="emailto:">corporatesupport@britishmuseum.org</a>
                </Typography>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:4}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="room2.png"
                alt="Private Tour"
                style={{ width: "100%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    An evening event in the Great Court with a projection of the Lewis Chessmen.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default CorporatePartnershipSection;
