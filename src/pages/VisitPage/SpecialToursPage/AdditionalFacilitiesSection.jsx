import React from 'react';
import { useMediaQuery} from '@mui/material';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import { lightTheme, darkTheme } from '../../../styles/theme';
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function AdditionalFacilitiesSection() {
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
      title: "Tours and talks",
      subtitle: "From ancient Egypt to the Americas, get to know more about the collection on a tour, at a talk or via one of our Hands on desks.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 3,
      title: "Travel trade tours",
      subtitle: "Experience the UKs most popular Museum with a private out-of-hours tour.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore More"
    },
    {
      id: 4,
      title: "Food and drink",
      subtitle: "Discover diverse dining options at the British Museum, from casual cafés to elegant restaurants, perfect for any appetite or occasion.",
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

export default AdditionalFacilitiesSection;
