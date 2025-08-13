import React from "react";
import { Link } from "@mui/material";
import ListCard from "../../../components/ui/ListCard"
import { Schedule } from "@mui/icons-material";

function ScheduleSection() {
  const ticketItems = [
    {
      id: 1,
      title: "Museum",
      details: [
        {text: "Our opening hours are daily, 10.00-17.00 (Fridays: 20.30)\nLast entry: 16.45 (Fridays: 20.15)", noBullet: true},
        <>Box Office: 10.00-16.50, Monday to Friday (excluding Bank Holidays)</>,
        <>Cloakroom: 10.00-17.00 (20.30 on Fridays). Last deposit is one hour before closing.</>,
        <>Families Desk: 10.00-12.30 and 13.15-16.30, weekends and London Borough of Camden school holidays(Opens in new window) only.</>,
        <>Ford Centre for Young Visitors: 10.00-16.30, weekends and London Borough of Camden school holidays(Opens in new window) only</>,
        <>Galleries: 10.00-17.00 (20.30 on Fridays). Please note: we begin clearing galleries 10 minutes before they close.</>,
        <>Great Court: 10.00-17.30 (Fridays 20.30)</>,
        <>Guide Desk: 10.00-16.30</>,
        <>Information Desk: 10.00-17.00</>,
        <>Ticket Desk: 10.00-16.30</>,
        {text:"Find out about upcoming late opening on Fridays. There will be no late night opening on Good Friday (3 April 2026)", noBullet: true},
        {text:"The Museum is closed 24-26 December.", noBullet: true}
        ]

    },
    {
      id: 2,
      title: "Exibitions",
      details: [
        {text:"Special exhibitions are open daily 10.00–17.00 (last entry at 16.45) and on Fridays until 20.30 (last entry at 20.15)", noBullet: true},
        {text:"Please arrive at the time stated on your ticket – we cannot guarantee admission before or after your allotted time slot.", noBullet: true},
        {text:"We begin clearing galleries 10 minutes before they close.", noBullet: true}
      ]
    },
    {
      id: 3,
      title: "Shops",
      details: [
        <>Bookshop: daily, 10.00-17.00</>,
        <>Family shop: daily, 10.00-17.00</> ,
        <>Collections shop and Grenville Room: daily, 10.00-17.00</>,
        <>Online shop(Opens in new window): open 24 hours a day</>
      ]
    },
    {
      id: 4,
      title: "Cafés and restaurants",
      details: [       
        <>Court Cafés: daily, 10.00–17.00</>,
        <>Great Court Restaurant: daily, 11.30–17.00 (last sitting 16.00).</>,
        <>Pizzeria: daily, 11.00–16.00</>,
        <>Coffee Lounge: 10.30–16.30</>,
        <>Outside dining: 10.00–17.00</>,
        {text:"Find out more about the Museum's cafés and restaurants.",noBullet: true} 
      ]
    },
    {
      id: 5,
      title: "Library, archive and study rooms",
      details: [
        <>Access to department study rooms is by appointment only. Opening hours vary.</>, 
        <>Access to the library collection and archive is by appointment only.</>, 
        <>Opening hours are: Monday-Wednesday, Friday: 10.00-17.00, Thursday: 13.00-17.00</>, 
        <>To identify library materials search the catalogue(Opens in new window) and email library@britishmuseum.org with a list of up to ten items you wish to consult. Please also include a potential date of visit, providing two weeks' notice. Staff will retrieve the materials and confirm the appointment.</>,
        <>For archive research email archive@britishmuseum.org</>, 
      ]
    }
  ];

  return (
    <ListCard
      title="Full Opening Hours"
      items={ticketItems}
    />
  );
}

export default ScheduleSection;
