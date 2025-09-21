import React from 'react';
import {  EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import { lightTheme, darkTheme } from '../../../styles/theme';
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function CollectionThemeSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

const themesInfo = [
  {
    id: 1,
    title: "Americas",
    subtitle: "The Americas encapsulate the remarkable narratives of cultural achievement and human experience across two continents.",
    icon: <EventSeat />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "View Exhibitions and Events",
    path:"/explore"
  },
  {
    id: 2,
    title: "Animals",
    subtitle: "Explore the many wild and wonderful depictions of animals found in the Museum's collection.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "View Gallery",
    path:"/Collections/galleries"
  },
  {
    id: 3,
    title: "China",
    subtitle: "China is one of the world's oldest civilisations and home to a quarter of the world's population.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Explore Galleries",
    path:"/Collections/galleries"
  },
  {
    id: 4,
    title: "Death and memory",
    subtitle: "Discover the many tales of death and memory from the Museum.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "Family Guide",
    path:"/Collections/galleries"
  },
  {
    id: 5,
    title: "Africa",
    subtitle: "Delve into the Museum's stories from Africa.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "View Gallery",
    path:"/Collections/galleries"
  }
];

  return (
    <ExplorationGrid
      title="Museum highlights"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={themesInfo}
    />
  );
}

export default CollectionThemeSection;
