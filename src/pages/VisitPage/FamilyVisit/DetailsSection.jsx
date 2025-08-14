import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

//my custom
import Button from "../../../components/ui/Button";

function DetailsSection(){
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
                        Families with children of all ages can enjoy a range of free gallery activities.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        Experience the extraordinary collection in a safe environment, by finding out what activities and facilities are currently available.
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Take on a Museum Mission featured in six galleries and challenge your family to a variety of tasks. At the weekends pick up an activity backpack, or a Museum explorer trail, from the Families Desk to guide you around the galleries on an in-depth exploration of the different times and cultures on display.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                       During school holidays, we run a range of playful and inspiring workshops that bring the stories in the Museum collection to life. 
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Under 5s and their carers are invited to join in with the Museum's Little Feet programme. 
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        During school holidays, we run a range of playful and inspiring workshops that bring the stories in the Museum collection to life.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        For regular news and updates, sign up to our family newsletter(Opens in new window).
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
                        Family information
                    </Typography>

                    {/* Location */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" } }}>
                            <LocationOnIcon fontSize="medium" /> Visit the Families Desk and Ford Centre
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" }, lineHeight: 1.5 }}>
                            Collect backpacks and Museum explorer trails.
                        </Typography>                        
                    </Box>

                    {/* Advanced Bookings */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" } }}>
                            <AccessTimeIcon fontSize="medium" /> Free – advance booking recommended (except under 4s)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                           Weekends and school holidays:  (<strong>10.00–12.30 and 13.15–16.30</strong>)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" }, lineHeight: 1.5, cursor: "pointer" }}>
                           See additional Families Desk closures. See London Borough of Camden school holiday dates.
                        </Typography>
                    </Box>

                    {/* Free*/}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" } }}>
                            <ConfirmationNumberIcon fontSize="medium" /> Free - advance booking recommended (except under 4s)
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button variant="contained">
                            <Typography variant="h6">
                                Book tickets
                            </Typography>
                        </Button>
                        <Button variant="contained">
                            <Typography variant="h6">
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

export default DetailsSection;
