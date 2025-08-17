import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import QuoteTile from "../../../components/ui/QuoteTile";

//section components 
import VolunteerDetailSection from "./VolunteerDetailSection"
import VolunteerReasoningSection from "./VolunteerReasoningSection"
import AFiller from "./AFiller";
import BFiller from "./BFiller";
import CFiller from "./CFiller";
import DFiller from "./DFiller";
import Fillercard from "./FillerCard";
import FAQSection from "./FAQSection";
import ExtraActivitiesSection from "./ExtraActivitiesSection";

function VolunteerPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Volunteer"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            showButton={false}
        />
        <VolunteerDetailSection/>
        <VolunteerReasoningSection />
        <QuoteTile
            quote="❛Volunteering helps make the Museum feel accessible and welcoming... it's an enjoyable and stimulating experience. Volunteering is also a lot of fun!❜"
            author="A British Museum volunteer"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <AFiller/>
        <BFiller/>
        <CFiller/>
        <DFiller/>
        {/* Choose your Membership Part Remaining */}
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <Fillercard/>
        <FAQSection/>
        <ExtraActivitiesSection/>
        <Footer/>
    </ThemeProvider>
    )
}

export default VolunteerPage;
