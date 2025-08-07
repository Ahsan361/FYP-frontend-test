import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';

// Custom Components
import { Button, Loading } from '../../components/ui';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { lightTheme, darkTheme } from '../../styles/theme';

import Hero from './heroSection';
import ArtifactsSection from './ArtifactsSection';
import CollectionSection from './CollectionSection';
import QuickActionsSection from './QuickActionsSection';
import NewsletterSection from './NewsletterSection';
import StatisticsSection from './StatisticsSection';

function EnhancedLandingPage() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const [loading, setLoading] = useState(true);

  // Simulated loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Loading message="Loading MIRAS Digital Heritage..." size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Statistics Section */}
      <StatisticsSection/>

      {/* {ArtifactsSection} */}
      <ArtifactsSection/>
      {/* Collections Section */}
      <CollectionSection/>

      {/* Quick Actions Section */}
      <QuickActionsSection/>

      {/* Newsletter/CTA Section */}
      <NewsletterSection/>

      {/* Footer */}
      <Footer />
    </ThemeProvider>
  );
}

export default EnhancedLandingPage;
