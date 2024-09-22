import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Searchbar from "./Searchbar";
import { MenuItem } from "@mui/material";

const Navbar = () => {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Toolbar>
          <MenuItem>
            <Typography variant="h6">Products</Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
