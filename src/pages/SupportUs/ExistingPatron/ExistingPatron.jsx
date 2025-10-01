import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import MembershipContactSection from "../../../components/ui/MembershipContactSection";
import ExistingPatronTiles from "./ExistingPatronTiles";
//section components 
import ExistingPatronDetailSection from "./ExistingPatronDetailSection"
import ContentSection from "./ContentSection";
import Filler from "./Filler";

function ExistingPatronPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;

    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Existing Patrons"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="/assets/landing-page/static-hero-section/cover5.jpg"
            showButton={false}
        />
        <ExistingPatronDetailSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <ContentSection/>
        {/* Choose your Membership Part Remaining */}
        
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <Filler/>
        <ExistingPatronTiles/>
        <MembershipContactSection/>
        <Footer/>
    </ThemeProvider>
    )
}

export default ExistingPatronPage;
