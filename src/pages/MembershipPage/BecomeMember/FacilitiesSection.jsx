import React from 'react';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';


// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function FacilitiesSection() {

  const FacilitiesInfo = [
  {
    id: 1,
    title: "Unlimited entry to exhibitions",
    subtitle: "See every exhibition as many times as you want, and experience the depth and detail of the curators' work.",
    icon: <EventSeat />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "Explore Exhibitions"
  },
  {
    id: 2,
    title: "Members' events",
    subtitle: "Enjoy exclusive experiences, from lectures, tours and workshops to film screenings and free events.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "View Events"
  },
  {
    id: 3,
    title: "Visiting as a Member",
    subtitle: "Find practical information, highlight trails and a wealth of ideas on what to see and do.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Plan Your Visit"
  },
  {
    id: 4,
    title: "Members' Room",
    subtitle: "Relax and recharge then explore more of the Museum's collection.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "Visit Members' Room"
  },
  {
    id: 5,
    title: "Existing Members",
    subtitle: "Explore your Membership benefits and find out how your support is integral to the work of the Museum.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "Explore Benefits"
  },
  {
    id: 6,
    title: "Members' exclusive content",
    subtitle: "Browse the British Museum Magazine archive, watch special Members' YouTube videos and more.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "View Exclusive Content"
  }
];


  return (
    <ExplorationGrid
      title="Make the most of your Membership"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={FacilitiesInfo}
    />
  );
}

export default FacilitiesSection;
