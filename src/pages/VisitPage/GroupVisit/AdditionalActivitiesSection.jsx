import React from 'react';
import { useMediaQuery} from '@mui/material';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import { lightTheme, darkTheme } from '../../../styles/theme';
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function AdditionalActivitiesSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const visitInfo = [
    {
      id: 1,
      title: "Plan your visit",
      subtitle: "Find travel, entry and facilities information and details of our Museum activities.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 2,
      title: "Accessibility at the Museum",
      subtitle: "Find out how to make the most of your visit to the Museum.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 3,
      title: "Exhibitions and events",
      subtitle: "Discover our latest exhibitions and events, including 'Hiroshige: artist of the open roadl.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore More"
    },
    {
      id: 4,
      title: "Out-of-hours tours",
      subtitle: "Book your ticket in advance and enjoy an exclusive out-of-hours tour before the gates open to the public. Adults 235.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Explore More"
    }
  ];

  return (
    <ExplorationGrid
      title="You may also be interested in"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default AdditionalActivitiesSection;
