import React from "react";
import { Link } from "@mui/material";
import ListCard from "../../../components/ui/ListCard";

function FacilitiesSection() {
  const ticketItems = [
    {
      id: 1,
      title: "Families Desk",
      details: [
        {text:"If you're visiting as a family at the weekend, visit the Families Desk in the Great Court to:", noBullet: true},
        <>Chat to one of our friendly family facilitators to make the most of your visit.</>,
        <>Collect backpacks and Museum explorer trails.</>,
        {text:"Opening hours: 10.00-12.30 and 13.15-16.30 (weekends and London Borough of Camden school holidays only).", noBullet: true},
        {text:"The Families Desk is closed on UK bank holidays.", noBullet: true},
        {text:"Backpacks will not be available when the Families Desk is closed. However, Museum explorer trails are available at the Information Desk in the Great Court and to download from the website", noBullet: true}
        ]

    },
    {
      id: 2,
      title: "Ford Centre for Young Visitors",
      details: [
        {text:"Located beneath the Great Court, the Ford Centre for Young Visitors can be accessed by the staircases near the Information Desk or via level access by the lifts in the Great Russell Street entrance.", noBullet: true},
        {text:"Available for families at weekends and during the school holidays for picnicking, locker storage and toilets.", noBullet: true}, 
        {text:"Opening hours: 10.00-16.30 (weekends and London Borough of Camden school holidays only).", noBullet: true}
      ]
    },
    {
      id: 3,
      title: "Child-friendly eating",
      details: [
        { text: "Cafés and restaurants", noBullet: true },
        <>Families are welcome at all of the Museum's cafés and restaurants. High chairs are available on request for children who require them, subject to availability. The Pizzeria offers a children's menu.</>,
        { text: "Picnics and packed lunches", noBullet: true },
        <>Families with young children may bring their own food to eat in the Ford Centre which is open on weekends and during London Borough of Camden school holidays.</>, 
        <>When the weather is nice, families can eat by the Museum's front lawns, where there are waste and recycling bins for you to dispose of your unwanted food and packaging. "</>
        ]

    },
    {
      id: 4,
      title: "Prams and buggies",
      details: [
        { text: "The Museum is accessible for visitors bringing prams and buggies. Please keep them with you at all times, unless you are using the cloakroom to store your buggy or pram.", noBullet: true },
        { text: "Fold-up prams and buggies can be left free of charge in the cloakroom, which is found by turning left immediately after passing through the Main entrance of the Museum. Please note that there is limited space in the cloakroom", noBullet: true }, 
        { text: "Items of large luggage (including some bags and rucksacks, and all wheeled suitcases) are not permitted on-site. Please see the Visit page and our facilities section for more information on cloakroom restrictions.", noBullet: true }
      ]
    },
    {
      id: 5,
      title: "Baby changing",
      details: [
        {text: "Baby changing facilities can be found:",noBullet: true },
        <>Great Court toilet facilities, level access </>,
        <>Levels 0 and 3 of the North stairs</>,
        <>Ford Centre for Young Visitors - weekends and London Borough of Camden school holidays only</>
      ]
    },
    {
      id: 6,
      title: "Support for visit",
      details: [
        {text: "Information to support visits for families with additional sensory needs can be found here:",noBullet: true},
        <>What's inside a gallery backpack</>,
        <>Sensory needs information for families</>,        
      ]
    }
  ];

  return (
    <ListCard
      title="Facilities for families"
      items={ticketItems}
    />
  );
}

export default FacilitiesSection;
