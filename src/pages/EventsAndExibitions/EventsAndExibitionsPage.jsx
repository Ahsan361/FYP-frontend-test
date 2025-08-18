import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { useSelector } from "react-redux";

//context
import { EventsFilterProvider } from "../../components/contexts/EventsFilterContext";

//my custom
import { Navbar } from "../../components/ui";
import Footer from '../../components/Footer/Footer'
import HeroSection from "../../components/ui/HeroSection";
import FilterBar from "../../components/ui/Filterbar";
import { lightTheme, darkTheme } from '../../styles/theme';

//section components
import HighlightEventsSection from "./HighlightEventsSection";
import SpecialExhibitionsSection from "./SpecialExhibitionsSection";
import FreeExhibitionsSection from "./FreeExhibitionsSection";
import ToursSection from "./ToursSection";
import InternationalToursSection from "./InternationalToursSection";
import ExhibitionFillerCard  from "./ExhibitionFillerCard";

function EventsAndExibitionsPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <EventsFilterProvider>
            <Navbar />
            <HeroSection
                heading="Exhibitions & Events"
                description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
                imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                showButton={false}
            /> 
            <FilterBar/>
            <SpecialExhibitionsSection/>
            <Divider
                sx={{
                borderColor: theme.palette.primary.lightmain,
                mx: 2,
                my: 2,
                }}
            />            
            <FreeExhibitionsSection />
            <Divider
                sx={{
                borderColor: theme.palette.primary.lightmain,
                mx: 2,
                my: 2,
                }}
            />            
            <HighlightEventsSection />
            <Divider
                sx={{
                borderColor: theme.palette.primary.lightmain,
                mx: 2,
                my: 2,
                }}
            />
            <ToursSection/>
            <Divider
                sx={{
                borderColor: theme.palette.primary.lightmain,
                mx: 2,
                my: 2,
                }}
            />            
            <InternationalToursSection />
            <Divider
                sx={{
                borderColor: theme.palette.primary.lightmain,
                mx: 2,
                my: 2,
                }}
            />            
            <ExhibitionFillerCard />
            <Divider 
                sx={{ 
                borderColor: theme.palette.divider,
                borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' },
                 mb: 4
                }} 
            />
        
            <Footer/>
        </ EventsFilterProvider>
    </ThemeProvider>
    )
}

export default EventsAndExibitionsPage;
