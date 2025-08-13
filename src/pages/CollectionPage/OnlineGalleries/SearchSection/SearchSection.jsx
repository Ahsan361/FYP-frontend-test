import React from "react";
import { Box } from "@mui/material";
import SearchIntroSection from "./SearchIntroSection";
import SearchBar from "./Searchbar";
import WarningSection from "./WarningSection";
import SocialConnectionSection from "../SocialConnectionSection";

function SearchSection() {
  return (
    <Box
        sx={{
            backgroundImage: "url('/herobackground.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            p: { xs: 2, sm: 4, md: 10 },
            py:30
        }}
    >
        <SearchIntroSection/>
        <SearchBar/>
        <WarningSection/>
    </Box>
  );
}

export default SearchSection;