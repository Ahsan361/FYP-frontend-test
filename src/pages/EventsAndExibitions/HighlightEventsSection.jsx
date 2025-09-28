import ExplorationGrid from "../../components/ui/ExplorationGrid";
import { useEventsFilter } from "../../contexts/EventsFilterContext";

function HighlightEventsSection() {
  const { filters } = useEventsFilter();
  const HighlightEventsInfo = [
    {
      id: 1,
      title: "Sacred Spaces: Mosques and Shrines of Pakistan",
      type: "Cultural Showcase",
      dates: "11 June 2025",
      status: "Book Now",
      statusColor: "success",
      image: "/assets/pages/h1.jpg",
      description:
        "An immersive showcase of Pakistan’s spiritual heritage — from the grandeur of Badshahi Mosque to the mysticism of Sufi shrines like Shah Rukn-e-Alam.",
      actionText: "Explore More",
    },
    {
      id: 2,
      title: "Qawwali Nights at the Fort",
      type: "Musical Performance",
      dates: "1 April 2025",
      status: "Free",
      statusColor: "success",
      image: "/assets/pages/q-h2.jpg",
      description:
        "An enchanting evening of soul-stirring qawwali at Lahore Fort, blending history, spirituality, and music under the stars",
      actionText: "Explore More",
    },
    {
      id: 3,
      title: "Heritage Photography Contest",
      type: "Community Event",
      dates: "30 August 2025",
      status: "Free",
      statusColor: "success",
      image: "/assets/pages/h3.jpg",
      description:
        "Capture Pakistan’s monuments, traditions, and landscapes through your lens. Winning entries will be displayed in a special exhibition.",
      actionText: "Submit your Entry",
    },
  ];
  
  // Apply global filter
  const filteredItems = HighlightEventsInfo.filter(event => {
    if (filters.type !== "All" && event.type !== filters.type) return false;
    if (filters.status !== "All" && event.status !== filters.status) return false;
    if (filters.date && new Date(event.dates) < filters.date) return false;
    return true;
  });

  return (
    <ExplorationGrid
      title="Highlight events"
      subtitle="Plan your perfect museum experience"
      items={filteredItems}
    />
  );
}

export default HighlightEventsSection;
