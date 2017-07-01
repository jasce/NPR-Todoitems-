'use strict';
var database = require('../models/database');
var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:jassi123@localhost:5432/todoitems';
var pool = new pg.Pool(database.config);



exports.addTodoItem = function(args, res, next) {
  /**
   * Add a new todoItem 
   * 
   *
   * body Body TodoItem object that needs to be added to the list
   * no response value expected for this operations
   **/

   const results = [];
  // Get a Postgres client from the connection pool
  pool.connect(function(err, client, done){
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }  
    client.query('INSERT INTO todolists(title, description , status , due_date) values($1, $2 , $3, $4)',
    [args.body.value.title, args.body.value.description,args.body.value.status, args.body.value.due_date], function(err) {    
    if (err) return err;    
      });

    const query = client.query('SELECT * FROM  "todolists" ORDER BY todolist_id ASC');
    // Stream results back one row at a time
        query.on('row', (row) => {
          results.push(row);
        });
    // After all data is returned, close connection and return results
        query.on('end', () => {
          pool.end();
          res.end(JSON.stringify(results));
        });
  });
  
}

exports.deletetodoItem = function(args, res, next) {
  /**
   * Deletes a todoItem
   * 
   *
   * todoItemId Long TodoItem id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.findTodoItemsByStatus = function(args, res, next) {
  /**
   * Finds TodoItems by status
   * Multiple status values can be provided with comma separated strings
   *
   * status List Status values that need to be considered for filter
   * returns List
   **/
   console.log(args);

  var examples = {};
  examples['application/json'] = [ {
  "due_date" : "2000-01-23",
  "description" : "aeiou",
  "id" : 123456789,
  "title" : "Learn Java",
  "status" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getPetById = function(args, res, next) {
  /**
   * Find pet by ID
   * Returns a single pet
   *
   * todoItemId Long ID of pet to return
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "due_date" : "2000-01-23",
  "description" : "aeiou",
  "id" : 123456789,
  "title" : "Learn Java",
  "status" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateTodoWithForm = function(args, res, next) {
  /**
   * Updates a todoitem in the list
   * 
   *
   * todoItemId Long ID of todoItem that needs to be updated
   * name String Updated name of the todoItem (optional)
   * status String Updated status of the todoItem (optional)
   * no response value expected for this operation
   **/
  res.end();
}

