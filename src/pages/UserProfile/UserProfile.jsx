import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

// Custom components
import UserDashboardHeader from "../../pages/UserPanel/UserDashboardHeader";
import ProfileAvatar from "./ProfileAvatar";
import UserDetailsForm from "./UserDetailsForm";
import PasswordDialog from "./PasswordDialog";
import UserStatSection from "./UserStatSection";
import CustomAlert from "./CustomAlert";

// Theme
import { lightTheme, darkTheme } from "../../styles/theme";

// Custom hook
import { useProfile } from "../../hooks/useProfile";

function UserProfile() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    user,
    setUser,
    fetchedUser,
    loading,
    editMode,
    setEditMode,
    formData,
    alert,
    setAlert,
    passwordDialogOpen,
    setPasswordDialogOpen,
    passwordData,
    setPasswordData,
    handleInputChange,
    handleUpdateProfile,
    handlePasswordChange,
  } = useProfile();

  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);
  const handleAlertClose = () => setAlert({ show: false });

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  if (!fetchedUser && !user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Alert severity="warning">Please log in to view your profile.</Alert>
      </Box>
    );
  }

  const currentUser = fetchedUser || user;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          bgcolor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UserDashboardHeader
          user={currentUser}
          setUser={setUser}
          mobileMenuOpen={mobileMenuOpen}
          handleMobileMenuToggle={handleMobileMenuToggle}
        />
        <Box
          sx={{
            flex: 1,
            pt: { xs: 8, md: 6 },
            px: { xs: 2, md: 4 },
            pb: 4,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Alert */}
          <CustomAlert alert={alert} onClose={handleAlertClose} />

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              color="text.primary"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              My Profile
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage your personal information, account settings, and security preferences. Keep your details up to date to ensure smooth interactions across our platform.
            </Typography>
          </Box>

          {/* Main Profile Card */}
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              boxShadow: theme.shadows[8],
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: theme.shadows[10] },
            }}
          >
            <Grid container spacing={3}>
              <ProfileAvatar
                formData={formData}
                editMode={editMode}
                handleInputChange={handleInputChange}
              />
              <UserDetailsForm
                formData={formData}
                currentUser={currentUser}
                editMode={editMode}
                handleInputChange={handleInputChange}
                setEditMode={setEditMode}
                handleUpdateProfile={handleUpdateProfile}
                setPasswordDialogOpen={setPasswordDialogOpen}
              />
            </Grid>
          </Paper>

          {/* Additional Content Sections */}
          <UserStatSection currentUser={currentUser} formData={formData} />

          {/* Password Dialog */}
          <PasswordDialog
            open={passwordDialogOpen}
            onClose={() => setPasswordDialogOpen(false)}
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            handlePasswordChange={handlePasswordChange}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserProfile;