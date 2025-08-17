import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import QuoteTile from "../../../components/ui/QuoteTile";

//sections components
import CorporateSupportDetailsSection from "./CorporateSupportDetailsSection";
import CorporateSponsorshipSection from "./CorporateSponsorshipSection"
import CorporatePartnershipSection from "./CorporatePartnershipSection";

function CorporateSupport(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Corporate support"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            buttonText={"Donate Now"}
        />
        <CorporateSupportDetailsSection/>
        <CorporateSponsorshipSection />
        <QuoteTile
            quote="❛Mitsubishi Corporation has been a proud supporter of the Mitsubishi Corporation Japanese Galleries since 2008. We also support a curatorial position within the Japanese section and have been the sole sponsor of special exhibitions, such as Hokusai: Beyond the Great Wave, in 2017. Partnership with the Museum enables us to engage our key stakeholders about the rich history of Japanese culture and offers us unrivalled access to the collection for our employees and wider network.❜"
            author="Mitsubishi Corporation"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <CorporatePartnershipSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        {/* SLider here */}
        <Footer/>
    </ThemeProvider>
    )
}

export default CorporateSupport;
