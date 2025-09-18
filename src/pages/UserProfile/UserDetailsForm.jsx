import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { Edit, Lock } from "@mui/icons-material";

function UserDetailsForm({
  formData,
  currentUser,
  editMode,
  handleInputChange,
  setEditMode,
  handleUpdateProfile,
  setPasswordDialogOpen,
}) {
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Account Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              disabled={!editMode}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              disabled={!editMode}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              disabled={!editMode}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              disabled={!editMode}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              }
              label="Account Active"
            />
          </Grid>
          {currentUser.updatedAt && (
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date(currentUser.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => setEditMode(!editMode)}
          sx={{ borderRadius: 1 }}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
        {editMode && (
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateProfile}
            sx={{ borderRadius: 1 }}
          >
            Save Changes
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<Lock />}
          onClick={() => setPasswordDialogOpen(true)}
          sx={{ borderRadius: 1 }}
        >
          Reset Password
        </Button>
      </Box>
    </Grid>
  );
}

export default UserDetailsForm;