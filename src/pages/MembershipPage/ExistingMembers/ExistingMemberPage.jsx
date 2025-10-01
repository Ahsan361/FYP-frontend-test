import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import ExistingMemberDetailSection from "./ExistingMemberDetailSection"
import AdvertisementSection from "../../../components/ui/AdvertismentCard";
import FacilitiesSection from "./FacilitiesSection";
import MembershipContactSection from "../../../components/ui/MembershipContactSection";

function ExistingMemberPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Existing Members"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="/advertisementImage3.jpg"
            buttonText="Buy or renew Membership"
        />
        <ExistingMemberDetailSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        
        {/* Choose your Membership Part Remaining */}
        <FacilitiesSection/>
        {/* {Childern Accounts} */}
        <AdvertisementSection 
            heading="Upgrade your Membership"
            detail="Share your experience. Bring a guest and enjoy the advantages of being a Member with someone else."
            buttonText="Add more benefits"
            buttonPath="/membership/become-member"
        />
        <MembershipContactSection/>
        <Footer/>
    </ThemeProvider>
    )
}

export default ExistingMemberPage;
