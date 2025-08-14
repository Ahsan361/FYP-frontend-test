import { CssBaseline, ThemeProvider, Typography, Box, Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";

//my custom components
import { lightTheme, darkTheme } from '../../../styles/theme';

function CorporateSponsorshipSection() {
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
                    Corporate sponsorship
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    We are embarking on an exciting new era, led by our Director, Dr Nicholas Cullinan OBE, during which we will build a Museum for the future that connects us to our past and to each other.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Join us on this once-in-a-lifetime journey. When you partner with us, we will work hard to ensure that you have an exceptional experience. 
                </Typography>
                <Typography variant="h6" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"2rem"}}}>
                    ❛This is going to be the biggest transformation of any museum in the world – not just physically, but intellectually too. And while we look towards this exciting future, we will remain guided by the words of our founder – who dreamed of a museum connecting all arts and sciences, which would be accessible to all persons.❜
                </Typography>
                <Typography variant="subtitle" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.2rem"}}}>
                    ~ Dr Nicholas Cullinan OBE, Director of the British Museum
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    Our family of funders support temporary exhibitions, permanent galleries, curatorial positions and education programmes. Whatever your area of interest, we will work closely with you to ensure that we meet your objectives and that you are able to capitalise on opportunities to bring the partnership alive.
                </Typography>
                <Typography component="div" sx={{ paddingLeft:{xs:2, md:4}, fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    <ul>
                        <li><strong>Entertain</strong> your clients and key stakeholders in beautiful and awe-inspiring spaces, with curator-led experiences that are only available to corporate partners.</li>
                        <li><strong>Engage</strong> your employees, clients and stakeholders through access to ticketed, critically acclaimed exhibitions, invitations to exclusive events, early morning views and more.</li>
                        <li><strong>Inspire</strong> your key audiences through access to curatorial expertise, behind-the-scenes tours and creative experiences.</li>
                        <li><strong>Enhance</strong> your brand through targeted and high-profile marketing and communications strategies that reach national and international audiences.</li>
                        <li><strong>Expand</strong> your networks, by attending British Museum events with donors, corporate supporters, collectors, designers, artists, academics and government representatives.</li>                        
                    </ul>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: {xs:"0.9rem", sm:"1rem", md:"1.4rem"}}}>
                    We would love to hear from you. Tell us what you would like to achieve through a partnership with the British Museum and we will be pleased to create a package that meets your needs. An exciting journey starts here.
                </Typography>
            </Stack>
        </Grid>

        {/* Right Image Section */}
        <Grid size={{sm:12, md:4}} sx={{pl:{xs:4, md:8}, pr:{xs:4, md:8}}}>
            <Box sx={{ flex: 0.8, textAlign: "center" }}>
                <img
                src="room1.jpg"
                alt="Private Tour"
                style={{ width: "100%" }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    The stunning roof stands 26.3 metres above the floor at its highest point - nearly as tall as six of London's double-decker buses – and makes the Great Court the largest covered public square in Europe.
                </Typography>
            </Box>
        </Grid>
    </Grid>

    </ThemeProvider>
    )
}

export default CorporateSponsorshipSection;
