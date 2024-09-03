const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
require("dotenv").config();

// Cookie object
const cookie = {
  exists: function (cookie, name) {
    if (cookie.split(";").find((e) => e.includes(name))) return true;
    else return false;
  },
  get: function (cookie, name) {
    if (!cookie) return null;
    return cookie
      .split(";")
      .find((e) => e.includes(name))
      .split("=")[1];
  },
};

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

function callQuery(query) {
  const promise = new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results);
      }
      setTimeout(() => {
        reject("Database timeout");
      }, 5000);
    });
  });
  return promise;
}

handleDisconnect();

module.exports = {
  auth: {
    signup: (req, res) => {
      console.log(req.body);
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: "Missing fields" });
        return;
      }

      const existsPromise = callQuery(
        `SELECT * FROM users WHERE email = "${email}"`
      );

      existsPromise.then((results) => {
        if (results.length > 0) {
          // Email already exists
          res.status(400).json({ message: "Email already exists" });
          return false;
        } else {
          // Email does not exist

          const queryPromise = callQuery(
            `INSERT INTO users (name, role, email, password) VALUES ("${name}", "user", "${email}", "${password}")`
          );

          queryPromise.then((results) => {
            res.status(201).json({ message: "Signed Up", redirect: "/login" });
          });

          queryPromise.catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
          });
        }
      });

      existsPromise.catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
        return;
      });
    },
    verify: (req, res, next) => {
      const token = cookie.get(req.headers.cookie, "token");
      if (!token) {
        return res.status(400).json({ message: "Please login" });
      } else {
        try {
          jwt.verify(token, process.env.SECRET_KEY);
          next();
        } catch (err) {
          res.clearCookie("token");
          return res.status(400).json({ message: "Please login" });
        }
      }
    },
    login: (req, res) => {
      const { email, password } = req.body;
      const queryPromise = callQuery(
        `SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`
      );
      queryPromise.then((results) => {
        if (results.length === 0) {
          res.status(400).json({ message: "Invalid email or password" });
        } else {
          const token = jwt.sign(
            { email: results[0].email, password: results[0].password },
            process.env.SECRET_KEY
          );
          const admin = results[0].role === "admin";
          res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json({
              message: "Logged In",
              redirect: admin ? "/admin" : "/",
            });
        }
      });
      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
    },
    logout: (req, res) => {
      res.clearCookie("token");
      res.status(200).json({ message: "Logged Out", redirect: "/login" });
    },
    verifyAdmin: (req, res, next) => {
      const token = cookie.get(req.headers.cookie, "token");
      if (!token) {
        return res.status(400).json({ message: "Please login" });
      } else {
        const { email, password } = jwt.verify(token, process.env.SECRET_KEY);
        const queryPromise = callQuery(
          `SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`
        );
        queryPromise.then((results) => {
          if (results.length === 0) {
            res.status(400).json({ message: "Invalid email or password" });
          } else {
            if (results[0].role === "admin") {
              next();
            } else {
              res.status(401).json({ message: "Unauthorized" });
            }
          }
        });
        queryPromise.catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        });
      }
    },
  },
  users: {
    // Protected API
    get: (req, res) => {
      const queryPromise = callQuery("SELECT * FROM users");

      queryPromise.then((results) => {
        res.status(200).send(results);
        console.log(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving users");
      });
    },
    getByID: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(`SELECT * FROM users WHERE id = ${id}`);

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving users");
      });
    },
    update: (req, res) => {
      const id = req.params.id;
      const { name, role, email, password } = req.body;

      if (role !== "admin" && role !== "user" && role !== "provider") {
        res.status(400).json({ message: "Invalid role" });
        return;
      }
      if (!name || !role || !email || !password) {
        res.status(400).json({ message: "Missing fields" });
        return;
      }

      const queryPromise = callQuery(
        `UPDATE users SET name = "${name}", role = "${role}", email = "${email}", password = "${password}" WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error updating users");
      });
    },
    delete: (req, res) => {
      const id = req.params.id;

      const queryPromise = callQuery(`DELETE FROM users WHERE id = ${id}`);
      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting users");
      });
    },
  },
  events: {
    // Protected API
    get: (req, res) => {
      const queryPromise = callQuery("SELECT * FROM events");

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving events");
      });
    },
    getApproved: (req, res) => {
      const queryPromise = callQuery(
        "SELECT * FROM events WHERE status = 'approved'"
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving events");
      });
    },
    getPending: (req, res) => {
      const queryPromise = callQuery(
        "SELECT * FROM events WHERE status = 'pending'"
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving events");
      });
    },
    getRejected: (req, res) => {
      const queryPromise = callQuery(
        "SELECT * FROM events WHERE status = 'rejected'"
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving events");
      });
    },
    getByID: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(`SELECT * FROM events WHERE id = ${id}`);

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving events");
      });
    },
    approve: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(
        `UPDATE events SET status = 'approved' WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error updating events");
      });
    },
    reject: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(
        `UPDATE events SET status = 'rejected' WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error updating events");
      });
    },
    update: (req, res) => {
      const id = req.params.id;
      const { name, email, phone, date, time, description } = req.body;
      const queryPromise = callQuery(
        `UPDATE events SET name = "${name}", email = "${email}", phone = ${phone}, date = ${date}, time = ${time}, description = ${description} WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error updating events");
      });
    },
    delete: (req, res) => {
      const id = req.params.id;

      const queryPromise = callQuery(`DELETE FROM events WHERE id = ${id}`);
      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting events");
      });
    },
    create: (req, res) => {
      const { name, date, time, description } = req.body;
      const token = cookie.get(req.headers.cookie, "token");

      if (!token) {
        return res.status(400).json({ message: "Please login" });
      }

      const { email, password } = jwt.verify(token, process.env.SECRET_KEY);

      const userIDQuery = callQuery(
        `SELECT id FROM users WHERE email = "${email}" AND password = "${password}"`
      );

      userIDQuery.then((results) => {
        if (results.length === 0) {
          res.status(400).json({ message: "Invalid email or password" });
          res.clearCookie("token");
          return;
        } else {
          const userID = results[0].id;

          const queryPromise = callQuery(
            `INSERT INTO events (name, userID, date, time, description, status) VALUES ("${name}", ${userID}, ${date}, ${time}, "${description}, "approved")`
          );
          queryPromise.then((results) => {
            res.status(200).send(results);
          });

          queryPromise.catch((err) => {
            console.log(err);
            res.status(500).send("Error creating events");
          });
        }
      });

      userIDQuery.catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
        return;
      });
    },
    // Open API // Public
    request: (req, res) => {
      const { name, date, time, description } = req.body;
      const token = cookie.get(req.headers.cookie, "token");

      if (!token) {
        return res.status(400).json({ message: "Please login" });
      }

      const { email, password } = jwt.verify(token, process.env.SECRET_KEY);

      const userIDQuery = callQuery(
        `SELECT id FROM users WHERE email = "${email}" AND password = "${password}"`
      );

      userIDQuery.then((results) => {
        if (results.length === 0) {
          res.status(400).json({ message: "Invalid email or password" });
          res.clearCookie("token");
          return;
        } else {
          const userID = results[0].id;

          const queryPromise = callQuery(
            `INSERT INTO events (name, userID, date, time, description) VALUES ("${name}", ${userID}, ${date}, ${time}, "${description}")`
          );
          queryPromise.then((results) => {
            res.status(200).send(results);
          });

          queryPromise.catch((err) => {
            console.log(err);
            res.status(500).send("Error creating events");
          });
        }
      });

      userIDQuery.catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
        return;
      });
    },
    getByUser: (req, res) => {
      const token = cookie.get(req.headers.cookie, "token");
      if (!token) {
        return res.status(400).json({ message: "Please login" });
      } else {
        const { email, password } = jwt.verify(token, process.env.SECRET_KEY);
        const queryPromise = callQuery(
          `SELECT * FROM events WHERE email = "${email}" AND password = "${password}"`
        );
        queryPromise.then((results) => {
          if (results.length === 0) {
            res.status(400).json({ message: "Invalid email or password" });
          } else {
            res.status(200).send(results);
          }
        });
        queryPromise.catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        });
      }
    },
  },
  vol: {
    get: (req, res) => {
      const queryPromise = callQuery("SELECT * FROM volunteers");

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving volunteers");
      });
    },
    getByID: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(
        `SELECT * FROM volunteers WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving volunteers");
      });
    },
    update: (req, res) => {
      const id = req.params.id;
      const { eventID, name, userID } = req.body;

      const queryPromise = callQuery(
        `UPDATE volunteers SET eventID = ${eventID}, name = "${name}", userID = ${userID} WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error updating volunteers");
      });
    },
    delete: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(`DELETE FROM volunteers WHERE id = ${id}`);
      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting volunteers");
      });
    },
    add: (req, res) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        eventID,
      } = req.body;
      const queryPromise = callQuery(
        `INSERT INTO volunteers (firstName, lastName, Email, phone, address, city, state, zip${
          !eventID ? "" : ", eventID"
        }) VALUES ("${firstName}", "${lastName}", "${email}", "${phone}", "${address}", "${city}", "${state}", "${zip}"${
          !eventID ? "" : `, ${eventID}`
        })`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error adding volunteers");
      });
    },
  },
  contact: {
    // Protected API
    get: (req, res) => {
      const queryPromise = callQuery("SELECT * FROM contactQue");

      queryPromise.then((results) => {
        res.status(200).send(results);
        console.log(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving contactQue");
      });
    },
    getByID: (req, res) => {
      const id = req.params.id;
      const queryPromise = callQuery(
        `SELECT * FROM contactQue WHERE id = ${id}`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving contactQue");
      });
    },
    update: (req, res) => {
      const id = req.params.id;
      const { name, email, message, status } = req.body;
      const queryPromise = callQuery(
        `UPDATE contactQue SET name = "${name}", email = "${email}", message = "${message}", status = "${status}" WHERE id = ${id}`
      );
      queryPromise.then((results) => {
        res.status(200).send(results);
      });
      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error updating contactQue");
      });
    },
    delete: (req, res) => {
      const id = req.params.id;

      const queryPromise = callQuery(`DELETE FROM contactQue WHERE id = ${id}`);

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting contactQue");
      });
    },
    // Open API // Public
    create: (req, res) => {
      const { name, email, message } = req.body;

      const queryPromise = callQuery(
        `INSERT INTO contactQue (name, email, message, status) VALUES ("${name}", "${email}", "${message}", "pending")`
      );

      queryPromise.then((results) => {
        res.status(200).send(results);
      });

      queryPromise.catch((err) => {
        console.log(err);
        res.status(500).send("Error creating contactQue");
      });
    },
  },
};
