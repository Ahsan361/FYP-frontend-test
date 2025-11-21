import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import QuoteTile from "../../../components/ui/QuoteTile";

//sections components
import DonatePageDetailsSection from "./DonatePageDetailsSection";
import SupportMethodsSection from "./SupportMethodsSection";
import AFiller from "./AFiller"
import BFiller from "./BFiller";
import CFiller from "./CFiller";

function DonatePage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Donate to the British Museum"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            buttonText={"Donate Now"}
        />
        <DonatePageDetailsSection/>
        <AFiller/>
        <BFiller/>
        <CFiller/>
        <QuoteTile
            title="Testimonial"
            showTitle={true}
            quote="❛The chief reason why I want to and do support the British Museum is simply that I love visiting, finding a new room I have not yet explored. I can spend a whole day there. The visiting collections are brilliant and a fantastic opportunity to see artefacts here in London which I had never even dreamed I would see.❜"
            author="Anonymous"
        />
        <QuoteTile
            quote="❛I support the Museum as I value greatly its collections, ethos of operating, and free access to anyone wishing to visit, either in person or online. I particularly enjoy the art works and exhibitions and have spent many inspiring hours in the galleries.❜"
            author="David, Member since 2008"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <SupportMethodsSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <Footer/>
    </ThemeProvider>
    )
}

export default DonatePage;
