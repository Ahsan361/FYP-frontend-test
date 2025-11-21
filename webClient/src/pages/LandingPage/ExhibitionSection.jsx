import React from 'react';

// Generic component
import GenericSection from '../../components/ui/GenericSection';

// API services
import { getExhibitions } from '../../services/exhibitionService';
import { createExhibitionRegistration, getMyExhibitionRegistrations } from '../../services/exhibitionRegistrationService';

function ExhibitionSection() {
  return (
    <GenericSection
      title="Exhibitions"
      subtitle="Discover our current and upcoming exhibitions that bring history and heritage to life"
      fetchItems={getExhibitions}
      createRegistration={createExhibitionRegistration}
      getMyRegistrations={getMyExhibitionRegistrations}
      itemType="exhibition"
      registrationIdField="exhibition_id"
    />
  );
}

export default ExhibitionSection;