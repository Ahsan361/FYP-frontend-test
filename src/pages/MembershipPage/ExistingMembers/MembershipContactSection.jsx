import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
function MembershipContactSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:4}} >
            <Grid size={{xs: 12, sm: 12, md: 12}}>
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
                        Contact the Membership Office
                    </Typography>
                    <Box>                    
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Email: <strong>friends@britishmuseum.org</strong>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Phone: <strong>+44 (0)20 7323 8195</strong>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" } }}>
                            <AccessTimeIcon fontSize="small" /> Opening times
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Monday-Friday: 10.00-16.00
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Closed: weekends and bank holidays
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                            Visit the Membership FAQs for the latest information.
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default MembershipContactSection;
