import { createContext, useContext, useState } from "react";

const EventsFilterContext = createContext();

export const useEventsFilter = () => useContext(EventsFilterContext);

export function EventsFilterProvider({ children }) {
  
  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
    date: null,  // <-- new
    });

  return (
    <EventsFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </EventsFilterContext.Provider>
  );
}
