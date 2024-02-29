const express = require("express");
const { insertProduct, updateProduct, getProduct, deleteProduct } = require("../controllers/products");
const router = express.Router();

router.post("/insert", insertProduct);

router.put("/update", updateProduct);

router.get("/get/:idUser", getProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
