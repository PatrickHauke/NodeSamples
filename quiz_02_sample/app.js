var express = require('express'),
    app = express(),
    purchasedb_Connect = require('./purchasedb_Connect'),
    logger = require('morgan');

//Debug information
app.use(logger('dev'));


//Set route to display info in JSON
app.get('/developer', function(req, res, next){
  var dev = {
    developer: 'Dev Name',
    email: 'Dev Email',
    skills: [
      'javascript',
      'node.js',
      'postgresql',
      'hbs',
      'css',
      'java'
    ]
  };
  res.send(dev);
});

// Pass a customer id through localhost:<port>/purchases/customerid/<data>
app.get('/purchases/customerid/:customerId', function(req, res, next){
  // Set all variables and objects in one go
  var customerId = req.params.customerId,
      // Passing a limit of 0 to cursor.limit() in MongoDB is equivalent to all
      limit = 0,
      //That customerId from URL is equal to customerId field in table of database
      criteria = {customerId: {$eq:customerId}},
      columns = {
        //Either 1 or true is valid
        customerId:1,
        nt:true,
        totalPrice:1,
        tags:true
      },
      sort = 1,
      callback = result =>{
        res.send(result);
      };
  // Pass parameters to function exported from purchasedb_Connect.js
  purchasedb_Connect.searchForProducts(limit, criteria, columns, sort, callback);
});

//Similar, but with different route
app.get('/purchases/byYear/:byYear', function(req, res, next){
  // Set all variables and objects in one go
  var byYear = req.params.byYear,
      // Passing a limit of 0 to cursor.limit() in MongoDB is equivalent to all
      limit = 0,
      //That customerId from URL is equal to customerId field in table of database
      criteria = {'shortDate.year': {$eq:byYear}},
      columns = {
        //Either 1 or true is valid
        customerId:1,
        nt:true,
        totalPrice:1,
        tags:true
      },
      sort = 1,
      callback = result =>{
        res.send(result);
      };
  // Pass parameters to function exported from purchasedb_Connect.js
  purchasedb_Connect.searchForProducts(limit, criteria, columns, sort, callback);
});

//Default to 404 :D
app.get('*', function(req, res, next){
  // res.send('Check the URL! Routes are fine...', 404);
  res.sendFile(__dirname + '/404.jpg');
});

app.listen(80, function(){
  console.log('Listening to localhost on :80');
});
