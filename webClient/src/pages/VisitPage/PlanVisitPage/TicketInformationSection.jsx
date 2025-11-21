import React from "react";
import { Link } from "@mui/material";

//my custom components
import ListCard from "../../../components/ui/ListCard"

function TicketInfoSection() {
  const ticketItems = [
    {
      id: 1,
      title: "How to book",
      details: [
        <>We're limiting numbers of people in the Museum to ensure there's room for you to safely enjoy your visit. You're advised to <Link href="#" underline="hover">book a free ticket</Link> in advance to receive key information and updates before your visit and priority entry during busy periods.</>,
        <>To book simply <strong>pick the date and time</strong> you'd like to visit.</>,
        <>If the date or time you wish to visit has no availability, please note that walk-up visits are available each day for those who arrive at the Montague Place entrance of the Museum, without advance bookings. If visitor numbers are very high, non-ticket holders may have a longer wait to gain entry.</>,
        <>To book tickets for exhibitions, <Link href="#" underline="hover">visit our exhibition pages</Link>. Your exhibition ticket also gives you access to the permanent collection.</>,
        <>If you need any access assistance, please see our <Link href="#" underline="hover">Accessibility page</Link>.</>
      ]
    },
    {
      id: 2,
      title: "Members",
      details: [
        "Members enjoy free unlimited entry to all exhibitions.",
        "Priority booking for special events.",
        "Exclusive members-only newsletters and offers."
      ]
    },
    {
      id: 3,
      title: "Groups of 10 or more people",
      details: [
        "Self-led groups of 10 or more people will need to book a group ticket(Opens in new window). Please see the Group visits page for more details. "
      ]
    },
    {
      id: 4,
      title: "School groups",
      details: [
       <>School groups should contact the Box Office on +44 (0)20 7323 8181 to book their visit to the Museum. More information can be found on our <Link href="#" underline="hover">School visits</Link> page.</>
      ]
    }
  ];

  return (
    <ListCard
      title="Ticket information"
      items={ticketItems}
    />
  );
}

export default TicketInfoSection;
