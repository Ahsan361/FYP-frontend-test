import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//my custom
import Button from "../../../components/ui/Button";

function YoungFriendsDeitailSection(){
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
                        Join Young Friends to explore two million years of human history.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        The British Museum's Young Friends scheme offers a fun way for families to explore the collection both at the Museum and at home. You'll get the latest news on all family events and activities, as well as access to our famous Museum sleepovers. 
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}>
                        <a href="mailto:">Sign up</a> Young Friends to receive:
                    </Typography>
                    <Typography component="div"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                        lineHeight: 1.5,
                        paddingLeft:{xs:4, md:8}
                    }}>
                        <ul>
                            <li>Regular emails packed with fun activities including crafts, trails and videos.</li>
                            <li>Pre-sale tickets for Museum sleepovers.</li>
                            <li>The lowdown on family events across the Museum.</li>
                            <li>Digital copies of the Young Friends' magazine Remus three times a year and access to all past issues.</li>
                        </ul>                        
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
                        gap: { xs: 1, sm: 2 },
                    }}
                >
                     <Typography variant="h1" 
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                        }}
                    >
                        Key information
                    </Typography>
                    <Divider
                        sx={{
                        borderColor: theme.palette.primary.lightmain,
                        mx: 2,
                        my: 2,
                        }}
                    />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <AccessTimeIcon fontSize="small" /> For all young people
                        </Typography>
                        <Divider
                            sx={{
                            borderColor: theme.palette.primary.lightmain,
                            mx: 2,
                            my: 2,
                            }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <AccessTimeIcon fontSize="small" /> Free
                        </Typography>
                        <Divider
                            sx={{
                            borderColor: theme.palette.primary.lightmain,
                            mx: 2,
                            my: 2,
                            }}
                        />
                        
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Subscribe to Young Friends for free
                            </Typography>
                        </Button>
                        <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>
                                Find out about Museum sleepovers
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default YoungFriendsDeitailSection;
