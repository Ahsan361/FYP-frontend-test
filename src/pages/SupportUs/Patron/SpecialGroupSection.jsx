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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "Explore Exhibitions"
  },
  {
    id: 2,
    title: "Ottley Group (pre-1900 European drawings)",
    subtitle: "Rs. 23,450 annually — the Ottley Group supports the acquisition of Old Master and English works for the Department of Prints and Drawings.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "View Events"
  },
  {
    id: 3,
    title: "Vollard Group (post-1945 prints and drawings)", 
    subtitle: "Rs 23,450 annually — the Vollard Group supports the Department of Prints and Drawingsl acquisition of modern and contemporary works on paper.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Plan Your Visit"
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
