import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearched } from "../../redux/productSlice";
import SearchBar from "./Searchbar";
import AddModal from "../Sidebar/Modals/AddProductModal";
import UsingProduct from "../Sidebar/Modals/UsingProductModal";
import AddProductButton from "./Buttons/AddProductButton";
import UseProductButton from "./Buttons/UsingProductButton";

export default function Sidebar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openUse, setOpenUse] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(setSearched(e.target.value));
  };

  const closeIcon = () => {
    setSearch("");
    dispatch(setSearched(""));
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenUse = () => setOpenUse(true);
  const handleCloseUse = () => setOpenUse(false);

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <SearchBar
        search={search}
        handleSearchChange={handleSearchChange}
        closeIcon={closeIcon}
      />
      <AddProductButton handleOpenAdd={handleOpenAdd} />
      <UseProductButton handleOpenUse={handleOpenUse} />
      <AddModal open={openAdd} handleClose={handleCloseAdd} />
      <UsingProduct open={openUse} handleClose={handleCloseUse} />
    </Box>
  );
}
