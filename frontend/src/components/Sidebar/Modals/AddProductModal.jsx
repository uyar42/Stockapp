import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
// import { addNewItem } from "../../redux/productSlice";
import { useEffect, useState } from "react";
import { addProduct } from "../../../redux/productThunk.js";
import { style } from "../../styles/muiStyles.js";
import { productSchema } from "../../../zod/zodSchemas.js";
import SnackbarComponent from "../../Snackbar/Snackbar.jsx";
import { showSnackbar } from "../../../redux/productSlice.js";

const AddModal = ({ open, handleClose }) => {
  const items = useSelector((state) => state.product.items);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // const getNextId = () => {
  //   if (items.length === 0) return 1;
  //   const maxId = Math.max(...items.map((item) => item.id));
  //   return maxId + 1;
  // };

  const onSubmit = (data) => {
    if (!data) return;

    const existItem = items.find((item) => item.name === data.name);
    if (existItem) {
      dispatch(
        showSnackbar({
          open: false,
          message: "Ürün zaten mevcut",
          severity: "error",
        })
      );
      // handleClose();
    } else {
      dispatch(addProduct(data));
      dispatch(
        showSnackbar({
          open: false,
          message: "Ürün başarıyla eklendi",
          severity: "success",
        })
      );
      handleClose();
    }
  };

  useEffect(() => {
    // getNextId();
    reset({
      _id: "",
      name: "",
      category: "",
      quantity: "",
    });
  }, [open]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" variant="h5">
            Ürün Ekle
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input type="hidden" {...register("id")} name="id" /> */}
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <TextField
                      {...register("name")}
                      variant="outlined"
                      size="small"
                      label="Name"
                      error={!!errors.name}
                      // helperText={errors.name?.message}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      {...register("category")}
                      variant="outlined"
                      size="small"
                      label="Category"
                      error={!!errors.category}
                      // helperText={errors.category?.message}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      {...register("quantity", { valueAsNumber: true })}
                      type="number"
                      variant="outlined"
                      size="small"
                      label="Quantity"
                      error={!!errors.quantity}
                      // helperText={errors.quantity?.message}
                    />
                  </TableCell>
                  <TableCell>
                    <Button type="submit">
                      <DoneIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </Box>
      </Modal>
      <SnackbarComponent />
    </>
  );
};

export default AddModal;
