import ExplorationGrid from "../../components/ui/ExplorationGrid";
import { useEventsFilter } from "../../contexts/EventsFilterContext";

function SpecialExhibitionsSection() {
  const { filters } = useEventsFilter();

 const SpecialExhibitionsInfo = [
    {
      id: 1,
      title: "Colors of Tradition: Painted Lamps of Pakistan",
      type: "Exhibition",
      dates: "7 January 2026",
      status: "Book Now",
      statusColor: "success",
      image: "/assets/pages/e1.jpg",
      description:
        "Explore the vibrant artistry of hand-painted lamps, a traditional craft that lights up Pakistan’s cultural heritage with colors, motifs, and stories.",
      actionText: "Explore More",
    },
    {
      id: 2,
      title: "Heritage in Focus: Crafting Stories",
      type: "Family activity",
      dates: "15 March - 30 August 2025",
      status: "Free",
      statusColor: "success",
      image: "/assets/pages/s2.jpg",
      description:
        "A hands-on journey for families to experience Pakistani crafts — from pottery to weaving — celebrating creativity and cultural identity.",
      actionText: "Explore More",
    },
    {
      id: 3,
      title: "Gallery of Heritage: Visual Stories of Pakistan",
      type: "Exhibition",
      dates: "10 December 2025 - 20 March 2026",
      status: "Book Now",
      statusColor: "success",
      image: "/assets/pages/s3.jpg",
      description:
        "Step into a curated gallery featuring paintings, photographs, and artifacts that narrate Pakistan’s cultural and historical journey through powerful visuals.",
      actionText: "Explore More",
    },
  ];
  // Apply global filter
  const filteredItems = SpecialExhibitionsInfo.filter(event => {
    if (filters.type !== "All" && event.type !== filters.type) return false;
    if (filters.status !== "All" && event.status !== filters.status) return false;
    if (filters.date && new Date(event.dates) < filters.date) return false;
    return true;
  });

  return (
    <ExplorationGrid
      title="Special exhibitions"
      subtitle="Plan your perfect museum experience"
      items={filteredItems}
    />
  );
}

export default SpecialExhibitionsSection;
