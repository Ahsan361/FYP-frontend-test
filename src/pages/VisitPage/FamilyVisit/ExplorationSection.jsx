import React from 'react';
import {  EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function ExplorationSection() {

  const visitInfo = [
    {
      id: 1,
      title: "Museum Missions",
      subtitle: "These free Museum Missions will get you and your family talking, laughing and learning as you explore the Museum with your phone or tablet.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "View Exibitions and Events"
    },
    {
      id: 2,
      title: "Museum explorer trails",
      subtitle: "Take a fascinating journey of discovery around the Museum.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "View Gallery"
    },
    {
      id: 3,
      title: "Backpacks",
      subtitle: "Choose an African adventure, Life in ancient Greece, or become an archaeologist. Explore the Museum with a fun-filled activity backpack.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore Galleries"
    },
    {
      id: 4,
      title: "Twelve objects to see with children ",
      subtitle: "From ancient armour to mummies, travel back in time on this captivating trail.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
    }
  ];

  return (
    <ExplorationGrid
      title="Explore the museum"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default ExplorationSection;
