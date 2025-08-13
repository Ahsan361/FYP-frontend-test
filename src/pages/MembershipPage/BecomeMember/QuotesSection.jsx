import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import Button from "../../../components/ui/Button"
function QuotesSection(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx={{py:2}} >
            <Grid size={{xs: 12, sm: 12, md: 12}} 
                sx={{
                    height: "100%",
                    backgroundColor: theme.palette.mode === "dark"? "#1F2937":"black",                      
                    p: { xs: 2, sm: 4, md: 8 },
                    color: "white",
                }}
            >
             <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5, mb: 2  }}>
                ❛Each visit to the Museum is different. I notice new things every time I return. Unlimited access to the exhibitions as a Member is great. I know I can take my time and even come back for a second (or third!) look.❜
            </Typography>             
              <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" }, lineHeight: 1.5 }}>
                ~ Yinsey, Member since 2013
            </Typography>         
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default QuotesSection;
