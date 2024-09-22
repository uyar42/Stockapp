import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({ search, handleSearchChange, closeIcon }) {
  return (
    <TextField
      placeholder="Ürün..."
      variant="outlined"
      value={search}
      onChange={handleSearchChange}
      id="fullWidth"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => closeIcon()}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ backgroundColor: "white", margin: "20px" }}
    />
  );
}
