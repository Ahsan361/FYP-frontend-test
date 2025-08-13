import { CssBaseline, ThemeProvider, Typography, Box, Grid, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import MemberDetailSection from "./MemberDetailSection"
import AdvertisementSection from "../../../components/ui/AdvertismentCard";
import MembershipBenefitSection from "./MembershipBenifitSection";
import FacilitiesSection from "./FacilitiesSection";
import MembershipContactSection from "../../../components/ui/MembershipContactSection";
import QuoteTile from "../../../components/ui/QuoteTile";

function BecomeMemberPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Membership"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            buttonText="Buy or renew Membership"
        />
        <MemberDetailSection/>
        <Divider
            sx={{
            borderColor: theme.palette.primary.lightmain,
            mx: 2,
            my: 2,
            }}
        />
        <MembershipBenefitSection/>
        <QuoteTile
            quote="Each visit to the Museum is different. I notice new things every time I return. Unlimited access to the exhibitions as a Member is great. I know I can take my time and even come back for a second (or third!) look."
            author="Yinsey, Member since 2013"
        />
        {/* Choose your Membership Part Remaining */}
        <FacilitiesSection/>
        {/* {Childern Accounts} */}
        <AdvertisementSection 
            heading="Young Friends scheme"
            detail="Sign up and receive emails packed full of fun activities, information on family events, priority booking for sleepovers and more."
            buttonText="Sign up for free"
        />
        <MembershipContactSection/>
        <QuoteTile
            quote="The ability to share all that the Museum has to offer with friends and family gives me great satisfaction. An experience shared is always better."
            author=" Paul, Member since 2013"
        />
        <Footer/>
    </ThemeProvider>
    )
}

export default BecomeMemberPage;
