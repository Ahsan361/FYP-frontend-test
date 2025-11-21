import React from 'react';

// Generic component
import GenericSection from '../../../components/ui/GenericSection';

// API services
import { getEvents } from '../../../services/eventService';
import { createEventRegistration, getMyEventRegistrations } from '../../../services/eventRegistrationService';

function FamilyEventsSection() {
  return (
    <GenericSection
      title="Events"
      subtitle="Join our exciting events and activities that celebrate culture and community"
      fetchItems={getEvents}
      createRegistration={createEventRegistration}
      getMyRegistrations={getMyEventRegistrations}
      itemType="event"
      registrationIdField="event_id"
    />
  );
}

export default FamilyEventsSection;