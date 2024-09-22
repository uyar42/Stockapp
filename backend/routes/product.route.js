import express from "express";

import {
  addProduct,
  editProduct,
  useProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controllers.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", editProduct);
router.patch("/:id", useProduct);
// router.get('/products/:id');

export default router;
