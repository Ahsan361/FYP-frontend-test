import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//my custom
import Button from "../../../components/ui/Button";
import { lightTheme, darkTheme } from '../../../styles/theme';

function DonatePageDetailsSection(){
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
                        Support two million years of global history and culture.
                    </Typography>                    
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        The British Museum is unique in bringing together the cultures of the world under one roof. Your donation will help keep access to the unparalleled collection at the Museum free now, and always.
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}>
                        As a charity the Museum relies on donations. Gifts support the care, preservation and display of the collection, and make the inspirational work of our curators, conservators, scientists and educators possible.
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}>
                        Large or small, every donation helps secure the future of the collection. We are truly grateful for your support.
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
                        Contact us
                    </Typography>
                    <Divider
                        sx={{
                        borderColor: theme.palette.primary.lightmain,
                        mx: 2,
                        my: 2,
                        }}
                    />
                    <Box>
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            For more information about supporting the Museum:
                        </Typography>
                        <Divider
                            sx={{
                            borderColor: theme.palette.primary.lightmain,
                            mx: 2,
                            my: 2,
                            }}
                        />
                        <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.4rem" } }}>
                            Email:<a href="mailto:"> development@britishmuseum.org</a>
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
                                Donate now
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default DonatePageDetailsSection;
