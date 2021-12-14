var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://root:mypasswordisstrong@localhost:27017";
const API_KEY = ";lkasf8902kjdfsiuhg"

/* GET customer listing. */
router.get("/", function (req, res, next) {
  MongoClient.connect(MONGODB_URI, (err, client) => {
    if (err) throw err;

    var db = client.db("company");
    db.collection("customers")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        console.log(result);
        res.send(result);
      });
  });
});

router.post("/", (req, res, next) => {
  if (req.headers["api-key"] !== API_KEY) {
    res.status(400).send("Unauthorized");
    return;
  }

  MongoClient.connect(MONGODB_URI, (err, client) => {
    if (err) throw err;

    var db = client.db("company");
    db.collection("customers")
      .insertOne(req.body)
      .then((ret) => {
        res.status(200).send(ret);
      });
  });
});

module.exports = router;
