var purchasedb_Connect = require('./purchasedb_Connect');

//searchForProducts takes in 5 parameters
// limit, criteria, columns, sort, callback
// THE ORDER IN WHICH THEY ARE INPUT MUST MATCH THE ORDER IN THE FUNCTION
// FOUND IN pruchasedb_Connect.js!!

var limit = 10, // integer value of amount to display
    criteria = {
      //What information should be retrieved from the database
      // For greater than, $gt. For less than, $lt.
      totalPrice: {$gt:2000},
      nt: {$gt:6},
      // Mongo uses JSON format, so if there is a child associated to the data
      // such as shortDate with year, month, day, etc associated to it, it must
      // be enclosed in a String
      "shortDate.month":12
    },
    columns = {
      // What information should be displayed from the database
      // Boolean of true displays data, false does not. Default is false in
      // most user generated columns
      totalPrice:true,
      nt:true,
      shortDate:true,
      customerId:true,
      _id:false
    },
    sort = {
      // For descending, use -1. For ascending, use 1.
      customerId:-1
    },
    callback = function(output){
      console.log(output);
    };

purchasedb_Connect.searchForProducts(limit, criteria, columns, sort, callback);
