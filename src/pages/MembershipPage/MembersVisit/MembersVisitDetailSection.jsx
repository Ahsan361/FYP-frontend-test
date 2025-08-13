import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//my custom
import Button from "../../../components/ui/Button";

function MembersVisitDetailSection(){
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
                        p:{xs:4, sm:6, md:8},
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
                        Members can visit all special exhibitions for free as well as enjoy exclusive viewings, events and online content.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        Your Membership subscription is a donation that allows us to support the important work of the Museum.
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}>
                        Members are no longer required to join any queues that develop outside the Museum gates. Find out more in Entering the Museum.
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}>
                        The visitor and Member cloakroom is located near the Main entrance on Great Russell Street.
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}>
                        We're also sending regular emails with updates and content just for Members. If you are not receiving our emails, please contact the Membership Office at <a href="mailto:">friends@britishmuseum.org</a>
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
                        p: { xs: 4, sm: 4, md: 8 },
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
                        Free Entry
                    </Typography>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <AccessTimeIcon fontSize="small" /> Opening times
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Monday-Friday: 10.00-16.00
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Closed: weekends and bank holidays
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Upgrade your Membership
                            </Typography>
                        </Button>
                        <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                View Museum map
                            </Typography>
                        </Button>
                        <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Get ideas for your next visit
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default MembersVisitDetailSection;
