import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import { lightTheme, darkTheme } from '../../../styles/theme';
import AdvertisementSection from "../../../components/ui/AdvertismentCard";

//section components
import AdditionalFacilitiesSection from "./AdditionalFacilitiesSection";
import MuseumDetailsSection from "./MuseumDetailsSection"

function MuseumMapPage() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Museum map"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            showButton={false}
        />
        <MuseumDetailsSection/>
        {/* {Membership Advertisement} */}
        <AdvertisementSection 
            heading="Become a Member"
            detail="Enjoy free unlimited entry to all exhibitions and access to exclusive Members' events and the Members' Room."
            buttonText="Become a member"
        />
        <AdditionalFacilitiesSection />
        <Footer />
    </ThemeProvider>
    )
}

export default MuseumMapPage;
