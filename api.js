const express = require("express");
const router = express.Router();
const { send } = require("../WoL");

router.get("/machine", (req, res) => {
  res.send({ type: "GET" });
});

router.post("/machine", (req, res) => {
  console.log(req.body);
  res.send({ type: "POST" });
});

router.put("/machine/:id", (req, res) => {
  res.send({ type: "PUT" });
});

router.delete("/machine/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

router.post("/wake", (req, res) => {
  console.dir(req.body);

  const details = { ...req.body };
  send(req.body.mac, (err) => {
    console.log ('sent');
    res.redirect("/shutdown");
  });

})

module.exports = router;
