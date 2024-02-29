const db = require("../config/mysql");

const insertProduct = (req, res) => {
  const product = req.body.product;
  const amount = req.body.amount;
  const price = req.body.price;
  const idUser = req.body.idUser;
  db.query(
    "INSERT INTO Products (product, amount, price, idUser) VALUES (?, ?, ?, ?)",
    [product, amount, price, idUser],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
};

const updateProduct = (req, res) => {
  const product = req.body.product;
  const amount = req.body.amount;
  const price = req.body.price;
  const id = req.body.id;
  db.query(
    "UPDATE Products SET product = ?, amount = ?, price = ? WHERE id = ?",
    [product, amount, price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

const getProduct = (req, res) => {
  const idUser = req.params.idUser;
  // Use the user ID to fetch products specific to the user from the database
  const sql = "SELECT * FROM Products WHERE idUser = ?";
  db.query(sql, [idUser], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching products" });
    } else {
      res.status(200).json(result);
    }
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM Products WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = { insertProduct, updateProduct, getProduct, deleteProduct };
