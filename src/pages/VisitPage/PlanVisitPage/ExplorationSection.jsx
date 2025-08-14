import React from 'react';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function ExplorationSection() {

  const visitInfo = [
    {
      id: 1,
      title: "Exibition and Events",
      subtitle: "Discover our latest exhibitions and events, including 'Hiroshige: artist of the open road'.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "View Exibitions and Events"
    },
    {
      id: 2,
      title: "Galleries",
      subtitle: "Walk through two million years of history and culture across more than 50 galleries.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "View Gallery"
    },
    {
      id: 3,
      title: "Audio App",
      subtitle: "Our Audio app will help you make the most of your visit — available in multiple languages.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore Galleries"
    },
    {
      id: 4,
      title: "Family visits",
      subtitle: "From family facilities to activities and events, discover how to make the most of your day at the Museum.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
    },
    {
      id: 5,
      title: "Tours and Talks",
      subtitle: "From ancient Egypt to the Americas, get to know more about the collection on a tour, at a talk or via one of our Hands on desks.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
    },
    {
      id: 6,
      title: "Object Trails",
      subtitle: "Choose a trail and go on your very own fascinating tour around the Museum. Each tour showcases some of our spectacular objects on display.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
    }
  ];

  return (
    <ExplorationGrid
      title="Ways to Explore"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default ExplorationSection;
