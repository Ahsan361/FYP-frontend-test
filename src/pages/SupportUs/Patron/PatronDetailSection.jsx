import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom
import Button from "../../../components/ui/Button";
import { lightTheme, darkTheme } from '../../../styles/theme';

function PatronDetailSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container >
            {/* {Left Column} */}
            <Grid size={{sm:14, md:7}}>
                <Box
                    sx={{
                        height:"100%",
                        backgroundColor: theme.palette.background,  
                        display:"flex",
                        flexDirection: "column", 
                        justifyContent:"left",
                        p:{xs:2, sm:4, md:8},
                        pr:{xs:2, sm:8, md:20},
                        color:theme.palette.mode === "dark"? theme.palette.text.primary:"#101010",
                        gap:{xs:2, sm:4},

                    }}
                >
                    <Typography variant="h1"
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "2rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                    }}
                    >
                        The invaluable support of our Patrons enables the British Museum to continue to care for our world-renowned collection and share it with audiences in London and around the globe.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        As members of a community of curious minds, Patrons can enjoy the collection and learn from Museum experts in uniquely engaging and intimate environments. With opportunities to go behind the scenes and gain exclusive access to our major exhibitions and galleries, Patrons receive an unparalleled experience – all while supporting the vital work of the Museum.
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}
                    >
                        We invite you to become a part of the special community at the heart of the British Museum:
                    </Typography>
                    <Typography component="div"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                            paddingLeft: 4,
                        }}
                    >
                        <ul>
                            <li><strong>Patron Circles</strong></li>
                            <li><strong>Special Interest Groups</strong></li>
                        </ul>
                    </Typography>
                </Box>
            </Grid>
            {/* {Right Column} */}
            <Grid size={{xs: 14, sm: 14, md: 5}}>
                <Box
                    sx={{
                        height: "100%",
                        backgroundColor: theme.palette.background,  
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "flex-start",
                        p: { xs: 2, sm: 4, md: 8 },
                        pr: { xs: 2, sm: 8, md: 20 },
                        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                    <Typography variant="h1" 
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                        }}
                    >
                        Key information
                    </Typography>
                    <Divider sx={{ borderColor: theme.palette.primary.lightmain }}/>
                    <Box>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Contact Us
                        </Typography>

                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Email:<a href="mailto:"> patrons@britishmuseum.org</a>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Phone: +44 (0)20 7323 8903
                        </Typography>
                        <Divider sx={{ borderColor: theme.palette.primary.lightmain, pb:1 }} />
                    </Box>
                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Renew your Patronage
                            </Typography>
                        </Button>
                        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Existing Patrons
                            </Typography>
                        </Button>
                        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Patrons' events
                            </Typography>
                        </Button>
                        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Patrons' appeal
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default PatronDetailSection;
