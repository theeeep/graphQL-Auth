import express from "express";
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

app.listen(PORT, () => {
  console.log(`Server🚀 listening on ${PORT}`);
});
