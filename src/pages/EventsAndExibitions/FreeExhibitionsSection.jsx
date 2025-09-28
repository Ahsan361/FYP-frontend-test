import ExplorationGrid from "../../components/ui/ExplorationGrid";
import { useEventsFilter } from "../../contexts/EventsFilterContext";

function FreeExhibitionsSection() {
  const { filters } = useEventsFilter();

 const FreeExhibitionsInfo = [
    {
      id: 1,
      title: "Through the Lens: A Glimpse into Heritage",
      type: "Gallery showcase",
      dates: "22 October 2025 ",
      status: "Book Now",
      statusColor: "success",
      image: "/assets/pages/e.jpg",
      description:
        "Step into a gallery of timeless photographs capturing monuments, landscapes, and moments that define Pakistan’s diverse heritage.",
      actionText: "Explore More",
    },
    {
      id: 2,
      title: "Traditional Music",
      type: "Live Performance",
      dates: "15 August 2025",
      status: "Book Tickets",
      statusColor: "success",
      image: "/assets/pages/f2.JPG",
      description:
        "Join the Little Feet teddies on their summer holidays through fun experiences and activities in this drop-in session for under-fives.",
      actionText: "Explore More",
    },
    {
      id: 3,
      title: "Mela Chiraghan: Festival of Lights",
      type: "Cultural Festival",
      dates: "8 March 2025",
      status: "Free",
      statusColor: "success",
      image: "/assets/pages/f3.jpg",
      description:
        "Celebrate Lahore's famous Festival of Lights with qawwali, folk performances, and dazzling displays that honor the Sufi saint Shah Hussain.",
      actionText: "Explore More",
    },
  ];
  // Apply global filter
  const filteredItems = FreeExhibitionsInfo.filter(event => {
    if (filters.type !== "All" && event.type !== filters.type) return false;
    if (filters.status !== "All" && event.status !== filters.status) return false;
    if (filters.date && new Date(event.dates) < filters.date) return false;
    return true;
  });

  return (
    <ExplorationGrid
      title="Free exhibitions and displays"
      subtitle="Plan your perfect museum experience"
      items={filteredItems}
    />
  );
}

export default FreeExhibitionsSection;
