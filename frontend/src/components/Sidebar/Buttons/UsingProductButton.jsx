import { Button, Typography } from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
const UsingProductButton = ({ handleOpenUse }) => {
  return (
    <Button sx={{ gap: "10px" }} onClick={handleOpenUse}>
      <WorkIcon fontSize="large" />
      <Typography variant="h6">Ürün Seç</Typography>
    </Button>
  );
};

export default UsingProductButton;
