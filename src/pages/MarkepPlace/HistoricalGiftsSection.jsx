import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline} from '@mui/material';

// Custom Components
import CardsGrid from '../../components/ui/CardsGrid';

//theme
import { lightTheme, darkTheme } from '../../styles/theme';


function HistoricalGiftsSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  const historical_gifts_categories = [
    {
      category: "Shop luxury gifts",
      image: "/advertisementCard4.jpg",
      link: "#"
    },
    {
      category: "Shop calendars and diaries",
      image: "/advertisementCard5.jpg",
      link: "#"
    },
    {
      category: "Shop gifts under £20",
      image: "/advertisementCard6.jpg",
      link: "#"
    },
    {
      category: "latest",
      image: "/advertisementCard7.jpg",
      link: "#"
    },
    {
      category: "Slatest",
      image: "/advertisementCard8.jpg",
      link: "#"
    },
    {
      category: "latest3",
      image: "/advertisementCard9.jpg",
      link: "#"
    }
  ];

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <CardsGrid 
          categories={historical_gifts_categories} 
          title={"The Pakistan Museum Shop - Historical Gifts and Souvenirs"}
        />
    </ThemeProvider>
  );
}

export default HistoricalGiftsSection;
