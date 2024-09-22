import { createAsyncThunk } from "@reduxjs/toolkit";

const productsUrl = "http://localhost:5000/api/v1/product";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch(productsUrl);
    const data = await response.json();
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct) => {
    const response = await fetch(productsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct) => {
    // console.log(updatedProduct, "thunk");

    const response = await fetch(`${productsUrl}/${updatedProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    // console.log(productId);
    await fetch(`${productsUrl}/${productId}`, {
      method: "DELETE",
    });
    return productId;
  }
);

export const reduceQuantity = createAsyncThunk(
  "product/reduceQuantity",
  async ({ _id, quantity }) => {
    // console.log(_id);
    // console.log(`${productsUrl}/${_id}`);
    await fetch(`${productsUrl}/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    return { _id, quantity };
  }
);
