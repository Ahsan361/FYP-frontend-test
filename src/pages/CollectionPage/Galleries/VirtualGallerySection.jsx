import React from "react";
import { Box, Typography } from "@mui/material";

//my custom components
import Tiles from "../../../components/ui/Tiles"

function VirtualGallerySection() {
  const artifactData = [
    {
      floor: "Virtual galleries",
      image: "room4.jpg", 
      artifactName: "Oceania",
      artifactDetail:
        "Red mask made from fibre glass, polyester resin, ply and balsar wood and bamboo",
      buttonText: "Explore the Oceania collection",
    },
    {
      floor: "Virtual galleries",
      image: "room4.jpg", 
      artifactName: "Prints and drawings",
      artifactDetail: "Drawing of boats sailing on rough seas",
      buttonText: "Explore the Prints and drawings collection",
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          mb: 3,
          px: { xs: 2, md: 6 },
        }}
      >
        Virtual galleries
      </Typography>

      {artifactData.map((artifact, idx) => (
        <Tiles
          key={idx}
          title={artifact.floor}
          image={artifact.image}
          artifactName={artifact.artifactName}
          artifactDetail={artifact.artifactDetail}
          buttonText={artifact.buttonText}
          onButtonClick={() => console.log(`Clicked: ${artifact.artifactName}`)}
        />
      ))}
    </Box>
  );
}

export default VirtualGallerySection;
