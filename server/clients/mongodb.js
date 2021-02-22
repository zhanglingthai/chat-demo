var MongoClient = require('mongodb').MongoClient;
var conf = require('../conf/mongodb');

MongoClient.connect(conf, function (err, client) {
  if (err) throw err

  var db = client.db('animals')

  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})