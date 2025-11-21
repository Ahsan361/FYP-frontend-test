import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom components
import Button from "../../../components/ui/Button";
import { lightTheme, darkTheme } from '../../../styles/theme';

function ExistingPatronDetailSection(){
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
                        Thank you for your continued support as a Patron of the British Museum.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        Our Patrons truly make a big difference in what the Museum is able to achieve. Find out more about how your money helps.
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}
                    >
                        As a Patron, you have access to a number of exclusive benefits:
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
                            <li>Our programme of upcoming Patrons' events.</li>
                            <li>Unlimited access for you and a guest to our exhibitions and displays.</li>
                            <li>Entry to a selection of private exhibition viewings. This gives you the opportunity to enjoy the exhibitions in a quiet setting before the Museum opens to the public. Please email patrons@britishmusuem.org to receive your invitation to upcoming viewings.</li>
                            <li> Access to Patrons' content, including email newsletters, the British Museum Magazine and digital content.</li>
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
                        Useful links
                    </Typography>
                    <Divider sx={{ borderColor: theme.palette.primary.lightmain }}/>
                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Renew your Patronage
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
                        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Leave a legacy
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default ExistingPatronDetailSection;
