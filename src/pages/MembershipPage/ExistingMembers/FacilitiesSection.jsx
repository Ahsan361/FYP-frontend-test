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
      image: "/assets/pages/e1.jpg",
      actionText: "Explore Exhibitions"
    },
    {
      id: 2,
      title: "Members' events",
      subtitle: "Enjoy exclusive experiences, from lectures, tours and workshops to film screenings and free events.",
      icon: <Map />,
      image: "/assets/pages/s2.jpg",
      actionText: "View Events"
    },
    {
      id: 3,
      title: "Visiting as a Member",
      subtitle: "Find practical information, highlight trails and a wealth of ideas on what to see and do.",
      icon: <Museum />,
      image: "/assets/pages/q-h2.jpg",
      actionText: "Plan Your Visit"
    },
    {
      id: 4,
      title: "Members' Room",
      subtitle: "Relax and recharge then explore more of the Museum's collection.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/e-e/wg3i.jpg",
      actionText: "Visit Members' Room"
    },
    {
      id: 5,
      title: "Existing Members",
      subtitle: "Explore your Membership benefits and find out how your support is integral to the work of the Museum.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/e-e/g1l.jpg",
      actionText: "Explore Benefits"
    },
    {
      id: 6,
      title: "Members' exclusive content",
      subtitle: "Browse the British Museum Magazine archive, watch special Members' YouTube videos and more.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/e1.jpg", // reused since slides had only 5
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
