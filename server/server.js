const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

const DB = require("./server.db"); // this is for database connection and verification
const cors = require("cors");
const chatbot = require("./server.chatbot");

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
app.use(cors()); // Allow requests from different origins

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// API Endpoints

// chatbot endpoint
router.post("/chatbot", chatbot.chatbot);

// user endpoints
router.get("/users", DB.auth.verifyAdmin, DB.users.get); // Protected API
router.get("/users/:id", DB.auth.verifyAdmin, DB.users.getByID);
router.put("/users/:id", DB.auth.verifyAdmin, DB.users.update);
router.delete("/users/:id", DB.auth.verifyAdmin, DB.users.delete);

router.post("/signup", DB.auth.signup); // Open API // Server Only // Zero Auth
router.post("/login", DB.auth.login); // Open API // Server Only // Zero Auth
router.post("/logout", DB.auth.verify, DB.auth.logout);

// event endpoints
router.get("/events/:id", DB.auth.verifyAdmin, DB.events.getByID); // Protected API

router.get("/events/approved", DB.auth.verifyAdmin, DB.events.getApproved);
router.get("/events/pending", DB.auth.verifyAdmin, DB.events.getPending);
router.get("/events/rejected", DB.auth.verifyAdmin, DB.events.getRejected);

router.put("/events/:id", DB.auth.verifyAdmin, DB.events.update);
router.put("/events/approve/:id", DB.auth.verifyAdmin, DB.events.approve);
router.put("/events/reject/:id", DB.auth.verifyAdmin, DB.events.reject);

router.post("/events", DB.auth.verifyAdmin, DB.events.create);
router.delete("/events/:id", DB.auth.verifyAdmin, DB.events.delete);

router.get("/events", DB.auth.verify, DB.events.get);
router.get("/events/user", DB.auth.verify, DB.events.getByUser);

// application endpoints
router.get("/applications", DB.auth.verifyAdmin, DB.app.get); // Protected API
router.get("/applications/:id", DB.auth.verifyAdmin, DB.app.getByID);

router.get("/applications/approved", DB.auth.verifyAdmin, DB.app.getApproved);
router.get("/applications/pending", DB.auth.verifyAdmin, DB.app.getPending);
router.get("/applications/rejected", DB.auth.verifyAdmin, DB.app.getRejected);

router.put("/applications/approve/:id", DB.auth.verifyAdmin, DB.app.approve);
router.put("/applications/reject/:id", DB.auth.verifyAdmin, DB.app.reject);
router.put("/applications/:id", DB.auth.verifyAdmin, DB.app.update);

router.delete("/applications/:id", DB.auth.verifyAdmin, DB.app.delete);
router.post("/applications", DB.app.create); // Open API // Public // Zero Auth

// volunteer event endpoints
router.get("/volunteer", DB.auth.verifyAdmin, DB.vol.get); // Protected API
router.get("/volunteer/:id", DB.auth.verifyAdmin, DB.vol.getByID);
router.put("/volunteer/:id", DB.auth.verifyAdmin, DB.vol.update);
router.delete("/volunteer/:id", DB.auth.verifyAdmin, DB.vol.delete);

router.post("/volunteer", DB.vol.add); // Open API // Public // Zero Auth

// contact endpoints
router.get("/contacts", DB.auth.verifyAdmin, DB.contact.get); // Protected API
router.get("/contacts/:id", DB.auth.verifyAdmin, DB.contact.getByID);
router.put("/contacts/:id", DB.auth.verifyAdmin, DB.contact.update);
router.delete("/contacts/:id", DB.auth.verifyAdmin, DB.contact.delete);

router.post("/contacts", DB.auth.verify, DB.contact.create); // Open API // Server Only

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
