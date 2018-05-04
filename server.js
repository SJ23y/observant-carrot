// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {  
    response.sendFile(__dirname + '/views/index.html');    
}) 
  
app.get("/new/", function(req, res) {
    var mongo = require('mongodb').MongoClient
    var mongo_url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB
    mongo.connect(mongo_url, function(err,db) {
    if (err) {console.log('Error occured')}
    var urls = db.db('chopper').collection('urls')
    urls.insert([{"url": req.url }])
    res.send(req.url.split('/')[2])
    db.close()
    })
})
  



// listen for requests :)
var listener = app.listen('3000', function () {
  console.log('Your app is listening on');
});