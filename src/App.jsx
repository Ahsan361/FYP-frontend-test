import LandingPage from "./pages/LandingPage/landingpage";
import FamilyVisitPage from "./pages/VisitPage/FamilyVisit/FamilyVisitPage";
import GroupVisitPage from "./pages/VisitPage/GroupVisit/GroupVisitPage";
import PlanVisitPage from "./pages/VisitPage/PlanVisitPage/planVisitPage";
import SpecialTourPage from "./pages/VisitPage/SpecialToursPage/SpecialTourPage";
import ObjectTrailPage from "./pages/VisitPage/ObjectTrail/ObjectTrailPage"
import MuseumMapPage from "./pages/VisitPage/MuseumMap/MuseumMapPage"
import GalleryPage from "./pages/CollectionPage/Galleries/GalleriesPage";
import OnlineGalleryPage from "./pages/CollectionPage/OnlineGalleries/OnlineGalleriesPage";
import SearchSection from "./pages/CollectionPage/OnlineGalleries/SearchSection/SearchSection";
import BecomeMemberPage from "./pages/MembershipPage/BecomeMember/BecomeMemberPage"
import ExistingMemberPage from "./pages/MembershipPage/ExistingMembers/ExistingMemberPage"
function App(){
  return (
    <div>
      {/* <LandingPage/> */}
      {/* <PlanVisitPage /> */}
      {/* <FamilyVisitPage/> */}
      {/* <GroupVisitPage/> */}
      {/* <SpecialTourPage/> */}
      {/* <ObjectTrailPage /> */}
      {/* <MuseumMapPage/> */}
      {/* <GalleryPage /> */}
      {/* <OnlineGalleryPage/> */}
      <BecomeMemberPage/>
      {/* <ExistingMemberPage/> */}
    </div>
  );
}

export default App;