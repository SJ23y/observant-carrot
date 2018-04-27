var mongo = require('mongodb').MongoClient
var mongo_url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
mongo.connect(mongo_url, function(err,db) {
    if (err) {console.log('Error occured')}
    console.log(db.getName())
    db.close()
})