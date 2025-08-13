import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadphonesIcon from '@mui/icons-material/Headphones';
//my custom
import Button from "../../../components/ui/Button";


function CountryDetailSection() {
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
                       Life and death in ancient Egypt
                    </Typography>                    
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Discover how people lived and died in ancient Egypt and explore their hopes and aspirations for the afterlife. 
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        From human remains, painted coffins, amulets, shabtis and tomb models of daily life to spectacular wall paintings and papyri; investigate what tombs, human remains and burial goods tell us about the lives and afterlives of ancient Egyptian people. The tour will explore the preparation of the deceased for burial, including mummification, the furnishing of the tomb for an eternal restful existence, and the use of magic to guide and protect people on their perilous journey to the afterlife. It will also show how funerary remains can tell us about the lives of the ancient Egyptians.
                    </Typography>
                                        <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        This tour visits displays that include human remains. The British Museum is committed to curating human remains with care, respect and dignity. Find out more about our principles governing the holding, display and study of human remains.                        
                    </Typography>
                    <Typography
                    component="div"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                        lineHeight: 1.5,
                    }}
                    >
                    <b>Galleries on this tour</b>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                            <li>Room 61: Egyptian life and death: the tomb chapel of Nebamun (The Michael Cohen Gallery)</li>
                            <li>Rooms 62–63: Egyptian death and afterlife: mummies (The Roxie Walker Galleries)</li>
                            <li>Room 64: Early Egypt (The Raymond and Beverly Sackler Gallery)</li>
                    </ul>
                    </Typography>

                    <Button variant="contained" sx={{ width: { xs: "50%", sm: "30%", md: "40%" } }}>
                        <Typography variant="h6">
                            Book Now
                        </Typography>
                    </Button>
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
                    <Box sx={{ flex: 0.8, textAlign: "center" }}>
                    <img
                    src="room4.jpg"
                    alt="Private Tour"
                    style={{ width: "100%" }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        A visitor inspecting the Nebamun tomb paintings in Egyptian life and death (Room 61), The Michael Cohen Gallery.
                    </Typography>
                </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default CountryDetailSection;
