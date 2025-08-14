import React from 'react';
import { EventSeat, Map, Museum } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function SupportMethodsSection() {
  const SupportMethodsInfo = [
  {
    id: 1,
    title: "Become a Member",
    subtitle: "Able to donate 269 or more? Support the work of the Museum while enjoying Membership benefits.",
    icon: <EventSeat />,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    actionText: "Find out more"
  },
  {
    id: 2,
    title: "Become a Patron",
    subtitle: " Discover the difference that you can make as a Patron, and become more involved in the life and evolution of the Museum. ",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
    actionText: "Find out more"
  },
  {
    id: 3,
    title: "Leave a legacy",
    subtitle: "Remembering the British Museum by leaving a gift in your will, no matter what size, can help us build and care for the collection.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop",
    actionText: "Find out more"
  }
];



  return (
    <ExplorationGrid
      title="Other ways to support"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={SupportMethodsInfo}
    />
  );
}

export default SupportMethodsSection;
