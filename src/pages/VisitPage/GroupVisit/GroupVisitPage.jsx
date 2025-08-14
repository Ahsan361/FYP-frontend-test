import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import AdvertisementSection from "../../../components/ui/AdvertismentCard";
//section components
import PrivateTourSection from "./PrivateTourSection";
import GroupDetailsSection from "./GroupDetailsSection";
import GroupNavigationSection from "./GroupNavigationSection";
import RefreshmentSection from "./RefreshmentSection";
import FAQSection from "./FAQSection";
import AdditionalActivitiesSection from "./AdditionalActivitiesSection";

function GroupVisitPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Group Visit"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            showButton={false}
        />
        <Divider
            sx={{
            borderColor: theme.palette.primary.lightmain,
            mx: 2,
            my: 2,
            }}
        />
        <GroupDetailsSection />
        <GroupNavigationSection/>
        {/* {School groups} */}
        <AdvertisementSection 
            heading="School groups"
            detail="If you're from a UK school and are bringing primary or secondary students, plan a visit to the Museum."
            buttonText="Plan a school visit"
        />
        <PrivateTourSection/>
        {/* {travel advertisement} */}
        <AdvertisementSection 
            heading="Travel trade tours"
            detail="We offer several exclusive out-of-hours tours which can be booked for private groups. "
            buttonText="Find out more"
        />
        <RefreshmentSection/>
        {/* Souvenir Guide Advertisement */}
       <AdvertisementSection
        heading="Souvenir guides for groups"
        detail="Full-colour guidebooks, available in 10 languages, can be bought in advance from all British Museum shops and online(Opens in new window). For more details, contact Customer Services:"
        showButton={false}
        AdditionalDetails={[
            "Email: traveltradebookings@britishmuseum.org",
            "Phone: +44 (0)20 3073 4970",
        ]}
        />
        <FAQSection/>
        {/* {Advertisement} */}
        <AdvertisementSection 
            heading="The British Museum at your fingertips"
            detail="Enjoy a self-guided tour whenever and wherever with expert commentaries in five languages on 250 objects and 65 galleries."
            buttonText="Discover the Audio app"
        />
        <AdditionalActivitiesSection/>
        <Footer />
    </ThemeProvider>
    )
}

export default GroupVisitPage;
