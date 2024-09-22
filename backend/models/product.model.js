import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // id: {
  //   type: mongoose.Schema.ObjectId,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    // required: true,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
