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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "View Exibitions and Events"
    },
    {
      id: 2,
      title: "Home Educators",
      subtitle: "Explore our Home Educators offer of presentations and resources alongside our Home Educators Day information.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "View Gallery"
    },
    {
      id: 3,
      title: "Young Friends",
      subtitle: "Discover two million years of history by becoming a Young Friend.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore Galleries"
    },
    {
      id: 4,
      title: "Videos for Young Learners",
      subtitle: "Our YouTube channel includes a playlist of short videos for young learners looking at different historical periods, themes and objects.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
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
