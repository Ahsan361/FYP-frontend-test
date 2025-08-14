import React from 'react';
import { useMediaQuery} from '@mui/material';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import { lightTheme, darkTheme } from '../../../styles/theme';
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function ExtraActivitiesSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const FacilitiesInfo = [
  {
    id: 1,
    title: "Unlimited entry to exhibitions",
    subtitle: "See every exhibition as many times as you want, and experience the depth and detail of the curators' work.",
    icon: <EventSeat />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "Explore Exhibitions"
  },
  {
    id: 2,
    title: "Members' events",
    subtitle: "Enjoy exclusive experiences, from lectures, tours and workshops to film screenings and free events.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "View Events"
  },
  {
    id: 3,
    title: "Visiting as a Member",
    subtitle: "Find practical information, highlight trails and a wealth of ideas on what to see and do.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Plan Your Visit"
  },
  {
    id: 4,
    title: "Members' Room",
    subtitle: "Relax and recharge then explore more of the Museum's collection.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "Visit Members' Room"
  }
];


  return (
    <ExplorationGrid
      title="You may also be interested in"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={FacilitiesInfo}
    />
  );
}

export default ExtraActivitiesSection;
