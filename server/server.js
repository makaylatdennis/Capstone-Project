const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 6000;
const chatbot = require("./server.chatbot");

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//router.post("/chatbot", chatbot.chatbot);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
