import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadphonesIcon from '@mui/icons-material/Headphones';

//my custom components
import { lightTheme, darkTheme } from '../../../styles/theme';

function TourDetailSection() {
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
                        Experience the highlights of the collection in private with our volunteer-led out-of-hours tours.
                    </Typography>                    
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Whether you want to navigate the history of the ancient Greeks or walk in the footsteps of pharaohs, immerse yourself in humanity's greatest civilisations without the crowds.
                    </Typography>
<Box
    component="ul"
    sx={{
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
        lineHeight: 1.5,
        pl: 2, // Padding for bullet point indentation
        m: 0, // Remove default margins
    }}
>
    <li>An introduction to the British Museum</li>
    <li>An introduction to ancient Egypt</li>
    <li>Life and death in ancient Egypt</li>
    <li>An introduction to China</li>
    <li>An introduction to the ancient Greek world</li>
</Box>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md:"1.5rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        Further information can be found in our <a href="FAQs">FAQs section.</a> 
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
                       Tour information
                    </Typography> 
                    {/* Divider */}
                    <Divider 
                        sx={{ 
                        borderColor: theme.palette.divider,
                        borderWidth: '1px'
                        }} 
                    />
                    {/* Opening times */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <AccessTimeIcon fontSize="small" /> Time
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Daily: 10.00-17.00
                        </Typography>
                    </Box>
                    {/* Divider */}
                    <Divider 
                        sx={{ 
                        borderColor: theme.palette.divider,
                        borderWidth: '1px'
                        }} 
                    />
                    {/* Location */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <LocationOnIcon fontSize="small" /> Meeting Point
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Main Entrance-Great Russell Street
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5}}>
                            Please bring your email confirmation.
                        </Typography>
                    </Box>
                    {/* Divider */}
                    <Divider 
                        sx={{ 
                        borderColor: theme.palette.divider,
                        borderWidth: '1px'
                        }} 
                    />
                    {/* Audio guides */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <HeadphonesIcon fontSize="small" /> Ticket Information
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5, fontWeight: 'bold' }}>
                            Advance Booking Only                            
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
                                <li>£35 (Adults)</li>
                                <li>£32 (Members)</li>
                                <li>£32 (Concessions: students, jobseekers, disabled visitors)</li>
                                <li>£17.50 (Ages 5-15 years)</li>
                                <li>Free for under 5s and disabled visitors' assistant (no booking required)</li>
                            </ul>
                        </Typography>
                        {/* Divider */}
                        <Divider 
                            sx={{ 
                            borderColor: theme.palette.divider,
                            borderWidth: '1px',
                            mb:2,
                            mt:3,
                            }} 
                        />
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem",md: "1.5rem" }, py: 2, lineHeight: 1.5 }}>
                            For any queries on booking please email: <a href="mailto:"> tickets@britishmuseum.org</a>
                        </Typography>
                    </Box>
                    {/* Divider */}
                    <Divider 
                        sx={{ 
                        borderColor: theme.palette.divider,
                        borderWidth: '1px'
                        }} 
                    />
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default TourDetailSection;
