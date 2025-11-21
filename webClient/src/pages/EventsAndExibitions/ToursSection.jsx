import ExplorationGrid from "../../components/ui/ExplorationGrid";
import { useEventsFilter } from "../../contexts/EventsFilterContext";

function ToursSection() {
  const { filters } = useEventsFilter();

 const ToursInfo = [
    {
      id: 1,
      title: "Lahore Heritage Walk",
      type: "City Tour",
      dates: "Every Saturday & Sunday",
      status: "Open",
      statusColor: "success",
      image: "/assets/pages/e-e/g1l.jpg",
      description:
        "Step into Lahore’s walled city with expert guides. Explore Shahi Hammam, Masjid Wazir Khan, Delhi Gate, and the colorful bazaars that preserve Mughal grandeur.",
      actionText: "Book Now",
    },
    {
      id: 2,
      title: "Craft Trails of Sindh",
      type: "Cultural Tour",
      dates: "Monthly Departures",
      status: "Upcoming",
      statusColor: "warning",
      image: "/assets/pages/e-e/g2s.jpg",
      description:
        "Travel through Hala, Bhit Shah, and Khairpur to meet Sindhi artisans of ajrak, rilli quilts, and handwoven khes. Witness their work and take part in DIY craft sessions.",
      actionText: "Reserve Spot",
    },
    {
      id: 3,
      title: "Hunza Valley Cultural Experience",
      type: "Adventure & Culture",
      dates: "Summer 2026",
      status: "Pre-Booking",
      statusColor: "info",
      image: "/assets/pages/e-e/g3h.jpg",
      description:
        "Discover Hunza’s breathtaking mountains, local music, and centuries-old forts. Includes guided treks, homestays, and an introduction to traditional Hunzai cuisine.",
      actionText: "Pre-Book Now",
    },
    {
      id: 4,
      title: "Faisal Mosque & Islamabad Heritage Tour",
      type: "Cultural & Architectural Tour",
      dates: "Daily Tours Available",
      status: "Open",
      statusColor: "success",
      image: "/assets/pages/e-e/g4fm.jpg",
      description:
        "Visit Pakistan’s iconic Faisal Mosque, an architectural marvel at the foot of the Margalla Hills. Learn about its history, design, and significance, followed by a guided tour of Islamabad’s cultural highlights.",
      actionText: "Book Now",
    },
  ];
  // Apply global filter
  const filteredItems = ToursInfo.filter(event => {
    if (filters.type !== "All" && event.type !== filters.type) return false;
    if (filters.status !== "All" && event.status !== filters.status) return false;
    if (filters.date && new Date(event.dates) < filters.date) return false;
    return true;
  });

  return (
    <ExplorationGrid
      title="Guided Tours"
      subtitle="Plan your perfect museum experience"
      items={filteredItems}
    />
  );
}

export default ToursSection;
