import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Chip,
  Paper,
  IconButton,
  Alert,
  Collapse,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  EventNote,
  Museum,
  Cancel,
  Delete,
  Info,
  Close,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

// Custom components
import { Card, Button, Loading, Modal } from "../../components/ui";
import UserDashboardHeader from "./UserDashboardHeader";

// Theme
import { lightTheme, darkTheme } from "../../styles/theme";

// Services
import {
  getMyExhibitionRegistrations,
  cancelExhibitionRegistration,
  deleteExhibitionRegistration,
} from "../../services/exhibitionRegistrationService";
import {
  getMyEventRegistrations,
  cancelEventRegistration,
  deleteEventRegistration,
} from "../../services/EventRegistrationService";

// Context
import { UserContext } from "../../contexts/UserContext";

// Reusable Registration Card Component
const RegistrationCard = ({
  registration,
  type,
  onCancel,
  onDelete,
  onViewDetails,
  theme,
}) => {
  const isExhibition = type === "exhibition";
  const eventData = isExhibition ? registration.exhibition_id : registration.event_id;

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "unpaid":
        return "warning";
      case "refunded":
        return "info";
      default:
        return "default";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[10],
          transform: "translateY(-4px)",
        },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {isExhibition ? (
                <Museum sx={{ mr: 1, color: "primary.main" }} />
              ) : (
                <EventNote sx={{ mr: 1, color: "primary.main" }} />
              )}
              <Typography variant="overline" color="primary.main" fontWeight={600}>
                {isExhibition ? "EXHIBITION" : "EVENT"}
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {eventData?.title || "Title N/A"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {isExhibition
                ? `${formatDate(eventData?.start_date)} - ${formatDate(eventData?.end_date)}`
                : formatDate(eventData?.start_datetime)}
            </Typography>
            {eventData?.location && (
              <Typography variant="body1" color="text.secondary">
                📍 {eventData.location}
              </Typography>
            )}
          </Grid>
          <Grid size={{xs:12, md:4}}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Registration Status
              </Typography>
              <Chip
                label={registration.registration_status}
                color={getStatusColor(registration.registration_status)}
                size="small"
                sx={{ textTransform: "capitalize", mb: 1, fontWeight: 500 }}
              />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Payment Status
              </Typography>
              <Chip
                label={registration.payment_status}
                color={getPaymentColor(registration.payment_status)}
                size="small"
                sx={{ textTransform: "capitalize", fontWeight: 500 }}
              />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Confirmation Code
              </Typography>
              <Typography variant="body1" fontFamily="monospace" fontWeight="bold">
                {registration.confirmation_code}
              </Typography>
              {registration.spots_requested && registration.spots_requested > 1 && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Spots: {registration.spots_requested}
                </Typography>
              )}
              {registration.total_amount && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Amount: ${registration.total_amount}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid size={{xs:12, md:2}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<Info />}
                onClick={() => onViewDetails(registration)}
                fullWidth
                sx={{ borderRadius: 1 }}
              >
                Details
              </Button>
              {registration.registration_status !== "cancelled" && (
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  startIcon={<Cancel />}
                  onClick={() => onCancel(registration)}
                  fullWidth
                  sx={{ borderRadius: 1 }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Delete />}
                onClick={() => onDelete(registration)}
                fullWidth
                sx={{ borderRadius: 1 }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

// Registration Details Modal Component
const DetailsModal = ({ open, onClose, registration, type }) => {
  const isExhibition = type === "exhibition";
  const eventData = isExhibition ? registration?.exhibition_id : registration?.event_id;

  if (!registration) return null;

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${isExhibition ? "Exhibition" : "Event"} Registration Details`}
      maxWidth="md"
    >
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {isExhibition ? "Exhibition" : "Event"} Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
              <Typography variant="body1">{eventData?.title || "N/A"}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1">
                {isExhibition
                  ? `${formatDateTime(eventData?.start_date)} - ${formatDateTime(
                      eventData?.end_date
                    )}`
                  : formatDateTime(eventData?.start_datetime)}
              </Typography>
            </Box>
            {eventData?.location && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1">{eventData.location}</Typography>
              </Box>
            )}
            {eventData?.description && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">{eventData.description}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Registration Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Confirmation Code
              </Typography>
              <Typography variant="body1" fontFamily="monospace" fontWeight="bold">
                {registration.confirmation_code}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Registration Date
              </Typography>
              <Typography variant="body1">
                {formatDateTime(registration.registration_date)}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                <Chip
                  label={registration.registration_status}
                  color={
                    registration.registration_status === "confirmed"
                      ? "success"
                      : "warning"
                  }
                  size="small"
                />
                <Chip
                  label={registration.payment_status}
                  color={
                    registration.payment_status === "paid" ? "success" : "warning"
                  }
                  size="small"
                />
              </Box>
            </Box>
            {registration.spots_requested && registration.spots_requested > 1 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Spots Booked
                </Typography>
                <Typography variant="body1">{registration.spots_requested}</Typography>
              </Box>
            )}
            {registration.attendees && registration.attendees.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Attendees
                </Typography>
                {registration.attendees.map((attendee, index) => (
                  <Paper key={index} sx={{ p: 1.5, mb: 1, bgcolor: "grey.50" }}>
                    <Typography variant="body2" fontWeight={500}>
                      {attendee.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Age: {attendee.age} | CNIC: {attendee.cnic}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
            {registration.special_requirements && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Special Requirements
                </Typography>
                <Typography variant="body1">{registration.special_requirements}</Typography>
              </Box>
            )}
            {registration.total_amount && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="h6" color="primary.main">
                  ${registration.total_amount}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

// Main User Dashboard Component
function UserPanel() {
  const [currentTab, setCurrentTab] = useState(0);
  const [exhibitionRegistrations, setExhibitionRegistrations] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", severity: "info" });
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;
  const { user, setUser } = useContext(UserContext);
  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    if (!user?.token) return;

    setLoading(true);
    try {
      const [exhibitions, events] = await Promise.all([
        getMyExhibitionRegistrations(user.token),
        getMyEventRegistrations(user.token),
      ]);
      setExhibitionRegistrations(exhibitions);
      setEventRegistrations(events);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setAlert({
        show: true,
        message: "Failed to load registrations",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (registration, type) => {
    try {
      if (type === "exhibition") {
        await cancelExhibitionRegistration(registration._id, user.token);
      } else {
        await cancelEventRegistration(registration._id, user.token);
      }
      setAlert({
        show: true,
        message: "Registration cancelled successfully",
        severity: "success",
      });
      await fetchRegistrations();
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || "Failed to cancel registration",
        severity: "error",
      });
    }
  };

  const handleDelete = async (registration, type) => {
    try {
      if (type === "exhibition") {
        await deleteExhibitionRegistration(registration._id, user.token);
      } else {
        await deleteEventRegistration(registration._id, user.token);
      }
      setAlert({
        show: true,
        message: "Registration deleted successfully",
        severity: "success",
      });
      await fetchRegistrations();
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || "Failed to delete registration",
        severity: "error",
      });
    }
  };

  const handleViewDetails = (registration, type) => {
    setSelectedRegistration({ ...registration, type });
    setDetailsModalOpen(true);
  };

  const getStats = () => {
    const allRegistrations = [...exhibitionRegistrations, ...eventRegistrations];
    return {
      total: allRegistrations.length,
      confirmed: allRegistrations.filter((r) => r.registration_status === "confirmed")
        .length,
      pending: allRegistrations.filter((r) => r.registration_status === "pending").length,
      cancelled: allRegistrations.filter((r) => r.registration_status === "cancelled")
        .length,
    };
  };

  const stats = getStats();

  if (!user) {
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
        <Alert severity="warning">Please log in to view your registrations.</Alert>
      </Box>
    );
  }

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
          user={user}
          setUser={setUser}
          mobileMenuOpen={mobileMenuOpen}
          handleMobileMenuToggle={handleMobileMenuToggle}
        />
        <Box
          sx={{
            flex: 1,
            pt: { xs: 8, md: 6 }, // Space for fixed header
            px: { xs: 2, md: 4 }, // Responsive padding
            pb: 4,
            width: "100%",
            maxWidth: "100%", // Ensure full width
            boxSizing: "border-box",
          }}
        >
          {/* Alert */}
          <Collapse in={alert.show}>
            <Alert
              severity={alert.severity}
              sx={{ mb: 3, borderRadius: 2 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setAlert({ show: false })}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.message}
            </Alert>
          </Collapse>

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              color="text.primary"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              My Registrations
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage your exhibition and event registrations
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              { label: "Total Registrations", value: stats.total, color: "primary.main" },
              { label: "Confirmed", value: stats.confirmed, color: "success.main" },
              { label: "Pending", value: stats.pending, color: "warning.main" },
              { label: "Cancelled", value: stats.cancelled, color: "error.main" },
            ].map((stat, index) => (
              <Grid size={{xs:12, sm:6, md:3}} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": { boxShadow: theme.shadows[6] },
                  }}
                >
                  <Typography variant="h4" color={stat.color} fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Tabs */}
          <Paper sx={{ mb: 3, borderRadius: 2 }}>
            <Tabs
              value={currentTab}
              onChange={(e, newValue) => setCurrentTab(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": { fontWeight: 500, fontSize: "1rem" },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Museum />
                    Exhibitions ({exhibitionRegistrations.length})
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EventNote />
                    Events ({eventRegistrations.length})
                  </Box>
                }
              />
            </Tabs>
          </Paper>

          {/* Content */}
          {loading ? (
            <Loading message="Loading your registrations..." />
          ) : (
            <Box>
              {currentTab === 0 && (
                <Box>
                  {exhibitionRegistrations.length === 0 ? (
                    <Paper
                      sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: 2,
                        bgcolor: theme.palette.grey[100],
                      }}
                    >
                      <Museum sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No exhibition registrations found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start exploring exhibitions and register for events that interest you.
                      </Typography>
                    </Paper>
                  ) : (
                    exhibitionRegistrations.map((registration) => (
                      <RegistrationCard
                        key={registration._id}
                        registration={registration}
                        type="exhibition"
                        theme={theme}
                        onCancel={() => handleCancel(registration, "exhibition")}
                        onDelete={() => handleDelete(registration, "exhibition")}
                        onViewDetails={() => handleViewDetails(registration, "exhibition")}
                      />
                    ))
                  )}
                </Box>
              )}
              {currentTab === 1 && (
                <Box>
                  {eventRegistrations.length === 0 ? (
                    <Paper
                      sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: 2,
                        bgcolor: theme.palette.grey[100],
                      }}
                    >
                      <EventNote sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No event registrations found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Discover upcoming events and register to participate.
                      </Typography>
                    </Paper>
                  ) : (
                    eventRegistrations.map((registration) => (
                      <RegistrationCard
                        key={registration._id}
                        registration={registration}
                        type="event"
                        theme={theme}
                        onCancel={() => handleCancel(registration, "event")}
                        onDelete={() => handleDelete(registration, "event")}
                        onViewDetails={() => handleViewDetails(registration, "event")}
                      />
                    ))
                  )}
                </Box>
              )}
            </Box>
          )}

          {/* Details Modal */}
          <DetailsModal
            open={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            registration={selectedRegistration}
            type={selectedRegistration?.type}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserPanel;