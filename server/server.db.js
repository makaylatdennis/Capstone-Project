const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
require("dotenv").config();

let connection;

// Database connection and handling
function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.log("Error connecting to database");
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connected to database");
    }
  });

  connection.on("error", (err) => {
    console.log("Database error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else if (err.code === "ECONNRESET") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = {
  auth: {
    User: (req, res, next) => {
      const token = req.headers["x-access-token"];
      if (!token) {
        return res
          .status(403)
          .send({ auth: false, message: "No token provided." });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
        req.userId = decoded.id;
        next();
      });
    },
    Admin: (req, res, next) => {
      const token = req.headers["x-access-token"];
      if (!token) {
        return res
          .status(403)
          .send({ auth: false, message: "No token provided." });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
        req.userId = decoded.id;
        next();
      });
    },
  },
  app: {
    // protected API
    get: (req, res) => {
      connection.query("SELECT * FROM appointments", (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving appointments");
        }
        res.status(200).send(results);
      });
    },
    getID: (req, res) => {
      const id = req.params.id;
      connection.query(
        `SELECT * FROM appointments WHERE id = ${id} `,
        [req.params.id],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving appointments");
          }
          res.status(200).send(results);
        }
      );
    },
    update: (req, res) => {
      const id = req.params.id;
      connection.query(
        `UPDATE appointments SET ? WHERE id = ${id}`,
        [req.body],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating appointments");
          }
          res.status(200).send(results);
        }
      );
    },
    delete: (req, res) => {
      const id = req.params.id;
      connection.query(
        `DELETE FROM appointments WHERE id = ${id}`,
        [req.params.id],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error deleting appointments");
          }
          res.status(200).send(results);
        }
      );
    },
    // open API // Public
    create: (req, res) => {
      const { name, email, phone, date, time, message } = req.body;
      connection.query(
        `INSERT INTO appointments (name, email, phone, date, time, message) VALUES (${name}, ${email}, ${phone}, ${date}, ${time}, ${message})`,
        [req.body],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error creating appointments");
          }
          res.status(200).send(results);
        }
      );
    },
    getByUserID: (req, res) => {
      const id = req.params.id;
      connection.query(
        `SELECT * FROM appointments WHERE user_id = ${id} `,
        [req.params.id],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving appointments");
          }
          res.status(200).send(results);
        }
      );
    },
  },
  requests: {
    // protected API
    get: (req, res) => {
      connection.query("SELECT * FROM requests", (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving requests");
        }
        res.status(200).send(results);
      });
    },
    getID: (req, res) => {
      const id = req.params.id;
      connection.query(
        `SELECT * FROM requests WHERE id = ${id} `,
        [req.params.id],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving requests");
          }
          res.status(200).send(results);
        }
      );
    },
    update: (req, res) => {
      const id = req.params.id;
      connection.query(
        `UPDATE requests SET ? WHERE id = ${id}`,
        [req.body],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating requests");
          }
          res.status(200).send(results);
        }
      );
    },
    delete: (req, res) => {
      const id = req.params.id;
      connection.query(
        `DELETE FROM requests WHERE id = ${id}`,
        [req.params.id],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error deleting requests");
          }
          res.status(200).send(results);
        }
      );
    },
    // open API // Public
    create: (req, res) => {
      const { name, email, phone, message } = req.body;
      connection.query(
        `INSERT INTO requests (name, email, phone, message) VALUES (${name}, ${email}, ${phone}, ${message})`,
        [req.body],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error creating requests");
          }
          res.status(200).send(results);
        }
      );
    },
    getByUserID: (req, res) => {
      const id = req.params.id;
      connection.query(
        `SELECT * FROM requests WHERE user_id = ${id} `,
        [req.params.id],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving requests");
          }
          res.status(200).send(results);
        }
      );
    },
  },
};
