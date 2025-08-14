import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom components
import Button from "../../../components/ui/Button";
import { lightTheme, darkTheme } from '../../../styles/theme';

function VolunteerDetailSection(){
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
                        p:{xs:2, sm:4, md:8},
                        pr:{xs:2, sm:8, md:20},
                        color:theme.palette.mode === "dark"? theme.palette.text.primary:"#101010",
                        gap:{xs:2, sm:4},

                    }}
                >
                    <Typography variant="h1"
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "2rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                    }}
                    >
                        More than 500 volunteers support the Museum throughout the year, in a variety of roles.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        
                        Volunteers share their knowledge and enthusiasm by delivering daily eye-opener tours, they help the public enjoy the collection in numerous other ways and support behind-the-scenes activities in almost every department. And that's just the start.
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}
                    >
                        
                        Every volunteer offers invaluable support to the Museum, and they get something back from it too.
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
                        p: { xs: 2, sm: 4, md: 8 },
                        pr: { xs: 2, sm: 8, md: 20 },
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
                        Contact us
                    </Typography>
                    <Divider sx={{ borderColor: theme.palette.primary.lightmain }}/>
                    <Box>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            For more information about volunteering:
                        </Typography>

                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Email:<a href="mailto:"> patrons@britishmuseum.org</a>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Phone: +44 (0)20 7323 8903
                        </Typography>
                        <Divider sx={{ borderColor: theme.palette.primary.lightmain, pt:1 }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Write to us:
                        </Typography>

                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Volunteers Office The British Museum Great Russell Street London WC1B 3DG
                        </Typography>
                        
                        <Divider sx={{ borderColor: theme.palette.primary.lightmain, pt:1}} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default VolunteerDetailSection;
