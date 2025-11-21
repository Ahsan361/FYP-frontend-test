import React from "react";
import { Avatar, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

function ProfileAvatar({ formData, editMode, handleInputChange, uploading }) {
  const theme = useTheme();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      handleInputChange({
        target: { name: "avatar", value: fileUrl },
        file: file,
      });
    }
  };

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
        {formData?.avatar ? "" : formData.first_name?.charAt(0).toUpperCase()}
      </Avatar>

      {editMode && (
        <Button
          variant="outlined"
          component="label"
          size="small"
          sx={{ mb: 2 }}
        >
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      )}

      <Typography variant="h5" fontWeight={600}>
        {`${formData.first_name || ""} ${formData.last_name || ""}`.trim() ||
          formData.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formData.email}
      </Typography>
    </Grid>
  );
}

export default ProfileAvatar;
