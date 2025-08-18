import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from "react-redux";

function ExhibitionFillerCard() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx= {{py:4, px:8}} >
            {/* {Left Column} */}
            <Grid size={{xs:12, sm: 12, md:8}}>
                    <img 
                        src="/filler.png" 
                        alt="Loading Image" 
                        style={{
                        width: "100%",
                        height: '100%',
                        objectFit: "cover" // or "contain" if you don’t want cropping
                        }} 
                    />
            </Grid>
            {/* {Right Column} */}
            <Grid size={{xs: 12, sm: 12, md: 4}} sx={{backgroundColor:theme.palette.divider}}>
                <Box
                    sx={{
                        height: "100%",
                        backgroundColor: "theme.palette.background",  
                        display: "flex",
                        flexDirection: "column", 
                        p: { xs: 2, sm: 4, md: 8 },
                        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        fontWeight: 'bold',
                        lineHeight: 1.4,
                        textAlign: 'left',
                    }}
                >
                    Marsh Awards
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                        lineHeight: 1.6,
                        textAlign: 'left',
                    }}
                    >
                    Between 2009 and 2024 the contribution of volunteers across the UK was recognised through the IVoIunteers for Museum Learning Award'.
                </Typography>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default ExhibitionFillerCard;






