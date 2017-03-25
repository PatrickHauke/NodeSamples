var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/purchasedb';
// Use connect method to connect to the Server

var conditions = {},
    criteria = {};
//Pass parameter from outside
exports.searchForProducts = function(limit, criteria, columns, sort, callback) {
    // Pass in connection URL
    MongoClient.connect(url, function(err, database) {
        assert.equal(null, err);
        // console.log("Connected correctly to server");

        var cb = output => {
            // callback is function defined from outside in test_purchasedb_Connect.js
            callback(output);
        };
        //cb is callback from findDocuments. Results are passed in to e.
        findDocuments(database, cb);

        database.close();
    });

    var findDocuments = function(database, callback) {
        // Get the
        var collection = database.collection('purchases');
        // Find some documents
        collection.find(criteria, columns)
            .limit(limit)
            .sort(sort)
            .toArray(function(err, result) {
                // Store query results into result
                // Array is then passed into function labeled callback
                callback(result);
            });
    };
};
