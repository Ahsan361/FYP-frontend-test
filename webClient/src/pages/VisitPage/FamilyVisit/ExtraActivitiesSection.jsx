import React from 'react';
import { EventSeat,Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function ExtraActivitiesSection() {

  const visitInfo = [
    {
      id: 1,
      title: "Sleepovers",
      subtitle: "Spend a night at the Museum and sleep in galleries surrounded by ancient monuments.",
      icon: <EventSeat />,
      image: "/assets/pages/e-e/g1l.jpg",
      actionText: "View Exibitions and Events",
      path:"/explore"
    },
    {
      id: 2,
      title: "Home Educators",
      subtitle: "Explore our Home Educators offer of presentations and resources alongside our Home Educators Day information.",
      icon: <Map />,
      image: "/assets/pages/e-e/wg3i.jpg",
      actionText: "View Gallery",
      path:"/collections/online"
    },
    {
      id: 3,
      title: "Young Friends",
      subtitle: "Discover two million years of history by becoming a Young Friend.",
      icon: <Museum />,
      image: "/assets/pages/e-e/g3h.jpg",
      actionText: "Explore Galleries",
      path:"/collections/galleries"
    },
    {
      id: 4,
      title: "Videos for Young Learners",
      subtitle: "Our YouTube channel includes a playlist of short videos for young learners looking at different historical periods, themes and objects.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/e-e/g2s.jpg",
      actionText: "Family Guide",
      path:"/collections/online"      
    }
  ];

  return (
    <ExplorationGrid
      title="Also for families"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default ExtraActivitiesSection;
