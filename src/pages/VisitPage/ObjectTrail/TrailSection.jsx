import React from 'react';
import {  EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function TrailSection() {

  const visitInfo = [
    {
      id: 1,
      title: "One hour at the Museum",
      subtitle: "This trail will take you on a whirlwind tour of the history of the world.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 2,
      title: "Three hours at the Museum",
      subtitle: "This three-hour trail showcases the most popular objects on display.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 3,
      title: "Tutankhamun: ancient and modern perspectives",
      subtitle: " Follow the iconic and revealing story of the boy king Tutankhamun on an object trail at the British Museum.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore More"
    },
    {
      id: 4,
      title: "Collecting and empire trail",
      subtitle: "Learn how colonial relationships shaped the British Museum's collection.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 5,
      title: "Greek Revival architecture: simplicity and splendour",
      subtitle: " In this trail embark on a journey through the British Museum to see and learn more about Greek Revival architecture.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Explore More"
    },
    {
      id: 6,
      title: "Twelve objects to see with children",
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

export default TrailSection;
