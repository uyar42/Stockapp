import { createSlice } from "@reduxjs/toolkit";
import data from "../mock.js";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  reduceQuantity,
} from "./productThunk.js";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    searched: "",
    status: "idle",
    snackbar: { open: false, message: "", severity: "" },
  },
  reducers: {
    setSearched: (state, action) => {
      state.searched = action.payload;
    },
    showSnackbar: (state, action) => {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //add
      .addCase(addProduct.fulfilled, (state, action) => {
        // console.log(action.payload);
        let existItem = state.items.find((i) => i.name === action.payload.name);
        if (!existItem) {
          state.items.push(action.payload);
        } else {
          return state.items;
        }
      })
      //update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        // console.log(action.payload._id);
        state.items[index] = action.payload;
      })
      //delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      //reduce
      .addCase(reduceQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index].quantity -= action.payload.quantity;
        } else {
          console.log("Ürün bulunamadı");
        }
      });
  },
});

export const selectFilteredProducts = (state) => {
  const { items, searched } = state.product;
  if (!searched) return items;

  const searchedLower = searched.toLowerCase();
  return items.filter((product) =>
    product.name.toLowerCase().startsWith(searchedLower)
  );
};

export default productSlice.reducer;
export const { setSearched, showSnackbar, hideSnackbar } = productSlice.actions;
