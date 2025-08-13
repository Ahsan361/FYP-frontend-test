import { MenuItem, Container, TextField, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";

import Button from "../../../../components/ui/Button";

const SEARCH_FIELDS = [
  { value: "all", label: "All fields" },
  { value: "person", label: "Person" },
  { value: "place", label: "Place" },
  { value: "museum_number", label: "Museum number" },
];

function SearchBar({ onSearch }) {
  const theme = useTheme();
  const [searchField, setSearchField] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => onSearch?.({ field: searchField, query: searchQuery });

  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.paper,
      '& fieldset': { borderColor: theme.palette.divider },
      '&:hover fieldset': { borderColor: theme.palette.primary.main },
      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      padding: theme.spacing(1.5),
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          sx={{ ...fieldStyles, flex: { xs: 1, sm: 2 }, minWidth: { sm: 150 } }}
        >
          {SEARCH_FIELDS.map((field) => (
            <MenuItem key={field.value} value={field.value}>
              {field.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search keyword, person, place, or museum number"
          sx={{ ...fieldStyles, flex: { xs: 1, sm: 4 } }}
        />

        <Button 
            variant="contained" 
            size="large" 
            >
            <Search/>
        </Button>
      </Stack>
    </Container>
  );
}

export default SearchBar;