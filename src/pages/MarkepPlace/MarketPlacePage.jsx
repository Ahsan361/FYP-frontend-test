import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Divider} from '@mui/material';

// Custom Components
import { Loading } from '../../components/ui';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoadingBackground from "../../components/ui/LoadingBackground"
import HeroSection from '../../components/ui/HeroSection';
import DynamicAdvertisementSection from '../../components/ui/DynamicAdvertisementSection';
import CardsGrid from '../../components/ui/CardsGrid';

//section components
import Filler from "./Filler";
import HistoricalGiftsSection from './HistoricalGiftsSection';

//theme
import { lightTheme, darkTheme } from '../../styles/theme';


function MarketPlacePage() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      category: "Shop luxury gifts",
      image: "/advertisementCard1.jpg",
      link: "#"
    },
    {
      category: "Shop calendars and diaries",
      image: "/advertisementCard2.jpg",
      link: "#"
    },
    {
      category: "Shop gifts under £20",
      image: "/advertisementCard3.jpg",
      link: "#"
    }
  ];

  // Simulated loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ height: "100vh", position: "relative" }}>
          <LoadingBackground />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Loading message="Loading MIRAS Digital Heritage..." size={60} />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Navigation */}
        <Navbar />

        <HeroSection
            heading="MarketPlace"
            buttonText="Explore"
            description="📍 This photo showcases the stunning landscape of the Rocky Mountains at sunrise. Perfect for nature lovers and adventure seekers."
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        />
        <DynamicAdvertisementSection
            heading="Feel at home with history"
            detail="Dive into our extensive homeware range where history and culture inspire contemporary and stylish designs"
            buttonText="Shop Now"
            backgroundImage="/advertisementImage1.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <CardsGrid categories={categories} />
        <DynamicAdvertisementSection
            heading="Ancient Pakistan: living traditions"
            detail="Celebrate the cultural heritage of India with beautifully crafted pieces"
            buttonText="Shop Now"
            backgroundImage="/advertisementImage2.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />
        <HistoricalGiftsSection />
        <DynamicAdvertisementSection
            headig="Art through the ages"
            detail="Customise your walls with incredible artworks inspired by the Museum's collection of Prints and Drawings"
            buttonText="Shop Now"
            backgroundImage="/advertisementImage3.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <DynamicAdvertisementSection
            heading="Inspired by Iznik pottery"
            detail="Shop our collection celebrating the pottery and ceramics of Iznik, including kitchenware, home décor, fashion and small souvenirs"
            buttonText="Shop Now"
            backgroundImage="/advertisementImage4.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <DynamicAdvertisementSection
            heading="Culture meets style"
            detail="Make a statement with our range of fashion and accessories inspired by art and history"
            buttonText="Shop Now"
            backgroundImage="/advertisementImage5.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <DynamicAdvertisementSection
            heading="Find your forever piece"
            detail="Explore our treasure trove of unique jewellery pieces inspired by art, history and nature"
            buttonText="Shop Now"
            backgroundImage="/advertisementImage6.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />   
        <Divider 
            sx={{ 
            borderColor: theme.palette.divider,
            borderWidth: { xs: "2rem", sm: "4rem", md: '8rem' }
            }} 
        />
        <DynamicAdvertisementSection
            heading="With love from the Pakistan Museum "
            detail="Discover the perfect gift for a history lover with our carefully curated selection    "
            buttonText="Shop Now"
            backgroundImage="/advertisementImage7.jpg"
            overlayOpacity={0.6}
            textAlignment="left"
            contentPosition="left"
        />                    
        <Filler />
        {/* Footer */}
        <Footer />
    </ThemeProvider>
  );
}

export default MarketPlacePage;
