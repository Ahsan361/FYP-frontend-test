import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import AdvertisementSection from "../../../components/ui/AdvertismentCard";
import AdditionalFacilitiesSection from "../../CollectionPage/Galleries/AdditionalFacilitiesSection";
import GalleryDetailsSection from "../../CollectionPage/Galleries/GalleryDetailsSection";
import MuseumHighlightSection from "./MuseumHighlightSection";
import ArtifactsTiles from "./ArtifactsTiles";
import VirtualGallerySection from "./VirtualGallerySection";
function GalleryPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Galleries"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            showButton={false}
        />
        <GalleryDetailsSection/>
        <MuseumHighlightSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <ArtifactsTiles/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <VirtualGallerySection />
           {/* {Childern Accounts} */}
        <AdvertisementSection 
            heading="Sign up to our newsletters"
            detail="Sleep in the Museum galleries, discover their secrets and get closer to history as a Young Friend subscriber."
            buttonText="Subscribe now"
        />
        <AdditionalFacilitiesSection/>    
        <Footer />
    </ThemeProvider>
    )
}

export default GalleryPage;
