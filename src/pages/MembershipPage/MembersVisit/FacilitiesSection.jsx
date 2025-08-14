import React from 'react';
import { Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function FacilitiesSection() {

  const FacilitiesInfo = [
  {
    id: 1,
    title: "Members' events",
    subtitle: "Enjoy exclusive experiences, from lectures, tours and workshops to film screenings and free events.",
    icon: <Map />,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=250&fit=crop",
    actionText: "View Events"
  },
  {
    id: 2,
    title: "Little book of big ideas",
    subtitle: "Get inspiration on what not to miss during your next visit, plus everything on offer to Members.",
    icon: <Museum />,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop",
    actionText: "Read Now"
  },
  {
    id: 3,
    title: "Members' Room",
    subtitle: "Enjoy an exclusive space overlooking the Great Court.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=400&h=250&fit=crop",
    actionText: "Visit Members' Room"
  },
  {
    id: 4,
    title: "Galleries",
    subtitle: "Walk through two million years of history and culture across more than 50 galleries.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533646942233-8ac485bfa4a7?w=400&h=250&fit=crop",
    actionText: "Explore Galleries"
  },
  {
    id: 5,
    title: "Members' highlight object trail",
    subtitle: "Rediscover the permanent collection through objects acquired and funded with contribution from the British Museum Friends.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1584367369853-8b9964af7bda?w=400&h=250&fit=crop",
    actionText: "Follow the Trail"
  },
  {
    id: 6,
    title: "Museum map",
    subtitle: "Navigate the Museum with ease, using our floor-by-floor plan and discover what not to miss.",
    icon: <FamilyRestroom />,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
    actionText: "View Map"
  }
];

  return (
    <ExplorationGrid
      title="Plan your visit"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={FacilitiesInfo}
    />
  );
}

export default FacilitiesSection;
