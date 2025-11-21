import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function UserStatSection({ currentUser, formData }) {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4 }}>
      {/* Stats Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          boxShadow: theme.shadows[8],
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Account Stats
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1" fontWeight={600}>Member Since</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.createdAt
                ? new Date(currentUser.createdAt).toLocaleString()
                : "N/A"}
            </Typography>

          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1" fontWeight={600}>Status</Typography>
            <Typography variant="body2" color={formData.is_active ? "success.main" : "error.main"}>
              {formData.is_active ? "Active" : "Inactive"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Activity Log Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          boxShadow: theme.shadows[8],
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your recent logins and updates will appear here. Last login: {currentUser.lastLogin || 'Never tracked'}.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Button variant="outlined" size="small">
          View Full History
        </Button>
      </Paper>
    </Box>
  );
}

export default UserStatSection;