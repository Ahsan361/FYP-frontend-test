import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";

//my custom
import Button from "../../../components/ui/Button";
import { lightTheme, darkTheme } from '../../../styles/theme';

function CountryIntroductionSection() {
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
                        An introduction to ancient Egypt
                    </Typography>                    
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Enjoy exploring one of the most iconic spaces in the Museum and discover the fascinating history of ancient Egypt in this special guided tour, before the galleries open to the public.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        In the Egyptian sculpture gallery (Room 4), you can see impressive statues of kings and gods, monumental tomb architecture and ancient tomb reliefs spanning 3,000 years. These include the imposing colossal bust of Ramesses II and the Gayer-Anderson Cat. You can learn the importance of large-scale sculpture in ancient Egyptian temples and tombs, and get the perfect introduction to this unmissable collection. 
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
                        <li>Room 4: Egyptian sculpture</li>
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
                        Statue of Ramesses II in the Egyptian sculpture gallery (Room 4).
                    </Typography>
                </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default CountryIntroductionSection;
