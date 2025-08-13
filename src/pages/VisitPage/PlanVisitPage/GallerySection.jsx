import React from "react";
import { Link } from "@mui/material";
import ListCard from "../../../components/ui/ListCard";

function GallerySection() {
  const ticketItems = [
    {
      id: 1,
      title: "Make the most of your visit",
      details: [
        <>Explore world cultures from the Mediterranean to the Middle East and from the Americas to Africa.</>,
        <>View a map of the Museum.</>,
        <>Explore more of the Museum with our object trails or try a selection of our Museum Missions.</>,
        <>Take a self-guided tour of the Museum using our Audio app (available in various languages including British Sign Language). Download via the App Store (Opens in new window) or Google Play Store (Opens in new window). Please bring your headphones with you or purchase earbuds from the Guide Desk or British Museum Shop.</>
      ]
    },
    {
      id: 2,
      title: "Planned gallery closures",
      details: [
        {text:"Galleries in the Museum may be closed for maintenance, refurbishment or private events. Where possible, we'll list the time and date of the closures below. All planned closures will also be detailed on the affected gallery pages. Occasionally we may need to close galleries at short notice for safety reasons. We regret that in these cases we're not always able to alert the public in advance.", noBullet: true},
        <>Due to regular maintenance, the following galleries will be temporarily closed:</>,
        <><strong>Lower floor</strong><br/>
        Room 25: Africa (The Sainsbury Galleries) from 9–20 March 2026</>,
        <><strong>Ground floor</strong><br/>
        Room 24: Living and Dying (The Wellcome Trust Gallery) partially closed from 18–22 August 2025<br/>
        Room 19: Greece: Athens from 18–29 August 2025<br/>
        Room 20: Greeks and Lycians, 400–325 BC from 18–29 August 2025<br/>
        Room 21: Mausoleum of Halikarnassos from 18–29 August 2025<br/>
        Room 22: The world of Alexander from 18–29 August 2025<br/>
        Room 23: Greek and Roman sculpture from 18–29 August 2025<br/>
        Room 10: Assyria: Lion hunts, Siege of Lachish and Khorsabad* from 1–12 September 2025<br/>
        Room 13: Greece 1050–520 BC from 1–12 September 2025<br/>
        Room 14: Greek vases from 1–12 September 2025<br/>
        Room 15: Greece: Athens and Lycia from 1–12 September 2025<br/>
        Room 16: Greece: Bassai sculptures from 1–12 September 2025<br/>
        Room 18: Greece: Parthenon from 15–26 September 2025<br/>
        Room 4: Egyptian sculpture from 12–23 January 2026<br/>
        Room 6a: Assyrian sculpture and Balawat Gates* from 12–23 January 2026<br/>
        Room 9: Assyria: Nineveh* from 12–23 January 2026<br/>
        Room 2: Collecting the world from 26 January – 6 February 2026<br/>
        Room 2a: The Waddesdon Bequest (funded by The Rothschild Foundation) from 26 January – 6 February 2026<br/>
        Room 1: Enlightenment from 26 January – 13 February 2026<br/>
        Room 6b: Assyrian sculpture and Balawat Gates* from 9–20 February 2026<br/>
        Rooms 7–8: Assyria: Nimrud* from 9–20 February 2026<br/>
        Room 24: Living and Dying (The Wellcome Trust Gallery) partially closed from 23 February – 6 March 2026<br/>
        Room 26: North America from 23 February – 6 March 2026<br/>
        Room 27: Mexico from 23 February – 6 March 2026<br/>
        Room 24: Living and Dying (The Wellcome Trust Gallery) partially closed from 9–20 March 2026</>,
        <><strong>Upper floors</strong><br/>
        Room 53: Ancient South Arabia from 29 September – 10 October 2025<br/>
        Room 54: Anatolia and Urartu, 7000–300 BC from 29 September – 10 October 2025<br/>
        Room 55: Mesopotamia, 1500–539 BC from 29 September – 10 October 2025<br/>
        Room 56: Mesopotamia, 6000–1500 BC partially closed from 29 September – 10 October 2025<br/>
        Rooms 92–94: Japan (The Mitsubishi Corporation Japanese Galleries) from 13–17 October 2025<br/>
        Room 41: Sutton Hoo and Europe, AD 300–1100 (The Sir Paul and Lady Ruddock Gallery) partially closed from 13–24 October 2025<br/>
        Rooms 42–43: The Islamic world (The Albukhary Foundation Gallery) from 13–24 October 2025<br/>
        Room 46: Europe 1400–1800 from 13–24 October 2025<br/>
        Room 47: Europe 1800–1900 from 13–24 October 2025<br/>
        Room 48: Europe 1900 to the present from 13–24 October 2025<br/>
        Room 68: Money from 3–14 November 2025<br/>
        Room 69: Greek and Roman life from 3–14 November 2025<br/>
        Room 70: Roman Empire (The Wolfson Gallery) from 3–14 November 2025<br/>
        Room 71: Etruscan world from 3–14 November 2025<br/>
        Room 72: Ancient Cyprus (The A.G. Leventis Gallery) from 3–14 November 2025<br/>
        Room 73: Greeks in Italy from 3–14 November 2025<br/>
        Room 33: China and South Asia (Sir Joseph Hotung Gallery) from 1–12 December 2025<br/>
        Room 33a: India: Amaravati (The Asahi Shimbun Gallery) from 1–12 December 2025<br/>
        Room 33b: Chinese jade (The Selwyn and Ellie Alleyne Gallery) from 1–12 December 2025<br/>
        Rooms 38–39: Clocks and watches (The Sir Harry and Lady Djanogly Gallery) from 23–27 March 2026<br/>
        Rooms 92–94: Japan (The Mitsubishi Corporation Japanese Galleries) from 30 March – 10 April 2026<br/>
        *Limited opening: Rooms 7, 9, 10, 19, 20, 57 and 58 are open 11.00–15.00 daily.</>
      ]
    },
    {
      id: 3,
      title: "List of available galleries",
      details: [
        { text: "See the list of available galleries for you to enjoy (please note this list is subject to change)", noBullet: true },
        <>Lower floor</>,
        <>Room 25: Africa (The Sainsbury Galleries)</>,
        <>Ground floor</>,
        <>Great Court</>,
        <>Room 1: Enlightenment</>,
        <>Room 2: Collecting the world</>,
        <>Room 2a: The Waddesdon Bequest (funded by The Rothschild Foundation)</>,
        <>Room 4: Egyptian sculpture</>,
        <>Room 6: Assyrian sculpture and Balawat Gates*</>,
        <>Rooms 7–8: Assyria: Nimrud*</>,
        <>Room 9: Assyria: Nineveh*</>,
        <>Room 10: Assyria: Lion hunts, Siege of Lachish and Khorsabad*</>,
        <>Room 12: Greece: Minoans and Mycenaeans (The Arthur I Fleischman Gallery)</>,
        <>Room 13: Greece 1050–520 BC</>,
        <>Room 14: Greek vases</>,
        <>Room 15: Greece: Athens and Lycia</>,
        <>Room 16: Greece: Bassai sculptures</>,
        <>Room 17: Nereid Monument</>,
        <>Room 18: Greece: Parthenon</>,
        <>Room 19: Greece: Athens</>,
        <>Room 20: Greeks and Lycians, 400–325 BC</>,
        <>Room 21: Mausoleum of Halikarnassos</>,
        <>Room 22: The world of Alexander</>,
        <>Room 23: Greek and Roman sculpture</>,
        <>Room 24: Living and Dying (The Wellcome Trust Gallery)</>,
        <>Room 26: North America</>,
        <>Room 27: Mexico</>,
        <>Upper floors</>,
        <>Room 33: China and South Asia (Sir Joseph Hotung Gallery)</>,
        <>Room 33a: India: Amaravati (The Asahi Shimbun Gallery)</>,
        <>Room 33b: Chinese jade (The Selwyn and Ellie Alleyne Gallery)</>,
        <>Rooms 38–39: Clocks and watches (The Sir Harry and Lady Djanogly Gallery)</>,
        <>Room 40: Medieval Europe, 1050–1500 (The Sir Paul and Lady Ruddock Gallery)</>,
        <>Room 41: Sutton Hoo and Europe, AD 300–1100 (The Sir Paul and Lady Ruddock Gallery)</>,
        <>Rooms 42–43: The Islamic world (The Albukhary Foundation Gallery)(Opens in new window)</>,
        <>Room 46: Europe 1400–1800</>,
        <>Room 47: Europe 1800–1900</>,
        <>Room 48: Europe 1900 to the present</>,
        <>Room 49: Roman Britain (The Weston Gallery)</>,
        <>Room 50: Britain and Europe 800 BC–AD43</>,
        <>Room 51: Europe and Middle East, 10,000–800 BC (The Sheikh Zayed Bin Sultan Al Nahyan Gallery)</>,
        <>Room 52: Ancient Iran (The Rahim Irvani Gallery)</>,
        <>Room 53: Ancient South Arabia</>,
        <>Room 54: Anatolia and Urartu, 7000–300 BC</>,
        <>Room 55: Mesopotamia, 1500–539 BC</>,
        <>Room 56: Mesopotamia, 6000–1500 BC</>,
        <>Rooms 57–59: Ancient Levant</>,
        <>Room 61: Egyptian life and death: the tomb-chapel of Nebamun (The Michael Cohen Gallery)</>,
        <>Rooms 62–63: Egyptian death and afterlife: mummies (The Roxie Walker Galleries)</>,
        <>Room 64: Early Egypt</>,
        <>Room 65: Sudan, Egypt and Nubia</>,
        <>Room 66: Ethiopia and Coptic Egypt</>,
        <>Room 67: Korea (The Korea Foundation Gallery)</>,
        <>Room 68: Money</>,
        <>Room 69: Greek and Roman life</>,
        <>Room 70: Roman Empire (The Wolfson Gallery)</>,
        <>Room 71: Etruscan world</>,
        <>Room 72: Ancient Cyprus (The A.G. Leventis Gallery)</>,
        <>Room 73: Greeks in Italy</>,
        <>Rooms 90–90a: Prints and drawings displays</>,
        <>Rooms 92–94: Japan (The Mitsubishi Corporation Japanese Galleries)</>,
        <>Room 95: Chinese Ceramics – Sir Percival David Collection (The Sir Joseph Hotung Centre for Ceramic Studies)</>,
        <>*Limited opening: Rooms 7, 9, 10, 19, 20, 57 and 58 are open 11.00–15.00 daily.</>,
        <>For more information on access to the galleries visit our Accessibility at the Museum page.</>
        ]

    }
  ];

  return (
    <ListCard
      title="Gallery information"
      items={ticketItems}
    />
  );
}

export default GallerySection;
