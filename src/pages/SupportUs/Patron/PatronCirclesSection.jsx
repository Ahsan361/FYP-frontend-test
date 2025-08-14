import React from 'react';
import { useMediaQuery } from '@mui/material';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function PatronCirclesSection() {

  const PatronFacilitiesInfo = [
  {
    id: 1,
    title: "Sloane Circle",
    subtitle: "Rs. 12,000 annually — Sloane Patrons enjoy a bespoke relationship with the Museum and collection, so you can tailor your experience with us.",
    icon: <EventSeat />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "Explore Exhibitions"
  },
  {
    id: 2,
    title: "Cracherode Circle",
    subtitle: "Rs. 26,000 annually — Cracherode Patrons enjoy remarkable experiences at the Museum and access to special Museum- wide events.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "View Events"
  },
  {
    id: 3,
    title: "Brooke Sewell Circle",
    subtitle: "Rs 3,500 annually — Brooke Sewell Patrons are invited to unique events, such as the Director's Dinner and trips abroad with Museum experts. ",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Plan Your Visit"
  },
  {
    id: 4,
    title: "Godman Circle",
    subtitle: "Rs 1,500 annually — Godman Patrons have the opportunity to engage with the Museum's world-class exhibitions and out-of-hours tours.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "Visit Members' Room"
  }
];


  return (
    <ExplorationGrid
      title="Patron Circles"
      subtitle="We have four Patron Circles to choose from. Each provides the opportunity to support the Museum’s important work and gives access to a unique selection of benefits, allowing you to pick the option most suited to you."
      items={PatronFacilitiesInfo}
    />
  );
}

export default PatronCirclesSection;
