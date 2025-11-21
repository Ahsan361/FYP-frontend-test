import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import HeroSection from "../../../components/ui/HeroSection";
import MembershipContactSection from "../../../components/ui/MembershipContactSection";
import QuoteTile from "../../../components/ui/QuoteTile";
import CarouselSlider from "../../../components/ui/CarouselSlider";
//sections components
import YoungFriendsDeitailSection from "./YoungFriendsDeitailSection";
import FamilyEventsSection from "./FamilyEventsSection";
import MagzineSection from "./MagzineSection"
import VediosSection from "./VediosSection";

function YoungFriendsPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <HeroSection
            heading="Young Friends"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="/advertisementImage5.jpg"
            showButton={false}
        />
        <YoungFriendsDeitailSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <FamilyEventsSection/>
        <QuoteTile
            title="What our young friends say"
            showTitle={true}
            quote="It was really cool to look at artefacts that were 3,000 years old and imagine that the mummies were once real humans. I learnt my name in hieroglyphs and drew amulets – very fun!"
            author="Eva, aged 12, after a Museum sleepover"
        />
        <MagzineSection/>
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        {/* CarouselSlider here  */}
        <CarouselSlider/>
        <VediosSection/>
        {/* {Childern Accounts} */}
        <MembershipContactSection/>
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

export default YoungFriendsPage;
