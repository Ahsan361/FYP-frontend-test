import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from '../../../styles/theme';
import { useSelector } from "react-redux";

//my custom components
import { Navbar } from "../../../components/ui";
import Footer from '../../../components/Footer/Footer'
import AdvertisementSection from "../../../components/ui/AdvertismentCard";

//section components
import OnlineFacilitiesSection from "./OnlineFacilitiesSection";
import CollectionThemeSection from "./CollectionThemeSection";
import Filler from "./Filler";
import OnlineGalleriesDetailsSection from "./OnlineGalleriesDetailsSection";
import SearchSection from "./SearchSection/SearchSection";
import SocialConnectionSection from "./SocialConnectionSection";

function OnlineGalleryPage(){
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    return(
        <ThemeProvider theme= {theme}>
        <CssBaseline/>
        <Navbar />
        <SearchSection/>
        <SocialConnectionSection/>
        <OnlineGalleriesDetailsSection/>
        {/* <CarouselSlider is yet to be implemnted here/> */}
        <CollectionThemeSection/>
        <Filler/>
        <AdvertisementSection 
            heading="Sign up to our newsletters"
            detail="Stay connected and receive all our latest news, stories and ways to explore the British Museum from home."
            buttonText="Sign up"
        />
        <OnlineFacilitiesSection/>
        <Footer />
    </ThemeProvider>
    )
}

export default OnlineGalleryPage;
