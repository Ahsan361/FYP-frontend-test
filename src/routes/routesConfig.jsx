import routes from "./routes";

// Import your pages
import LandingPage from "../pages/LandingPage/landingpage";
import FamilyVisitPage from "../pages/VisitPage/FamilyVisit/FamilyVisitPage";
import GroupVisitPage from "../pages/VisitPage/GroupVisit/GroupVisitPage";
import PlanVisitPage from "../pages/VisitPage/PlanVisitPage/planVisitPage";
import SpecialTourPage from "../pages/VisitPage/SpecialToursPage/SpecialTourPage";
import ObjectTrailPage from "../pages/VisitPage/ObjectTrail/ObjectTrailPage";
import MuseumMapPage from "../pages/VisitPage/MuseumMap/MuseumMapPage";
import GalleryPage from "../pages/CollectionPage/Galleries/GalleriesPage";
import OnlineGalleryPage from "../pages/CollectionPage/OnlineGalleries/OnlineGalleriesPage";
import SearchSection from "../pages/CollectionPage/OnlineGalleries/SearchSection/SearchSection";
import BecomeMemberPage from "../pages/MembershipPage/BecomeMember/BecomeMemberPage";
import ExistingMemberPage from "../pages/MembershipPage/ExistingMembers/ExistingMemberPage";
import MembersVisitPage from "../pages/MembershipPage/MembersVisit/MembersVisitPage";
import YoungFriendsPage from "../pages/MembershipPage/YoungFriends/YoungFriendsPage";
import DonatePage from "../pages/SupportUs/Donate/DonatePage";
import CorporateSupport from "../pages/SupportUs/CorporateSupport/CorporateSupportPage";
import PatronPage from "../pages/SupportUs/Patron/PatronPage";
import VolunteerPage from "../pages/SupportUs/Volunteer/VolunteerPage";
import ExistingPatronPage from "../pages/SupportUs/ExistingPatron/ExistingPatron";
import EventsAndExibitionsPage from "../pages/EventsAndExibitions/EventsAndExibitionsPage";
import Login from "../pages/Authentication/LoginPage";
import Register from "../pages/Authentication/RegistrationPage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";

// map paths to components
const routesConfig = [
  { path: routes.home, element: <LandingPage /> },
  { path: routes.login, element: <Login /> },
  { path: routes.register, element: <Register /> },
  { path: routes.admin , element: <AdminPanel /> },

  // Visit
  { path: routes.visit.base, element: <PlanVisitPage /> },
  { path: routes.visit.family, element: <FamilyVisitPage /> },
  { path: routes.visit.group, element: <GroupVisitPage /> },
  { path: routes.visit.tours, element: <SpecialTourPage /> },
  { path: routes.visit.objectTrail, element: <ObjectTrailPage /> },
  { path: routes.visit.map, element: <MuseumMapPage /> },

  // Collections
  { path: routes.collections.galleries, element: <GalleryPage /> },
  { path: routes.collections.online, element: <OnlineGalleryPage /> },
  { path: routes.collections.search, element: <SearchSection /> },

  // Membership
  { path: routes.membership.becomeMember, element: <BecomeMemberPage /> },
  { path: routes.membership.existing, element: <ExistingMemberPage /> },
  { path: routes.membership.visit, element: <MembersVisitPage /> },
  { path: routes.membership.youngFriends, element: <YoungFriendsPage /> },

  // Support Us
  { path: routes.support.donate, element: <DonatePage /> },
  { path: routes.support.corporate, element: <CorporateSupport /> },
  { path: routes.support.patron, element: <PatronPage /> },
  { path: routes.support.existingPatron, element: <ExistingPatronPage /> },
  { path: routes.support.volunteer, element: <VolunteerPage /> },

  //exibition and event  page 
  { path: routes.explore, element: <EventsAndExibitionsPage /> },//to be replaced with our original page here 
];

export default routesConfig;
