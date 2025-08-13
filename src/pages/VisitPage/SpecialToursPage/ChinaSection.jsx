import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadphonesIcon from '@mui/icons-material/Headphones';
//my custom
import Button from "../../../components/ui/Button";


function ChinaSection() {
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
                       An introduction to China
                    </Typography>                    
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Journey through the extraordinary cultures of China in this special guided tour before the Museum opens to the public.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        In the Sir Joseph Hotung Gallery of China (Room 33), you will gain an insight into the development of Chinese history and culture from 5000 BC to the present day.
                    </Typography>
                                        <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        In a beautifully refurbished space which has recently re-opened, this introductory tour will give you a deep appreciation for the magnificent objects on display. Featuring spectacular Tang dynasty tomb figures buried around AD 728 and beautiful Ming dynasty blue-and-white porcelain.
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
                            <li>Room 33: China (Sir Joseph Hotung Gallery)</li>
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
                        View of China and South Asia (Room 33), The Sir Joseph Hotung Gallery.
                    </Typography>
                </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default ChinaSection;
