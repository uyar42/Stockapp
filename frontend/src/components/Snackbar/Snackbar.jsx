import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../../redux/productSlice";

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.product.snackbar || {}
  );
  // console.log(open, message, severity);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
