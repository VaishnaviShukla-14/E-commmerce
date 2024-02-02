const mongoose = require("mongoose");

const ProductSchama = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDesc: {
      type: String,
      required: true,
    },
    productColor: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productSize: {
      type: String,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    productIagePath:{
        type:String,
        // required:true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchama);

module.exports = Product;
 