const express = require("express");
const {createInvoice, updateInvoice, getInvoice, deleteInvoice, updateStatusInvoice} = require("../controllers/invoices");
const router = express.Router();

router.post("/create", createInvoice);

router.put("/update", updateInvoice);

router.get("/get/:idUser", getInvoice);

router.delete("/delete/:id", deleteInvoice);

router.put("/update/status", updateStatusInvoice)

module.exports = router;