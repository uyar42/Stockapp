import { useDispatch, useSelector } from "react-redux";
// import { useItem } from "../../redux/productSlice";
import { useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { usingStockSchema } from "../../../zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reduceQuantity } from "../../../redux/productThunk";
import { style } from "../../styles/muiStyles.js";
import { showSnackbar } from "../../../redux/productSlice";

export default function UsingProduct({ open, handleClose }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usingStockSchema),
  });

  const onSubmit = (data) => {
    let usingproduct = products.find((f) => f._id === data._id);
    console.log(usingproduct, data.quantity);

    if (usingproduct?.quantity >= data?.quantity) {
      let reduced = {
        _id: data._id,
        quantity: data.quantity,
      };
      dispatch(reduceQuantity(reduced));
      dispatch(
        showSnackbar({
          open: true,
          message: "Ürün kullanımınız başarılı",
          severity: "success",
        })
      );
      handleClose();
    } else {
      dispatch(
        showSnackbar({
          open: true,
          message: "Ürün sayısı yetersiz",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    reset({
      _id: "",
      quantity: undefined,
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
          {" "}
          <Typography variant="h5" color="initial" align="center">
            Ürün Seçimi
          </Typography>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              select
              label="Ürün Seç"
              {...register("_id")}
              error={!!errors._id}
              helperText={errors._id?.message}
              defaultValue="" //
              fullWidth
              margin="normal"
            >
              {products?.map((product) => (
                <MenuItem key={product?._id} value={product?._id}>
                  {product?.name} (Stok: {product?.quantity})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Miktar"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "8px", alignSelf: "center" }}
              type="submit"
            >
              Stoktan Düş
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
