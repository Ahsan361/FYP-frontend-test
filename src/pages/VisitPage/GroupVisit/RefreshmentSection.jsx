import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function RefreshmentSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container >
            {/* {Left Column} */}
            <Grid container size={{sm:14, md:4}} spacing= {4} sx={{p:4}}>
                 <Typography variant="h1"
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            lineHeight: 1.2,
                            textAlign: { xs: "center", sm: "left" },
                    }}
                    >
                        Food and drink for groups
                    </Typography> 
                    
                    <img
                        src="room4.jpg"
                        alt="Private Tour"
                        style={{ width: "100%", p: 4 }}
                    />
                    <Typography variant="body2" sx={{ p:0}}>
                       The Court Café. 
                    </Typography>
            </Grid>
            {/* {Right Column} */}
            <Grid size={{xs: 14, sm: 14, md: 8}}>
                <Box
                    sx={{
                        height: "100%",
                        backgroundColor: "theme.palette.background",  
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "flex-start",
                        p: { xs: 2, sm: 4, md: 8 },
                        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                   <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1.5rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                    }}
                    >
                    Groups are welcome to dine in the Great Court Restaurant, but we ask that you make a separate booking for this using the contact details on the Great Court Restaurant page.
                    </Typography>

                    <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1.5rem" },
                        lineHeight: 1.5,
                        textAlign: { xs: "left", sm: "left" },
                        mt: 2, // adds margin top for spacing between paragraphs
                    }}
                    >
                    Please refer to the Food and drink page for more details about dining at the Museum.
                    </Typography>

                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default RefreshmentSection;






