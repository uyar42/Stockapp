import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  const { name, quantity, category } = req.body;
  // console.log(req.body);

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res.status(400).json({ message: "Ürün zaten mevcut-" });
  }
  // console.log(existingProduct);
  const newProduct = new Product({
    name,
    quantity,
    category,
  });
  // console.log(newProduct);

  try {
    const savedProduct = await newProduct.save();
    // console.log(savedProduct, "saved");
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const { name, quantity, category } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { name, quantity, category },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Ürün bulunamadı found" });
    }
    res.json({ message: "Ürün basariyla silindi " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const useProduct = async (req, res) => {
  const { id } = req.params;
  //   const Id = Number(id);

  const { quantity } = req.body;
  const product = await Product.findById(id);
  if (product.quantity >= quantity) {
    product.quantity -= quantity;
    await product.save();
    res.json(product);
  } else {
    res.status(400).json({ message: "Stok yetersiz" });
  }
};
