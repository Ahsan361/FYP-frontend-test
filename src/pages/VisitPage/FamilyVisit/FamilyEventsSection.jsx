import React from 'react';
import { 
  Typography, 
  Grid, 
  Box, 
  Container, 
  Grow, 
  Slide, 
  useMediaQuery,
  Paper
} from '@mui/material';
import { 
  EventSeat,
  Map,
  Museum,
  FamilyRestroom,
  ArrowForward
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Custom components
import { lightTheme, darkTheme } from '../../../styles/theme';
import ExplorationGrid from '../../../components/ui/ExplorationGrid';

function FamilyEventsSection() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const visitInfo = [
    { 
      id: 1,
      title: "Deities, demons and mischief-makers",
      type: "Performance/Family activity",
      dates: "Various Dates",
      status: "Free",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Gather the family for storytelling sessions evoking the colourful, sensory and atmospheric world of our current 'Ancient Indial exhibition.",
      actionText: "Explore More"
    },
    { 
      id: 2,
      title: "Little Feet: teddies on holiday",
      type: "Family activity",
      dates: "15 March - 30 August 2025",
      status: "Free",
      statusColor: "success",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Join the Little Feet teddies on their summer holidays through fun experiences and activities in this drop-in session for under-fives.",
      actionText: "Explore More"
    }
  ];

  return (
    <ExplorationGrid
      title="Family Events"
      subtitle="Plan your perfect museum experience with our multiple visitor options and essential information"
      items={visitInfo}
    />
  );
}

export default FamilyEventsSection;
