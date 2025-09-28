import ExplorationGrid from "../../components/ui/ExplorationGrid";
import { useEventsFilter } from "../../contexts/EventsFilterContext";

function InternationalToursSection() {
  const { filters } = useEventsFilter();

 const InternationalToursInfo = [
    {
      id: 1,
      title: "Pakistani Crafts at the V&A, London",
      type: "Museum Tour",
      dates: "10 June - 15 July 2026",
      status: "Book Now",
      statusColor: "success",
      image: "/assets/pages/e-e/w1I.jpg",
      description:
        "Experience a curated exhibition of Pakistani crafts including handwork, textiles at the Victoria & Albert Museum, including handwoven fabrics, embroidery, and traditional patterns.",
      actionText: "Book Now",
    },
    {
      id: 2,
      title: "Folk & Sufi Festival, Dubai",
      type: "Cultural Festival",
      dates: "5 - 10 March 2026",
      status: "Open",
      statusColor: "success",
      image: "/assets/pages/e-e/wfi2.jpg",
      description:
        "Join an immersive festival celebrating Pakistani folk music, Sufi performances, and traditional crafts in the heart of Dubai.",
      actionText: "Join Now",
    },
    {
      id: 3,
      title: "Gandhara Artifacts Showcase, New York",
      type: "Gallery Tour",
      dates: "20 September - 5 October 2025",
      status: "Book Now",
      statusColor: "success",
      image: "/assets/pages/e-e/wg3i.jpg",
      description:
        "Explore the rich Buddhist heritage of Pakistan’s Gandhara civilization through artifacts and sculptures displayed in a curated New York gallery exhibition.",
      actionText: "Explore More",
    },
  ];
  // Apply global filter
  const filteredItems = InternationalToursInfo.filter(event => {
    if (filters.type !== "All" && event.type !== filters.type) return false;
    if (filters.status !== "All" && event.status !== filters.status) return false;
    if (filters.date && new Date(event.dates) < filters.date) return false;
    return true;
  });

  return (
    <ExplorationGrid
      title="International touring exhibitions"
      subtitle="Plan your perfect museum experience"
      items={filteredItems}
    />
  );
}

export default InternationalToursSection;
