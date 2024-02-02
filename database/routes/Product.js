const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProduct,
  searchProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
} = require("../controlers/Product");
const upload = require("../middleware/upload");

router.post("/product", upload.single("productIagePath"), addProduct);
router.get("/product", getProduct);
router.get("/product/:_id", getOneProduct);

router.post("/search", searchProduct);
router.delete("/delete/:_id", deleteProduct);
router.put("/product/:_id", upload.single("productIagePath"), updateProduct);

module.exports = router;
