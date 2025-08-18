import ExplorationGrid from "../../components/ui/ExplorationGrid";
import { useEventsFilter } from "../../components/contexts/EventsFilterContext";

function SpecialExhibitionsSection() {
  const { filters } = useEventsFilter();

 const SpecialExhibitionsInfo = [
    { 
      id: 1,
      title: "Deities, demons and mischief-makers",
      type: "Performance",
      dates: "7 January 2026",
      status: "Book Now",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Gather the family for storytelling sessions evoking the colourful, sensory and atmospheric world of our current 'Ancient Indial exhibition.",
      actionText: "Explore More"
    },
    { 
      id: 2,
      title: "Little Feet: teddies on holiday",
      type: "Family activity",
      dates: "15 March - 30 August 2025",
      status: "Free",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Join the Little Feet teddies on their summer holidays through fun experiences and activities in this drop-in session for under-fives.",
      actionText: "Explore More"
    },
     { 
      id: 3,
      title: "Little Feet: teddies on holiday",
      type: "Performance",
      dates: "13 August 2025",
      status: "Free",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Join the Little Feet teddies on their summer holidays through fun experiences and activities in this drop-in session for under-fives.",
      actionText: "Explore More"
    }
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
