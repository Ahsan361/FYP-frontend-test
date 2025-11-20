import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Divider, Grid, Typography, TextField, MenuItem } from '@mui/material';

// Custom Components
import { Loading } from '../../components/ui';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoadingBackground from "../../components/ui/LoadingBackground";
import HeroSection from '../../components/ui/HeroSection';
import DynamicAdvertisementSection from '../../components/ui/DynamicAdvertisementSection';
import CardsGrid from '../../components/ui/CardsGrid';
import ListingCard from '../../components/ui/Marketplace/ListingCard';

//section components
import Filler from "./Filler";
import HistoricalGiftsSection from './HistoricalGiftsSection';

//theme
import { lightTheme, darkTheme } from '../../styles/theme';

// Services
import { getListings } from '../../services/listingService';

function MarketPlacePage() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        const activeListings = data.filter(listing => listing.status === 'active');
        setListings(activeListings);
        setFilteredListings(activeListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = [...listings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredListings(filtered);
  }, [searchQuery, sortBy, listings]);

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
      <Navbar />

      <HeroSection
        heading="MarketPlace"
        buttonText="Explore"
        description="📍 Discover unique cultural heritage NFTs and artifacts from Pakistan's rich history."
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

      {/* NFT Listings Section */}
      <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h1"
          sx={{
            textAlign: "left",
            mb: 4,
            fontWeight: 600,
          }}
        >
          NFT Artifacts Marketplace
        </Typography>

        {/* Search and Sort */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search artifacts..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, minWidth: 250 }}
          />
          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
          </TextField>
        </Box>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No listings found
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredListings.map((listing) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={listing._id}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

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
        heading="Art through the ages"
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
        heading="With love from the Pakistan Museum"
        detail="Discover the perfect gift for a history lover with our carefully curated selection"
        buttonText="Shop Now"
        backgroundImage="/advertisementImage7.jpg"
        overlayOpacity={0.6}
        textAlignment="left"
        contentPosition="left"
      />                    

      <Filler />
      <Footer />
    </ThemeProvider>
  );
}

export default MarketPlacePage;