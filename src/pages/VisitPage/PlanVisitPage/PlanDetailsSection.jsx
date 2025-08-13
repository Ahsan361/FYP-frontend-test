import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

//my custom
import Button from "../../../components/ui/Button";

function PlanDetailsSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
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
                        Immerse yourself in two million years of human history, art and culture.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        Book your free ticket(Opens in new window) for Museum entry in advance to receive key information and updates before your visit and priority entry during busy periods. In our galleries come face-to-face with objects from the Sutton Hoo ship burial, explore the wonderful collection of the Islamic world(Opens in new window) and learn more about Egyptian mummies. Please see the list of available galleries to visit.
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Exhibition tickets are available to book for:
                    </Typography>
                    <Typography 
                        component="ul"
                        sx={{
                            pl: { xs: 2, sm: 4 },
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        <li>Hiroshige: artist of the open road (until 7 September 2025)</li>
                        <li>Ancient India: living traditions (until 19 October 2025)</li>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Occasionally we may need to close galleries at short notice. We regret that we are not always able to alert visitors in advance of their visit.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        We look forward to welcoming you.
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
                        pr: { xs: 2, sm: 8, md: 20 },
                        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                    {/* Free entry */}
                    <Typography variant="h1" 
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                        }}
                    >
                        Free entry
                    </Typography>

                    {/* Opening times */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <AccessTimeIcon fontSize="small" /> Opening times
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Daily: 10.00–17.00 (<strong>Fridays: 20.30</strong>)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5, textDecoration: "underline", cursor: "pointer" }}>
                            opening hours
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            The Museum is closed 24–26 December.
                        </Typography>
                    </Box>

                    {/* Location */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <LocationOnIcon fontSize="small" /> The British Museum
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Great Russell Street, London, WC1B 3DG
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5, textDecoration: "underline", cursor: "pointer" }}>
                            getting here
                        </Typography>
                    </Box>

                    {/* Audio guides */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <HeadphonesIcon fontSize="small" /> Gallery audio guides
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Listen on the <u>Audio app</u>, available on the <u>App Store</u>, <u>App Store (China mainland)</u> and <u>Google Play</u>.
                        </Typography>
                    </Box>

                    {/* Advance booking */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <ConfirmationNumberIcon fontSize="small" /> Advance booking recommended
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem",md: "1.5rem" }, lineHeight: 1.5, textDecoration: "underline", cursor: "pointer" }}>
                            ticket information
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button variant="contained">
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Book tickets
                            </Typography>
                        </Button>
                        <Button variant="contained">
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                View Museum map
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default PlanDetailsSection;
