import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import AdvertisementSection from "../../../components/ui/AdvertismentCard";

//section components
import PlanDetailsSection from "./PlanDetailsSection";
import ExplorationSection from "./ExplorationSection";
import TicketInfoSection from "./TicketInformationSection";
import GallerySection from "./GallerySection";
import ScheduleSection from "./ScheduleSection";
import ExhibitionSection from "../../LandingPage/ExhibitionSection";

function PlanVisitPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Plan Your Visit"
            buttonText="Book Now"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="/advertisementCard1.jpg"
        />
        <PlanDetailsSection/>
        <ExplorationSection/>
        {/* {Passing props for signup card} */}
        <AdvertisementSection 
            heading="Sign up to our newsletters"
            detail="Stay connected to the British Museum for the latest news, stories, exhibitions, events and visitor information."
            buttonText="Sign up"
            buttonPath="/support/donate"
        />
        <TicketInfoSection />
        {/* {Passing props for membership card} */}
         <AdvertisementSection 
            heading="10% off for Members"
            detail="Become a Member and enjoy a 10% discount at all of the Museum's cafés, restaurants and shops. "
            buttonText="Become a Member"
            buttonPath="/membership/become-member"
        />
        <GallerySection/>
        {/* {Passing props for Museum support card} */}
         <AdvertisementSection 
            heading="Support the Museum"
            detail="Your support is vital, now more than ever, and helps the Museum to share the collection with the world."
            buttonText="Make a Donation"
            buttonPath="/support/donate"
        />
        {/* {Exhibition and Events Section} */}
        <ExhibitionSection/>
        {/* {Schedule Section} */}
        <ScheduleSection />
        <Footer />
    </ThemeProvider>
    )
}

export default PlanVisitPage;
