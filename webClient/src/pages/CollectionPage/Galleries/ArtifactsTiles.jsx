// ArtifactPage.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Tiles from "../../../components/ui/Tiles"

function ArtifactsTiles() {
  // Example artifact data
  const artifactData = [
  {
    floor: "Lower floor",
    image: "/room4.jpg",
    artifactName: "Africa",
    artifactDetail: "Room 25 (The Sainsbury Galleries)",
    buttonText: "Visit Room 25"
  },
  {
    floor: "Ground floor",
    image: "/room4.jpg",
    artifactName: "Enlightenment",
    artifactDetail: "Room 1",
    buttonText: "Visit Room 1"
  },
  {
    floor: "Ground floor",
    image: "/room4.jpg",
    artifactName: "Collecting the world",
    artifactDetail: "Room 2",
    buttonText: "Visit Room 2"
  },
  {
    floor: "Upper floor",
    image: "/room4.jpg",
    artifactName: "China and South Asia",
    artifactDetail: "Room 33 (The Sir Joseph Hotung Gallery)",
    buttonText: "Visit Room 33"
  },
  {
    floor: "Upper floor",
    image: "/room4.jpg",
    artifactName: "India: Amaravati",
    artifactDetail: "Room 33a (The Asahi Shimbun Gallery)",
    buttonText: "Visit Room 33a"
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

export default ArtifactsTiles;
