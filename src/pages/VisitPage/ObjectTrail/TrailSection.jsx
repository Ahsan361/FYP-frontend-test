import React from 'react';
import {  EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function TrailSection() {

  const visitInfo = [
    {
      id: 1,
      title: "One Hour in Lahore Museum",
      subtitle: "Take a quick journey through Gandhara sculptures, Mughal paintings, and rare manuscripts.",
      icon: <EventSeat />,
      image: "https://visitlahore.com/wp-content/uploads/2020/03/4-9.jpg",
      actionText: "Explore More"
    },
    {
      id: 2,
      title: "Half Day in Taxila Museum",
      subtitle: "Discover Buddhist relics, stone carvings, and artifacts from the Gandhara civilization.",
      icon: <Map />,
      image: "https://travelwithlens.com/wp-content/uploads/2023/11/Taxila-museum-6s.jpeg.webp",
      actionText: "Explore More"
    },
    {
      id: 3,
      title: "Indus Valley Civilization Trail",
      subtitle: "Follow the story of Mohenjo-daro and Harappa with ancient pottery, seals, and urban planning wonders.",
      icon: <Museum />,
      image: "https://historified.in/wp-content/uploads/2025/02/db62dc97fd2d413459b10bc1b4260103.jpg",
      actionText: "Explore More"
    },
    {
      id: 4,
      title: "Islamic Art and Calligraphy",
      subtitle: "Admire centuries of Quranic manuscripts, calligraphy, and Islamic decorative arts.",
      icon: <FamilyRestroom />,
      image: "https://i.etsystatic.com/27977671/r/il/d7f408/4848086227/il_1588xN.4848086227_iwan.jpg",
      actionText: "Explore More"
    },
    {
      id: 5,
      title: "Heritage Architecture of Pakistan",
      subtitle: "Walk through exhibits showcasing Mughal, Sikh, and Colonial architectural heritage.",
      icon: <FamilyRestroom />,
      image: "https://archive-images.prod.global.a201836.reutersmedia.net/2018/03/01/LYNXNPEE202JN.JPG",
      actionText: "Explore More"
    },
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
