import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ListCard from "../../../components/ui/ListCard";

function GroupNavigationSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    const ticketItems = [
    {
      id: 1,
      title: "Coach parking",
      details: [
        {text:"Coach parties are advised to use the metered parking on Montague Place, less than a 30-second walk from the Museum. We kindly ask coach drivers to turn their engines off when parked.", noBullet: true},
        ]

    },
    {
      id: 2,
      title: "Public transport",
      details: [
        {text:"If you're arriving on public transport, please remember to aim for the Montague Place entrance at the rear of the Museum. You can use the postcode WC1E 7JW to find it.", noBullet: true},
        {text:"You can find more details about getting here on public transport on the main Visit page, however, if you're arriving on the London Underground, the stations closest to the Montague Place entrance are:", noBullet: true}, 
        <>Russell Square – 7-minute walk</>,
        <>Goodge Street – 8-minute walk</>,
        <>Tottenham Court Road – 9-minute walk</>,
        <>Holborn – 11-minute walk</>
      ]
    }
  ];

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Grid container sx= {{py:8}} >
            {/* {Left Column} */}
            <Grid size={{sm:14, md:8}}>
                <Typography variant="h1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"2.5rem"}, p:"3rem"}}>
                    Getting here for groups
                </Typography>
                    <img 
                        src="museumMap.png" 
                        alt="museum map here" 
                        style={{
                        width: "70%",
                        height: "70%",
                        paddingLeft: "10rem",
                        objectFit: "cover" // or "contain" if you don’t want cropping
                        }} 
                    />
            </Grid>
            {/* {Right Column} */}
            <Grid size={{xs: 14, sm: 14, md: 4}}>
                <Box
                    sx={{
                        height: "100%",
                        backgroundColor: "theme.palette.background",  
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "center",
                        p: { xs: 2, sm: 4, md: 8 },
                        color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                        gap: { xs: 2, sm: 4 },
                    }}
                >
                   <Typography variant="body1"
                        sx={{
                            fontSize: { xs: "0.9rem", sm: "1.5rem" },
                            lineHeight: 1.5,
                            textAlign: { xs: "left", sm: "left" },
                        }}>
                        If you're in a group of 10 or more, you must use the Montague Place entrance, which has a dedicated reception and entry with coach parking nearby and level access. You can get directions to this entrance by using the postcode WC1E 7JW.
                    </Typography>
                    <Typography variant="body1"
                        sx={{
                                fontSize: { xs: "0.9rem", sm: "1.5rem" },
                                lineHeight: 1.5,
                                textAlign: { xs: "left", sm: "left" },
                            }}
                    >
                        Groups will still need to pass through the usual security checks when entering the Museum. Please see the Visit page for details.
                    </Typography>
                </Box>
            </Grid>

            <ListCard
                title="Additional Information"
                items={ticketItems}
            />
        </Grid>
    </ThemeProvider>
    )
}

export default GroupNavigationSection;






