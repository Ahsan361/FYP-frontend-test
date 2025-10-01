import React from 'react';
import { EventSeat, Map, Museum, FamilyRestroom } from '@mui/icons-material';


// Custom components
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function AdditionalFacilitiesSection() {
  
  const visitInfo = [
    {
      id: 1,
      title: "Plan your visit",
      subtitle: "Find travel, entry and facilities information and details of our Museum activities.",
      icon: <EventSeat />,
      image: "/assets/landing-page/visit-the-museum/map.jpg",
      actionText: "Explore More",
      path:"/PlanVisitPage"
    },
    {
      id: 2,
      title: "Accessibility at the Museum",
      subtitle: "Find out how to make the most of your visit to the Museum.",
      icon: <Map />,
      image: "/assets/landing-page/visit-the-museum/galleries.jpg",
      actionText: "Explore More",
      path:"/PlanVisitPage/tours"
    },
    {
      id: 3,
      title: "Exhibitions and events",
      subtitle: "Discover our latest exhibitions and events, including 'Hiroshige: artist of the open roadl.",
      icon: <Museum />,
      image: '/events_and_exhibitions.jpg',
      actionText: "Explore More",
      path:"/explore"
    },
    {
      id: 4,
      title: "Out-of-hours tours",
      subtitle: "Book your ticket in advance and enjoy an exclusive out-of-hours tour before the gates open to the public. Adults 235.",
      icon: <FamilyRestroom />,
      image: "/assets/landing-page/visit-the-museum/family-visits.jpg",
      actionText: "Explore More",
      path:"/PlanVisitPage/tours"
    }
  ];

  return (
    <ExplorationGrid
      title="You may also be interested in"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default AdditionalFacilitiesSection;
