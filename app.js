"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { send } = require("./WoL");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./routes/api"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/shutdown", (req, res) => {
  res.sendFile(__dirname + "/views/shutdown.html");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log("there was a problem", err);
    return;
  }
  console.log(`Listening on ${port}`);
});
