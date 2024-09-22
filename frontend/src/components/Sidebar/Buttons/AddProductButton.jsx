import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddProductButton = ({ handleOpenAdd }) => {
  return (
    <Button sx={{ gap: "10px" }} onClick={handleOpenAdd}>
      <AddIcon fontSize="large" />
      <Typography variant="h6">Ürün Ekle</Typography>
    </Button>
  );
};

export default AddProductButton;
