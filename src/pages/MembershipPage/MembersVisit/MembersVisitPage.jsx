import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import AdvertisementSection from "../../../components/ui/AdvertismentCard";
import MembershipContactSection from "../../../components/ui/MembershipContactSection";

//section components
import GuidingSection from "./GuidingSection"
import MembersVisitDetailSection from "./MembersVisitDetailSection"
import ExhibitionsDetailSection from "./ExhibitionsDetailSection";
import FacilitiesSection from "./FacilitiesSection";

function MembersVisitPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Visiting as a Member"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            buttonText="Buy or renew Membership"
        />
        <MembersVisitDetailSection/>
        {/* Choose your Membership Part Remaining */}
        <FacilitiesSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <GuidingSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <ExhibitionsDetailSection/>
        {/* {Childern Accounts} */}
        <AdvertisementSection 
            heading="Young Friends scheme"
            detail="Sign up and receive emails packed full of fun activities, information on family events, priority booking for sleepovers and more."
            buttonText="Sign up for free"
        />
        <MembershipContactSection/>
        <Footer/>
    </ThemeProvider>
    )
}

export default MembersVisitPage;
