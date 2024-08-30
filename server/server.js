const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const chatbot = require("./server.chatbot");

app.use(cors()); // Allow requests from different origins

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/chatbot", chatbot.chatbot);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
