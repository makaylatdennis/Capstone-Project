const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 6000;
const chatbot = require("./server.chatbot");
const DB = require("./server.DB"); // this is for database connection and verification

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// API Endpoints

// user endpoints
router.get("/users", DB.VerifyAdmin, DB.getUsers); // protected API
router.get("/users/:id", DB.VerifyAdmin, DB.getUserById);

router.post("/users", DB.createUser); // open API // server Only
router.post("/login", DB.login);
router.post("/logout", DB.Verify, DB.logout);

// appointment endpoints
router.get("/appointments", DB.VerifyAdmin, DB.getAppointments); // protected API
router.get("/appointments/:id", DB.VerifyAdmin, DB.getAppointmentById);
router.put("/appointments/:id", DB.VerifyAdmin, DB.updateAppointment);
router.delete("/appointments/:id", DB.VerifyAdmin, DB.deleteAppointment);

router.post("/appointments", DB.Verify, DB.createAppointmentRequest); // open API // Public
router.get("/user/appointments/:id", DB.Verify, DB.getAppointmentsByUserId);

// request endpoints
router.get("/requests", DB.VerifyAdmin, DB.getRequests); // protected API
router.get("/requests/:id", DB.VerifyAdmin, DB.getRequestById);
router.put("/requests/:id", DB.VerifyAdmin, DB.updateRequest);
router.delete("/requests/:id", DB.VerifyAdmin, DB.deleteRequest);

router.post("/requests", DB.Verify, DB.createRequest); // open API // Public
router.get("/user/requests/:id", DB.Verify, DB.getRequestsByUserId);

//router.post("/chatbot", chatbot.chatbot);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
