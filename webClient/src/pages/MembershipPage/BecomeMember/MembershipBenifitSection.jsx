import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventIcon from "@mui/icons-material/Event";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function MembershipBenefitSection() {
  const benefits = [
    { title: "Free unlimited entry to exhibitions", icon: <ConfirmationNumberIcon sx={{ fontSize: 80 }} /> },
    { title: "Members-only events programme", icon: <EventIcon sx={{ fontSize: 80 }} /> },
    { title: "Exclusive Members' space", icon: <LocalCafeIcon sx={{ fontSize: 80 }} /> },
    { title: <><em>BM Magazine</em> subscription</>, icon: <MenuBookIcon sx={{ fontSize: 80 }} /> },
    { title: "Special Member discounts", icon: <LocalOfferIcon sx={{ fontSize: 80 }} /> },
    
  ];

  return (
    <Grid container spacing={2} justifyContent="center" sx={{py:{xs:2, sm:4, md:8}}}>
      {benefits.map((benefit, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
          <Stack spacing={1} alignItems="center" textAlign="center">
            {benefit.icon}
            <Typography sx={{fontSize: {xs:"0.9rem", sm:"1rem", md:"1.5rem"}}}>{benefit.title}</Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default MembershipBenefitSection;
