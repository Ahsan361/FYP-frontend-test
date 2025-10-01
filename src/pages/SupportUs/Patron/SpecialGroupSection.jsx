import React from 'react';
import { EventSeat, Map, Museum } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function SpecialGroupSection() {
  const PatronFacilitiesInfo = [
    {
      id: 1,
      title: "CaMMEA Group",
      subtitle: "Rs. 24,000 annually - CaMMEA supports the Museum's growing collection of more than 200 established and emerging artists from the Middle East. ",
      icon: <EventSeat />,
      image: "/assets/pages/s2.jpg",   
      actionText: "Explore Exhibitions",
      path: "/explore"
    },
    {
      id: 2,
      title: "Ottley Group (pre-1900 European drawings)",
      subtitle: "Rs. 23,450 annually — the Ottley Group supports the acquisition of Old Master and English works for the Department of Prints and Drawings.",
      icon: <Map />,
      image: "/assets/pages/e1.jpg",  
      actionText: "View Events",
      path: "/explore"
    },
    {
      id: 3,
      title: "Vollard Group (post-1945 prints and drawings)", 
      subtitle: "Rs 23,450 annually — the Vollard Group supports the Department of Prints and Drawingsl acquisition of modern and contemporary works on paper.",
      icon: <Museum />,
      image: "/assets/pages/q-h2.jpg", 
      actionText: "Plan Your Visit",
      path: "/PlanVisitPage"
    }
  ];


  return (
    <ExplorationGrid
      title="Special Interest Groups"
      subtitle="In addition to Patron Circles, there are a number of Special Interest Groups that support specific areas of the collection. Special Interest Group members are invited to tailored events throughout the year. "
      items={PatronFacilitiesInfo}
    />
  );
}

export default SpecialGroupSection;
