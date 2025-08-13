import React from "react";
import ListCard from "../../../components/ui/ListCard";

function FAQSection() {
  const ticketItems = [
    {
      id: 1,
      title: "How many places are available on each tour?",
      details: [
        { text: "Tours are limited to a maximum of 20 places per session (14 for Life and death in ancient Egypt). If you would like to bring a group of 10 or more people or arrange a special out-of-hours tour, please email traveltradebookings@britishmuseum.org to discuss your options.", noBullet: true },
      ]
    },
    {
      id: 2,
      title: "Can I bring wheeled cases and large items of luggage with me?",
      details: [
        { text: "Wheeled cases and large items of luggage are not allowed on British Museum premises.", noBullet: true },
      ]
    },
    {
      id: 3,
      title: "Will the cloakroom be open?",
      details: [
        { text: "Cloakroom facilities are not available on these tours.", noBullet: true },
      ]
    },
    {
      id: 4,
      title: "When does the tour start?",
      details: [
        { text: "Each tour starts at 09.00 and lasts for one hour, including time at the end for you to take photographs.", noBullet: true },
      ]
    },
    {
      id: 5,
      title: "Can I continue my Museum visit after the tour?",
      details: [
        { text: "Once the tour ends your tour ticket enables access to the permanent collection.", noBullet: true },
      ]
    },
    {
      id: 6,
      title: "Can groups visit the Museum?",
      details: [
        { text: "If you wish to bring a group of eight or more people or arrange a special out-of-hours tour, please email traveltradebookings@britishmuseum.org to discuss your options.", noBullet: true },
      ]
    },
  ];

  return (
    <ListCard
      title="FAQs"
      items={ticketItems}
    />
  );
}

export default FAQSection;
