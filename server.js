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
  
app.route('/new/*').get(function(req, res) {
    var mongo = require('mongodb').MongoClient
    var mongo_url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB
    mongo.connect(mongo_url, function(err,db) {      
    if (err) {console.log('Error occured')}
      var patt = new RegExp('^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}')
      if (!patt.test(req.url.slice(5))) 
      {
        res.send('Invalid Url')
        db.close()
      } else {
        var urls = db.db('chopper').collection('urls')
            urls.aggregate( [ { $group : {'_id': null, count: { $sum: 1 } } } ] ).toArray(function(err, doc) {
            var ID = doc[0].count
            var short_url = 'https://observant-carrot.glitch.me/' + ID
            urls.insert( [ { "_id": parseInt(ID),"url": req.url.slice(5) } ] )    
            res.send( { "original_url": req.url.slice(5), "short_url": short_url } ) 
            db.close()    
                                                                                                            })  
              }
    
    })
  
})

app.route('/[1-9]+').get(function(req, res) {
    var mongo = require('mongodb').MongoClient
    var mongo_url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB
    mongo.connect(mongo_url, function(err,db) {
    if (err) {res.send('Error occured')}
    var urls = db.db('chopper').collection('urls')    
    urls.find( { "_id": parseInt(req.url.slice(1)) } ).toArray(function(err, doc) {
      res.redirect(doc[0].url)
    })      
    db.close()
    })
})



// listen for requests :)
var listener = app.listen('3000', function () {
  console.log('Your app is listening on');
});