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
      image: "/assets/pages/s2.jpg",
      actionText: "View Exibitions and Events",
      path:"/explore"
    },
    {
      id: 2,
      title: "Museum explorer trails",
      subtitle: "Take a fascinating journey of discovery around the Museum.",
      icon: <Map />,
      image: "/assets/pages/s3.jpg",
      actionText: "View Gallery",
      path:"/PlanVisitPage/object-trail"
    },
    {
      id: 3,
      title: "Backpacks",
      subtitle: "Choose an African adventure, Life in ancient Greece, or become an archaeologist. Explore the Museum with a fun-filled activity backpack.",
      icon: <Museum />,
      image: "/assets/pages/q-h2.jpg",
      actionText: "Explore Galleries",
      path:"/collections/galleries"
    },
    {
      id: 4,
      title: "Twelve objects to see with children ",
      subtitle: "From ancient armour to mummies, travel back in time on this captivating trail.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/h3.jpg",
      actionText: "Family Guide",
      path:"/collections/online"
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
