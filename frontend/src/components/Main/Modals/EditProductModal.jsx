import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  Input,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../../../redux/productThunk";
import SnackbarComponent from "../../Snackbar/Snackbar";
import { style } from "../../styles/muiStyles";
import { productSchema } from "../../../zod/zodSchemas";
import { showSnackbar } from "../../../redux/productSlice";
const EditModal = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.product.items || []);

  let item = items.find((i) => i?._id === id);
  // console.log(item);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  // console.log(id);
  const onSubmit = (data) => {
    if (data.name && data.quantity && data.category) {
      dispatch(updateProduct(data));
      dispatch(
        showSnackbar({
          open: true,
          message: "Ürün güncelleme başarılı",
          severity: "success",
        })
      );
      handleClose();
    } else {
      dispatch(
        showSnackbar({
          open: true,
          message: "Basarisizlik söz konusu",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (item) {
      reset({
        _id: item?._id || "",
        name: item?.name || "",
        category: item?.category || "",
        quantity: item?.quantity || "",
      });
    }
  }, [item, reset]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" color="initial" align="center">
            Ürün Düzenle
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("_id")}
              defaultValue={item?.id}
              type="hidden"
              inputProps={{ "aria-hidden": true }}
            />
            <Table aria-label="simple table">
              <TableBody>
                <TableRow key={item?.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ paddingBottom: "40px" }}
                  >
                    <TextField
                      {...register("name")}
                      variant="outlined"
                      size="small"
                      label="Name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ paddingBottom: "40px" }}>
                    <TextField
                      {...register("category")}
                      variant="outlined"
                      size="small"
                      label="Category"
                      error={!!errors.category}
                      // helperText={errors.category?.message}
                    />
                  </TableCell>
                  <TableCell sx={{ paddingBottom: "40px" }}>
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
                  <TableCell sx={{ paddingBottom: "40px" }}>
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
      <SnackbarComponent
      // open={snack}
      // handleClose={handleCloseSnack}
      // message="Ürün başarıyla kaydedildi"
      />
    </>
  );
};

export default EditModal;
