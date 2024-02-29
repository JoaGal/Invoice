const db = require("../config/mysql");
const util = require('util');
db.query = util.promisify(db.query);

const createInvoice = async (req, res) => {
  const {idUser, street, city, postCode, country, description, clientEmail, clientName, clientStreet, clientCity, clientPostCode, clientCountry, status, date, paymentTerm, items} = req.body;
  const sql = "INSERT INTO Invoices (idUser, street, city, postCode, country, description, clientEmail, clientName, clientStreet, clientCity, clientPostCode, clientCountry, status, date, paymentTerm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const sqlItems = "INSERT INTO Items (idInvoice, idUser, name, quantity, price) VALUES (?, ?, ?, ?, ?)";
  try {
    const result = await db.query(sql, [idUser, street, city, postCode, country, description, clientEmail, clientName, clientStreet, clientCity, clientPostCode, clientCountry, status, date, paymentTerm]);
    const idInvoice = result.insertId;
    for (const item of items) {
        await db.query(sqlItems, [idInvoice, idUser, item.name, item.quantity, item.price]);
    }
  
    res.send("Invoice created successfully");
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send("Server error: " + err.message);
  }
};

const updateInvoice = async (req, res) => {
  const { id, street, city, postCode, country, description, clientEmail, clientName, clientStreet, clientCity, clientPostCode, clientCountry, status, date, paymentTerm, items } = req.body;
  const sql = "UPDATE Invoices SET street = ?, city = ?, postCode = ?, country = ?, description = ?, clientEmail = ?, clientName = ?, clientStreet = ?, clientCity = ?, clientPostCode = ?, clientCountry = ?, status = ?, date = ?, paymentTerm = ? WHERE id = ?";
  try {
    // Update invoice information
    await db.query(sql, [street, city, postCode, country, description, clientEmail, clientName, clientStreet, clientCity, clientPostCode, clientCountry, status, date, paymentTerm, id]);
    // Update items associated with the invoice
    const sqlItems = "UPDATE Items SET name = ?, quantity = ?, price = ? WHERE idInvoice = ? AND id = ?";
    for (const item of items) {
      await db.query(sqlItems, [item.name, item.quantity, item.price, id, item.id]);
    }
    res.send({ message: "Invoice updated successfully." });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send("Server error: " + err.message);
  }
};

const getInvoice = async (req, res) => {
  const idUser  = req.params.idUser;
  const sql = "SELECT * FROM Invoices WHERE idUser = ?"
  const sqlItems = "SELECT * FROM Items WHERE idUser = ?"
  try {
    const invoices = await db.query(sql, [idUser]);
    const items = await db.query(sqlItems, [idUser]);
    const result = {
      invoices,
      items
    };
    res.status(200).json(result);
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send("Server error: " + err.message);
  }
};


const deleteInvoice = (req, res) => {
  const { id } = req.params;
  //   const id = req.params.id;
  const sql = "DELETE FROM Invoices WHERE id = ?";
  try {
    const result = db.query(sql, [id]);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const updateStatusInvoice = (req, res) => {
  const { id, status } = req.body;
  const sql = "UPDATE Invoices SET status = ? WHERE id = ?";
  try {
    // Update invoice information
     db.query(sql, [status, id]);
    // Update items associated with the invoice
    res.send({ message: "Invoice status updated successfully." });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send("Server error: " + err.message);
  }
};

module.exports = { createInvoice, updateInvoice, getInvoice, deleteInvoice, updateStatusInvoice };