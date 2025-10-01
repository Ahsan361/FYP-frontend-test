import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { useSelector } from "react-redux";

//my custom
import { lightTheme, darkTheme } from '../../../styles/theme';
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";

//section components
import TourDetailSection from "./TourDetailSection";
import MuseumIntroductionSection from "./MuseumIntroductionSection";
import CountryIntroductionSection from "./CountryIntroductionSection"
import CountryDetailSection from "./CountryDetailSection";
import ChinaSection from "./ChinaSection";
import HistorySection from './HistorySection';
import FAQSection from "./FAQSection";
import AdditionalFacilitiesSection from "./AdditionalFacilitiesSection";

function SpecialTourPage() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Out of hours tours"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="/advertisementCard8.jpg"
            showButton={false}
        />
        <TourDetailSection />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <MuseumIntroductionSection />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <CountryIntroductionSection />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <CountryDetailSection/>
        <ChinaSection />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <HistorySection />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <FAQSection />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <AdditionalFacilitiesSection />
        <Footer />
    </ThemeProvider>
    )
}

export default SpecialTourPage;
