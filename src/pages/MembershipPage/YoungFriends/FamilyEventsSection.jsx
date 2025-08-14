import React from 'react';
import { EventSeat, Map, Museum } from '@mui/icons-material';


// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function FamilyEventsSection() {

  const FamilyEventsInfo = [
  {
    id: 1,
    title: "Visiting as a family",
    subtitle:
      "Make the most of your visit, with Museum Missions, explorer trails and activity backpacks, plus Little Feet sessions for under-5s.",
    icon: <EventSeat />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "Find out more"
  },
  {
    id: 2,
    title: "Family-friendly events",
    subtitle:
      "Browse a selection of Museum events suitable for families, as well as those designed to entertain children under 5.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "Find out more"
  },
  {
    id: 3,
    title: "Sleepovers at the Museum",
    subtitle:
      "Experience the Museum after dark with workshops, activities and storytelling, then fall asleep among ancient rulers and gods.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Find out more"
  }
];



  return (
    <ExplorationGrid
      title="Family visits and events"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={FamilyEventsInfo}
    />
  );
}

export default FamilyEventsSection;
