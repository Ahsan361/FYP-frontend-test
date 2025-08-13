import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import AdvertisementSection from "../../../components/ui/AdvertismentCard";
import OnlineFacilitiesSection from "./OnlineFacilitiesSection";
import CollectionThemeSection from "./CollectionThemeSection";
import Filler from "./Filler";
import OnlineGalleriesDetailsSection from "./OnlineGalleriesDetailsSection";

function OnlineGalleryPage(){
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
        <OnlineGalleriesDetailsSection/>
        <CollectionThemeSection/>
        <Filler/>
        <AdvertisementSection 
            heading="Sign up to our newsletters"
            detail="Stay connected and receive all our latest news, stories and ways to explore the British Museum from home."
            buttonText="Sign up"
        />
        <OnlineFacilitiesSection/>
        <Footer />
    </ThemeProvider>
    )
}

export default OnlineGalleryPage;
