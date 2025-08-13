import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom
import { Navbar } from "../../../components/ui";
import Button from "../../../components/ui/Button";


function GroupDetailsSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <Grid container >
            {/* {Left Column} */}
            <Grid size={{sm:14, md:8}}>
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
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                    }}
                    >
                        We welcome groups of any size to the Museum.
                    </Typography>                    
                    <Typography 
                        component="ul"
                        sx={{
                            pl: { xs: 2, sm: 4 },
                            fontSize: { xs: "0.9rem", sm: "2rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        <li>If you plan to attend as a self-led group of 10 people or more, please book with us at least seven days in advance.</li>
                        <li>Oou enter the Museum you're free to stay, within the stated opening hours.</li>
                        <li>Please view the Visit page in advance to check if any galleries you plan to visit are closed.</li>
                        <li>Tour groups are not permitted in Rooms 33, 33a, 33b, 61, 62, 63 and 91a or any exhibitions.</li>
                        <li>If you're from a UK school and are bringing primary or secondary students, take a look at the dedicated page for school groups.</li>
                        <li>If you're a travel company booking a group visit, you may be able to offer an exclusive out-of-hours tour. See our Travel trade tours section for details.</li>
                        <li>If anyone in your group has accessibility needs, please see our Accessibility at the Museum page.</li>
                        <li>Please make sure you're mindful of other visitors in the Museum. Don't block exits or entrances. </li>
                        <li>We recommend group leaders download and read the full guidelines for visiting the British Museum as a tour group.</li>
                    </Typography>
                </Box>
            </Grid>
            {/* {Right Column} */}
            <Grid size={{xs: 14, sm: 14, md: 4}}>
                <Box
                    sx={{
                        height: "100%",
                        backgroundColor: theme.palette.background,  
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "flex-start",
                        p: { xs: 2, sm: 4, md: 8 },
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
                        Key Information
                    </Typography>


                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button 
                            variant="contained" 
                            size="medium" 
                            fullWidth 
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Book a self-led visit
                            </Typography>
                        </Button>
                        <Button 
                            variant="outlined" 
                            size="medium" 
                            fullWidth 
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Find out about school visits
                            </Typography>
                        </Button>
                        <Button 
                            variant="outlined" 
                            size="medium" 
                            fullWidth 
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                See our accessibility information
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default GroupDetailsSection;
