// import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./components/Navbar/Navbar.jsx";
import Products from "./components/Main/Products/Products";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Products />
        <Sidebar />
      </Box>
    </>
  );
}

export default App;
