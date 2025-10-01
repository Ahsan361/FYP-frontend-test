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
      title: "Pakistan's Heritage",
      subtitle: "Explore the ancient Indus Valley Civilization and Gandhara art that shaped the cultural foundations of Pakistan.",
      icon: <EventSeat />,
      image: "/assets/pages/e1.jpg",
      actionText: "View Exhibitions and Events",
      path: "/explore"
    },
    {
      id: 2,
      title: "Wildlife of Pakistan",
      subtitle: "Discover the diverse wildlife of Pakistan, from the snow leopards of the north to the Indus River dolphins.",
      icon: <Map />,
      image: "/assets/pages/s2.jpg",
      actionText: "View Gallery",
      path: "/Collections/galleries"
    },
    {
      id: 3,
      title: "Mughal Era",
      subtitle: "Step into the Mughal Empire's legacy through art, architecture, and artifacts preserved in Pakistan's museums.",
      icon: <Museum />,
      image: "/assets/pages/q-h2.jpg",
      actionText: "Explore Galleries",
      path: "/Collections/galleries"
    },
    {
      id: 4,
      title: "Memories of Partition",
      subtitle: "Experience the stories, struggles, and resilience of 1947 through Pakistan’s Partition Museum collections.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/e-e/wg3i.jpg",
      actionText: "Family Guide",
      path: "/Collections/galleries"
    },
    {
      id: 5,
      title: "Art & Culture of Pakistan",
      subtitle: "Delve into the rich traditions, crafts, and artistic heritage showcased across Pakistan’s cultural museums.",
      icon: <Map />,
      image: "/assets/pages/e-e/g1l.jpg",
      actionText: "View Gallery",
      path: "/Collections/galleries"
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
