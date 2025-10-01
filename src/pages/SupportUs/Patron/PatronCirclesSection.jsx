import React from 'react';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function PatronCirclesSection() {
  const PatronFacilitiesInfo = [
    {
      id: 1,
      title: "Sloane Circle",
      subtitle: "Rs. 12,000 per year — Get special access to exhibitions and enjoy a closer connection with the museum.",
      icon: <EventSeat />,
      image: "/assets/pages/e1.jpg",
      actionText: "Explore Exhibitions",
      path: "/explore"
    },
    {
      id: 2,
      title: "Cracherode Circle",
      subtitle: "Rs. 26,000 per year — Join big events, meet experts, and enjoy special museum activities.",
      icon: <Map />,
      image: "/assets/pages/s2.jpg",
      actionText: "View Events",
      path: "/explore"
    },
    {
      id: 3,
      title: "Brooke Sewell Circle",
      subtitle: "Rs. 3,500 per year — Take part in unique dinners, trips, and special programs with the museum team.",
      icon: <Museum />,
      image: "/assets/pages/q-h2.jpg",
      actionText: "Plan Your Visit",
      path: "/PlanVisitPage"
    },
    {
      id: 4,
      title: "Godman Circle",
      subtitle: "Rs. 1,500 per year — Enjoy guided tours, exhibitions, and after-hours visits.",
      icon: <FamilyRestroom />,
      image: "/assets/pages/e-e/wg3i.jpg",
      actionText: "Visit Members' Room",
      path: "/membership/become-member"
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
