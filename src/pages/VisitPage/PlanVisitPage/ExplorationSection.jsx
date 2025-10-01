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
      image: "/events_and_exhibitions.jpg",
      actionText: "View Exibitions and Events",
      path:"/explore"

    },
    {
      id: 2,
      title: "Galleries",
      subtitle: "Walk through two million years of history and culture across more than 50 galleries.",
      icon: <Map />,
      image: "/galleries.png",
      actionText: "View Gallery",
      path:"/collections/online"
    },
    {
      id: 3,
      title: "Family visits",
      subtitle: "From family facilities to activities and events, discover how to make the most of your day at the Museum.",
      icon: <FamilyRestroom />,
      image: "/family_visits.png",
      actionText: "Family Guide",
      path:"/PlanVisitPage/family",
    },
    {
      id: 4,
      title: "Tours and Talks",
      subtitle: "Explore Pakistan's rich heritage through guided tours, cultural talks, and interactive sessions with experts.",
      icon: <FamilyRestroom />,
      image: "/tours_and_talks.png",
      actionText: "Family Guide",
      path:"/PlanVisitPage/group"
    },
    {
      id: 5,
      title: "Object Trails",
      subtitle: "Choose a trail and go on your very own fascinating tour around the Museum. Each tour showcases some of our spectacular objects on display.",
      icon: <FamilyRestroom />,
      image: "/object_trails.png",
      actionText: "Family Guide",
      path:"/PlanVisitPage/object-trail"
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
