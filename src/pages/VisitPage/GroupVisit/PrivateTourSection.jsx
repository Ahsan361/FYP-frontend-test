import { CssBaseline, ThemeProvider, Typography, Box } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";
import ListCard from "../../../components/ui/ListCard";

function PrivateTourSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    const ticketItems = [
    {
      id: 1,
      title: "   Around the world in 90 minutes",
      details: [
        <>Explore some of the most famous objects on display at the Museum, including the Rosetta Stone, Lewis Chessmen and the Parthenon frieze, as well as some lesser-known but equally fascinating objects.</>,
        <>Allow 90 minutes for the tour.</>,
        <>Please note that this tour involves visiting a number of galleries on different floors of the Museum with a considerable amount of walking.</>,
        <>To book, please email <a href="mailto:groups@britishmuseum.org">groups@britishmuseum.org</a> at least three weeks in advance.</>,
        <>This tour has a minimum cost of £180 for groups of 15 people or less.</>,
        <>For larger groups, there is a charge of £12 per head.</>,
        <>Each tour has a capacity of 20 people.</>
        ]

    },
    {
      id: 2,
      title: "Enlightenment gallery — one hour",
      details: [
        <>Discover the way the world was understood by Europeans in the 18th century, tracing the beginning of the British Museum and its collection.</>,
        <>Allow one hour for the tour.</>,
        <>To book, email <a href="mailto:groups@britishmuseum.org">groups@britishmuseum.org</a> at least three weeks in advance. </>,
        <>This tour has a minimum cost of £135 for groups of 15 people or less.</>,
        <>For larger groups, there is a charge of £9 per head.</>,
        <>Each tour has a capacity of 20 people.</>
      ]
    },
    {
      id: 3,
      title: "Ancient Egypt — one hour",
      details: [
        <>Be amazed by the world of ancient Egypt through monumental stone sculpture, including the colossal statue of Ramesses II.</>,
        <>Allow one hour for the tour.</>,
        <>To book, email <a href="mailto:groups@britishmuseum.org">groups@britishmuseum.org</a> at least three weeks in advance.</>,
        <>This tour has a minimum cost of £135 for groups of 15 people or less.</>,
        <>For larger groups, there is a charge of £9 per head.</>,
        <>Each tour has a capacity of 20 people.</>
      ]
    },
    {
      id: 4,
      title: "Ancient Greece — one hour",
      details: [
        <>Explore highlights from the classical Greek world, including statues, painted pottery and the world-famous Parthenon frieze.</>,
        <>Allow one hour for the tour.</>,
        <>To book, email <a href="mailto:groups@britishmuseum.org">groups@britishmuseum.org</a> at least three weeks in advance.</>,
        <>This tour has a minimum cost of £135 for groups of 15 people or less.</>,
        <>For larger groups, there is a charge of £9 per head.</>,
        <>Each tour has a capacity of 20 people.</>        
      ]
    }
  ];

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Box sx={{ display: "flex", alignItems: "center",justifyContent:"space-between" , gap: 3, p: 6, pb:0 }}>
        {/* Left Text Section */}
        <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            Private guided tours for groups
            </Typography>

            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
                
            You can book a number of private guided tours for groups or individuals, allowing you to see and learn about the highlights of the Museum's collection – see below for details.
            </Typography>

            <Typography variant="body1" sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}, mt: 4}}>
            These tours are for adult audiences and are delivered in English.
            </Typography>
        </Box>

        {/* Right Image Section */}
        <Box sx={{ flex: 0.8, textAlign: "center" }}>
            <img
            src="room4.jpg"
            alt="Private Tour"
            style={{ width: "70%" }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
            Visitors in <strong><u>Room 4</u></strong> standing by the Rosetta Stone.
            </Typography>
        </Box>
        </Box>
            <ListCard
                title="Private guided Tour for groups"
                items={ticketItems}
            />
    </ThemeProvider>
    )
}

export default PrivateTourSection;






