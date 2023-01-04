var express = require("express");
var router = express.Router();
// const MONGODB_URI = "mongodb://root:mypasswordisstrong@localhost:27017/quotation?authSource=admin";
const MONGODB_URI = "mongodb://root:mypasswordisstrong@localhost:27017";

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send([
    {
      id: "Q-2021-12-A",
      date: new Date(),
    },
    {
      id: "Q-2021-12-B",
      date: new Date(),
    },
  ]);
});

router.get("/customers", function (req, res, next) {
  var MongoClient = require("mongodb").MongoClient;
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

router.get("/quotation/:id", function (req, res, next) {
  const id = req.params.id;

  var MongoClient = require("mongodb").MongoClient;
  MongoClient.connect(MONGODB_URI, (err, client) => {
    if (err) throw err;

    var db = client.db("company");
    db.collection("quotations").findOne({ id: id }, (err, result) => {
      if (err) throw err;

      console.log(result);
      res.send(result);
    });
  });
});
module.exports = router;
