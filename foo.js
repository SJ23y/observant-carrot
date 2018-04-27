var mongo = require('mongodb').MongoClient
var mongo_url = ''
mongo.connect(mongo_url, function(err,db) {
    if (err) {console.log('Error occured')}
    
})