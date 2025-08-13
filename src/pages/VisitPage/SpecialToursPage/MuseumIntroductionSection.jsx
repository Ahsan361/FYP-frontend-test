import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadphonesIcon from '@mui/icons-material/Headphones';
//my custom
import Button from "../../../components/ui/Button";


function MuseumIntroductionSection() {
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
                        An introduction to the British Museum
                    </Typography>  
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Uncover the origins of an extraordinary collection as you learn about the beginnings of the British Museum in 1753 and its subsequent development. The Enlightenment gallery (Room 1) focuses on the 18th century, an era of new knowledge, scientific discovery and European colonialism. The Collecting the world gallery (Room 2) focuses on the growth of the collection from the 18th century to the present day.
                    </Typography>                  
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Explore the oldest room in the Museum in this special guided tour before the galleries open to the public.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        This tour provides a thought-provoking introduction to the Museum, which you're free to explore afterwards
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
                            <li>Room 1: Enlightenment gallery </li>
                            <li> Room 2: Collecting the world</li>
                        </ul>
                    </Typography>
                    <Button variant="contained" sx={{ width: { xs: "50%", sm: "30%", md: "40%" } }}>
                        <Typography variant="h6">
                            View Museum map
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
                        View of the Enlightenment gallery (Room 1).
                    </Typography>
                </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default MuseumIntroductionSection;
