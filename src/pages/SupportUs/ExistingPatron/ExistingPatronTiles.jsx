// ArtifactPage.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Tiles from "../../../components/ui/Tiles"

function ExistingPatronTiles() {
  // Example artifact data
  const artifactData = [
  {
    floor: "",
    image: "/room4.jpg",
    artifactName: "Keeping clocks and watches ticking",
    artifactDetail: "Made by Thomas Tompion in London in about 1689, this year-running clock is a masterpiece requiring painstaking conservation. Not only is its silver ornamentation unmatched in quality, but the clock is a technical feat: when fully wound, it will keep the time and strike the hour on a bell for over a year. Like so many objects in the Museum's Clocks and watches gallery, the Mostyn Tompion Clock requires regular maintenance by the horology team. The spring that keeps it running all year round gradually deteriorates over decades of winding and working. Replacing it properly requires precision and skill, absorbing hundreds of hours of a conservator's time. When the gallery first opened in 2008, about 48 objects were running but now there are only 22. Our 2025 appeal is for donations to allow additional curators to help us keep up with the volume of work, so that ticking, chiming and music can flourish once again.",
    buttonText: "Visit Room 25"
  },
    {
    floor: "",
    image: "/room4.jpg",
    artifactName: "Keeping clocks and watches ticking",
    artifactDetail: "Made by Thomas Tompion in London in about 1689, this year-running clock is a masterpiece requiring painstaking conservation. Not only is its silver ornamentation unmatched in quality, but the clock is a technical feat: when fully wound, it will keep the time and strike the hour on a bell for over a year. Like so many objects in the Museum's Clocks and watches gallery, the Mostyn Tompion Clock requires regular maintenance by the horology team. The spring that keeps it running all year round gradually deteriorates over decades of winding and working. Replacing it properly requires precision and skill, absorbing hundreds of hours of a conservator's time. When the gallery first opened in 2008, about 48 objects were running but now there are only 22. Our 2025 appeal is for donations to allow additional curators to help us keep up with the volume of work, so that ticking, chiming and music can flourish once again.",
    buttonText: "Visit Room 25"
  },


];


  // Group artifacts by floor
  const groupedArtifacts = artifactData.reduce((groups, item) => {
    if (!groups[item.floor]) groups[item.floor] = [];
    groups[item.floor].push(item);
    return groups;
  }, {});

  return (
    <Box sx={{ py: 4 }}>
      {Object.entries(groupedArtifacts).map(([floor, items], index) => (
        <Box key={index} sx={{ mb: 6 }}>
          {/* Floor heading */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              px: { xs: 2, md: 6 },
            }}
          >
            {floor}
          </Typography>

          {/* List of artifacts under this floor */}
          {items.map((artifact, idx) => (
            <Tiles
              key={idx}
              title={artifact.floor}
              image={artifact.image}
              artifactName={artifact.artifactName}
              artifactDetail={artifact.artifactDetail}
              buttonText={artifact.buttonText}
              onButtonClick={() => console.log(`Clicked ${artifact.artifactName}`)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default ExistingPatronTiles;
