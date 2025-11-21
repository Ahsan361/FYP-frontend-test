import React from 'react';
import { EventSeat, Map, Museum } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function OnlineFacilitiesSection() {

  const visitInfo = [
    {
      id: 1,
      title: "Read the blog",
      subtitle: "Thought-provoking posts from conservators, curators and scientists that give you the inside knowledge on our collection.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 2,
      title: "Galleries ",
      subtitle: "Discover over 60 free galleries at the British Museum, featuring ancient artifacts and diverse cultural exhibits across multiple floors.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 3,
      title: "People behind the collection",
      subtitle: "Read the fascinating histories behind the Museum's most prolific collectors.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore More"
    },
  ];

  return (
    <ExplorationGrid
      title="You may also be interested in"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default OnlineFacilitiesSection;
