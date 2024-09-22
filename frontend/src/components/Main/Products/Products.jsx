import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredProducts,
  showSnackbar,
} from "../../../redux/productSlice";
import EditModal from "../Modals/EditProductModal";
import DeleteDialog from "../../Dialogs/DeleteDialog";
import { Button } from "@mui/material";
import { deleteProduct, fetchProducts } from "../../../redux/productThunk.js";
import SnackbarComponent from "../../Snackbar/Snackbar";

export default function Products() {
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = (item) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteProduct(itemToDelete._id));
      dispatch(
        showSnackbar({
          open: true,
          message: "Ürün silme başarılı",
          severity: "success",
        })
      );
      handleCloseDialog();
    }
  };

  const cellStyles = { width: 150 };
  // console.log(products);
  return (
    <>
      <EditModal open={open} handleClose={handleClose} id={selectedId} />
      <DeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
      />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "500px", maxWidth: "1000px", marginY: "20px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyles}>Name</TableCell>
              <TableCell sx={cellStyles}>Category</TableCell>
              <TableCell sx={cellStyles}>Quantity</TableCell>
              <TableCell sx={cellStyles} align="left">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.length > 0 ? (
              products.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell sx={cellStyles}>{row.name}</TableCell>
                  <TableCell sx={cellStyles}>{row.category}</TableCell>
                  <TableCell sx={cellStyles}>{row.quantity}</TableCell>
                  <TableCell
                    sx={{ display: "flex", gap: "6px", minWidth: 150 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(row._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenDialog(row)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  {status === "loading" ? "Yükleniyor" : "ÜRÜN BULUNAMADI"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarComponent />;
    </>
  );
}
