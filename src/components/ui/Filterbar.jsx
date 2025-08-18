import { useEventsFilter } from "../contexts/EventsFilterContext";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function FilterBar() {
  const { filters, setFilters } = useEventsFilter();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 8,
        mb: 3,
        borderRadius: 0,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {/* Title */}
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Filter Events
      </Typography>

      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {/* Status filter */}
        <FormControl size="medium" sx={{ minWidth: {xs:100, md:350} }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
          >
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Free">Free</MenuItem>
            <MenuItem value="Book Now">Book Now</MenuItem>
          </Select>
        </FormControl>

        {/* Type filter */}
        <FormControl size="medium" sx={{ minWidth: {xs:100, md:350} }}>
          <InputLabel>Event Type</InputLabel>
          <Select
            value={filters.type}
            label="Event Type"
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value }))
            }
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Performance">Performance</MenuItem>
            <MenuItem value="Family activity">Family Activity</MenuItem>
          </Select>
        </FormControl>

        {/* Date filter */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Event Date"
            value={filters.date}
            onChange={(newDate) =>
              setFilters((f) => ({ ...f, date: newDate }))
            }
            slotProps={{
              textField: { size: "medium", sx: {minWidth: {xs:100, md:350} } },
            }}
          />
        </LocalizationProvider>
      </Stack>
    </Paper>
  );
}

export default FilterBar;