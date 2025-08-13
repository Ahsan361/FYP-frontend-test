import React from "react";
import ListCard from "../../../components/ui/ListCard";

function FAQSection() {
  const ticketItems = [
    {
      id: 1,
      title: "Can we bring a small group to the Museum without booking?",
       details: [
        <>All groups of 10 people or more must book in advance before visiting the British Museum.</>,
        <>More information regarding school group bookings can be found on the School visits page.</>,
        <>Groups with special accessibility requirements should see the Accessibility at the Museum page.</>
        ]
    },
    {
      id: 2,
      title: "Will a fee be charged for group bookings?",
      details: [
        {text: "There's no fee for visiting the Museum or for making a group booking.", noBullet: true},
        {text: "As the Museum continues to be affected by the coronavirus pandemic, your support is vitally important. Donations help support the work of the Museum from conserving the collection and funding scientific and archaeological research, to working with schools and communities both locally and across the globe to share the collection both now and for future generations. Every donation makes a real difference. If you're able, please support the Museum today. Thank you.", noBullet: true},
        ]
    },
    {
      id: 3,
      title: "Will we be turned away if we haven't booked?",
      details: [
        { text: "Tour groups who haven't booked in advance won't be turned away but may be denied immediate entry.", noBullet: true },
        ]

    },
    {
      id: 4,
      title: "Can we book without seven days' notice?",
      details: [
        <>Tour groups must book their visit at least seven days in advance.</>,
        <>Groups without a booking made at least seven days in advance may be denied immediate entry.</>
        ]

    },
    {
      id: 5,
      title: "How important is it to keep to the entry time?",
      details: [
        <>Tour groups should stick to their booking time wherever possible.</>,
        <>The Museum will endeavour to grant access for late running tour groups but immediate entry can't be guaranteed.</>
        ]

    },
    {
      id: 6,
      title: "If numbers change after a booking is made, can the booking be amended?",
      details: [
        <>Tour group leaders bringing fewer people than originally booked are requested to inform the uniformed member of Museum staff welcoming groups on arrival.</>,
        <>Tour group leaders bringing more people than originally booked will need to make an additional booking.</>
        ]

    },
    {
      id: 7,
      title: "How long can we stay once inside?",
      details: [
        <>Tour group bookings are for the arrival time only.</>,
        <>Once inside, there's no limit on the time tour groups can spend in the Museum, subject to the Museum's opening and closing times.</>
        ]

    },
    {
      id: 8,
      title: "Are there any areas where guiding is not allowed?",
     details: [
        { text: "Guiding in the following galleries isn't permitted:", noBullet: true },
        <>Room 33: China and South Asia (Sir Joseph Hotung Gallery)</>,
        <>Room 33a: India: Amaravati (The Asahi Shimbun Gallery)</>,
        <>Room 33b: Chinese jade (The Selwyn and Ellie Alleyne Gallery)</>,
        <>Room 61: Egyptian life and death: the tomb-chapel of Nebamun (The Michael Cohen Gallery)</>,
        <>Rooms 62–63: Egyptian death and afterlife: mummies (The Roxie Walker Galleries)</>,
        <>Rooms 91 and 91a: Admonitions Scroll</>,
        { text: "Non-Museum guided tours and tour groups, regardless of size, will not be permitted in any exhibitions. See ticket terms and conditions and our Visitor guidelines and conditions of entry.", noBullet: true },        ]

    },
    {
      id: 9,
      title: "What happens if members of our group have special accessibility needs?",
      details: [
        { text: "The Museum is accessible for visitors bringing prams and buggies. Please keep them with you at all times, unless you are using the cloakroom to store your buggy or pram.", noBullet: true },
        { text: "Fold-up prams and buggies can be left free of charge in the cloakroom, which is found by turning left immediately after passing through the Main entrance of the Museum. Please note that there is limited space in the cloakroom.", noBullet: true },
        { text: "Items of large luggage (including some bags and rucksacks, and all wheeled suitcases) are not permitted on-site. Please see the Visit page and our facilities section for more information on cloakroom restrictions", noBullet: true }
        ]

    },
    {
      id: 10,
      title: "Can we exit and return through the front gates at a later time once we have checked in at the Montague Place entrance? ",
      details: [
        { text: " All groups arriving at the front gates will be directed to use the Montague Place entrance, even if they have already checked in.", noBullet: true },
        ]

    },
    {
      id: 11,
      title: "Are school groups included?",
      details: [
        {text: "There's a separate booking process for school groups. You can find out more about it on the School visits page. ",noBullet: true},
      ]
    }
  ];

  return (
    <ListCard
      title="FAQs"
      items={ticketItems}
    />
  );
}

export default FAQSection;
