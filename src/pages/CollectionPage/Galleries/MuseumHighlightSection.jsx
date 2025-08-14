import React from 'react';
import {  EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';

// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function MuseumHighlightSection() {

  const visitInfo = [
    {
      id: 1,
      title: "Egyptian sculpture gallery ",
      subtitle: "Travel back through 3,000 years of history via our timeline and gallery. Discover the Rosetta Stone, Statue of Ramesses II and more.",
      icon: <EventSeat />,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      actionText: "View Exibitions and Events"
    },
    {
      id: 2,
      title: "Africa",
      subtitle: "The Sainsbury Africa Galleries reveal the extraordinary cultural, artistic and historical diversity and complexity of the continent.",
      icon: <Map />,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop",
      actionText: "View Gallery"
    },
    {
      id: 3,
      title: "Sutton Hoo and Europe ",
      subtitle: "Spanning over 700 years, this Room traces the story ofEurope from 300 AD.",
      icon: <Museum />,
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
      actionText: "Explore Galleries"
    },
    {
      id: 4,
      title: "Roman Empire",
      subtitle: "The objects in Room 70 illustrate the rise of Rome from a small town to an imperial capital.",
      icon: <FamilyRestroom />,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop",
      actionText: "Family Guide"
    }
  ];

  return (
    <ExplorationGrid
      title="Museum highlights"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default MuseumHighlightSection;
