import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box} from '@mui/material';

// Custom Components
import { Loading } from '../../components/ui';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { lightTheme, darkTheme } from '../../styles/theme';
import LoadingBackground from "../../components/ui/LoadingBackground"

import StaticHeroSection from './StaticHeroSection';
import ExhibitionsEventsSection from './ExhibitionsEventsSection';
import CollectionSection from './CollectionSection';
import QuickActionsSection from './QuickActionsSection';
import NewsletterSection from './NewsletterSection';
import StatisticsSection from './StatisticsSection';
import VisitMuseumSection from './VisitMuseumSection';

function LandingPage() {
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

      {/* Hero Section */}
      <StaticHeroSection />

      {/* Statistics Section */}
      <StatisticsSection/>

      {/* {ArtifactsSection} */}
      <ExhibitionsEventsSection/>
      {/* Collections Section */}
      <CollectionSection/>
      {/* {Visit Museum Section} */}
      <VisitMuseumSection />
      {/* Quick Actions Section */}
      <QuickActionsSection/>
      {/* Newsletter/CTA Section */}
      <NewsletterSection/>
      {/* Footer */}
      <Footer />
    </ThemeProvider>
  );
}

export default LandingPage;
