const Product = require("../models/Product");
// const fs = require("fs");
require("dotenv").config();

//addproduct
const addProduct = async (req, res) => {
  const {
    productName,
    productDesc,
    productColor,
    productCategory,
    productSize,
    productPrice,
  } = req.body;
  const productIagePath = req.file ? req.file.path : "";
  const filename = productIagePath.substr(7);
  const fileUrl =
  req.protocol + "://" + req.hostname + ":" + process.env.PORT + filename;
  try {
    if (
      !productName ||
      !productDesc ||
      !productColor ||
      !productCategory ||
      !productSize ||
      !productPrice
    ) {
      return res.status(200).json({ message: "All Feild Are Allow !" });
    }

    const newProduct = new Product({
      productName,
      productDesc,
      productColor,
      productCategory,
      productSize,
      productPrice,
      productIagePath: fileUrl,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product Add ", seccuss: true, newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error ", seccuss: false });
  }
};

//getProduct
const getProduct = async (_, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ mess: "product Find Successfully", products });
  } catch (error) {
    res.status(400).json({ mess: "product not found", error });
  }
};

//search
const searchProduct = async (req, res) => {
  const { productCategory } = req.body;

  try {
    const product = await Product.find({
      productCategory: `${productCategory}`,
    });
    res.status(200).json({ mess: "product is find", product });
  } catch (error) {}
};

//delete prooduct
const deleteProduct = async (req, res) => {
  const ProductId = req.params._id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(ProductId);
    const imageToDelete = deletedProduct.productImagePath;
    // if (imageToDelete) {
    //   const deletePath = imageToDelete.substr(22);
    //   try {
    //     const { unlinkSync } = require("fs");
    //     unlinkSync(`../uploads/${deletePath}`);
    //     console.log("Image Deleted Successfully");
    //   } catch (error) {
    //     console.error("Error deleting image:", error);
    //   }
    // } else {
    //   console.error("No image path provided for deletion");
    // }

    res.status(200).json({ mess: "product deleted" });
  } catch (error) {
    res.status(400).json({ mess: "Data not found" });
  }
};

//update the product
const updateProduct = async (req, res) => {
  const ProductId = req.params._id;
  const {
    productName,
    productDesc,
    productColor,
    productCategory,
    productSize,
    productPrice,
  } = req.body;
  const productIagePath = req.file ? req.file.path : "";
  const filename = productIagePath.substr(7);
  const fileUrl =
    req.protocol + "://" + req.hostname + ":" + process.env.PORT + filename;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: ProductId,
      },
      {
        $set: {
          productName,
          productDesc,
          productColor,
          productCategory,
          productSize,
          productPrice,
          productIagePath: fileUrl,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ mess: "upadated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ mess: "Server Error" });
  }
};

// getsingle product
const getOneProduct = async (req, res) => {
  const ProductId = req.params._id;
  // console.log(ProductId);
  try {
    const findOneProduct = await Product.findOne({ _id: ProductId });
    res
      .status(200)
      .json({ mess: "Find One Product Successfully", findOneProduct });
  } catch (error) {
    res.status(500).json({ mess: "Server Error" });
  }
};

module.exports = {
  addProduct,
  getProduct,
  searchProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
};
