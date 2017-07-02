'use strict';
var database = require('../models/database');

exports.createUser = function(args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_1 Created user object
   * no response value expected for this operation
   **/
   const results = [];
   console.log(args);
  // Get a Postgres client from the connection pool
  database.pool.connect(function(err, client, done){
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    var query = client.query('INSERT INTO users ( name, email , password ) values($1, $2 , $3)',
    [args.body.value.name, args.body.value.email, args.body.value.password ]);


    query.on('end', () => {
      done();
      res.status(201).json({success: true});
      res.end();
    });
  })
}

exports.loginUser = function(args, res, next) {
  /**
   * Logs user into the system
   * 
   *
   * email String The user name for login
   * password String The password for login in clear text
   * returns String
   **/
   var results = [];
   
    database.pool.connect(function(err, client, done){
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    } 
   var query = client.query("SELECT * FROM users WHERE email=($1) AND password=($2)", [args.body.value.email, args.body.value.password ]);
    
    query.on('row', (row) => {
      results.push(row);      
    });

    query.on('end', () => {
      if(results.length === 0)
        {
          res.status(405).json({success: false , invalidInput: true});
          res.end();
        }
      else
        {
          var token = ((results[0].email) + ":" + (results[0].password));
          token = new Buffer(token).toString('base64');
          res.status(200).json({success: true , token: token });
          res.end();
        }
    });

  });
  
};

exports.logoutUser = function(args, res, next) {
  /**
   * Logs out current logged in user session
   * 
   *
   * no response value expected for this operation
   **/
   
  res.end();
}

