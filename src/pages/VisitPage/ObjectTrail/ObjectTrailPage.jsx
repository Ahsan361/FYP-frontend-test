import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import { lightTheme, darkTheme } from '../../../styles/theme';
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";

//section components
import ObjectDetailsSection from "./ObjectDetailsSection";
import TrailSection from "./TrailSection";
import AdditionalFacilitiesSection from "./AdditionalFacilitiesSection";

function ObjectTrailPage() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Object trails"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="/advertisementCard7.jpg"
            showButton={false}
        />
        <ObjectDetailsSection/>
        <TrailSection />
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

export default ObjectTrailPage;
