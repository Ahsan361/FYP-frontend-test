import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

function Filler() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx= {{py:8}} >
            {/* {Left Column} */}
            <Grid size={{sm:14, md:8}} sx={{p:20, pr:0}}>
                    <img 
                        src="filler.png" 
                        alt="museum map here" 
                        style={{
                        width: "100%",
                        height: "100%",
                        paddingLeft: "10rem",
                        objectFit: "cover" // or "contain" if you don’t want cropping
                        }} 
                    />
            </Grid>
            {/* {Right Column} */}
            <Grid size={{xs: 14, sm: 14, md: 4}} sx={{p:20, pl:0}}>
                <Box
                    sx={{
                        height: "100%",
                        backgroundColor: theme.palette.mode === "dark"? theme.palette.divider:"#101010c5" ,  
                        display: "flex",
                        flexDirection: "column", 
                        p: { xs: 2, sm: 4, md: 8 },
                        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "white",
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                    <Typography variant="h1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        Egypt
                    </Typography>
                   <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        Some of the British Museum's best-known Collection items come from Egypt each with their own unique story.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default Filler;






