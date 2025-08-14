import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import AdvertisementSection from "../../../components/ui/AdvertismentCard";

//section components
import DetailsSection from "./DetailsSection";
import ExplorationSection from "./ExplorationSection";
import FacilitiesSection from "./facilitiesSection";
import FamilyEventsSection from "./FamilyEventsSection";
import ExtraActivitiesSection from "./ExtraActivitiesSection";


function FamilyVisitPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Family Visit"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            showButton={false}
        />
        <DetailsSection />
        <ExplorationSection/>
        {/* {Childern Accounts} */}
        <AdvertisementSection 
            heading="Young Friend subscription"
            detail="Sleep in the Museum galleries, discover their secrets and get closer to history as a Young Friend subscriber."
            buttonText="Subscribe now"
        />
        <FamilyEventsSection />
        <FacilitiesSection/>
        <Divider
            sx={{
            borderColor: theme.palette.primary.lightmain,
            mx: 2,
            my: 2,
            }}
        />
        <ExtraActivitiesSection/>
        <Footer />
    </ThemeProvider>
    )
}

export default FamilyVisitPage;
