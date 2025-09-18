import React from "react";
import { Avatar, Typography, TextField, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function ProfileAvatar({ formData, editMode, handleInputChange }) {
  const theme = useTheme();
  return (
    <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
      <Avatar
        src={formData.avatar}
        sx={{
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
          mb: 2,
          mx: "auto",
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        {formData?.avatar? "": formData.first_name?.charAt(0).toUpperCase()}
      </Avatar>
      {editMode && (
        <TextField
          fullWidth
          label="Avatar URL"
          name="avatar"
          value={formData.avatar}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
      )}
      <Typography variant="h5" fontWeight={600}>
        {`${formData.first_name || ''} ${formData.last_name || ''}`.trim() || formData.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formData.email}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Role: {formData.role}
      </Typography>
    </Grid>
  );
}

export default ProfileAvatar;