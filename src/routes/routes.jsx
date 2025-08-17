
// central route definitions here 
const routes = {
  home: "/",

  // Visit pages
  visit: {
    base: "/PlanVisitPage",
    family: "/PlanVisitPage/family",
    group: "/PlanVisitPage/group",
    tours: "/PlanVisitPage/tours",
    objectTrail: "/PlanVisitPage/object-trail",
    map: "/PlanVisitPage/map",
  },

  // Collections
  collections: {
    base: "/collections",
    galleries: "/collections/galleries",
    online: "/collections/online",
    search: "/collections/online/search",
  },

  // Membership
  membership: {
    base: "/membership",
    becomeMember: "/membership/become-member",
    existing: "/membership/existing",
    visit: "/membership/visit",
    youngFriends: "/membership/young-friends",
  },

  // Support Us
  support: {
    base: "/support",
    donate: "/support/donate",
    corporate: "/support/corporate",
    patron: "/support/patron",
    existingPatron: "/support/existing-patron",
    volunteer: "/support/volunteer",
  },
  explore: "/explore",
};

export default routes;

