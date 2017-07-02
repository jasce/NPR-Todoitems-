'use strict';
var database = require('../models/database');
var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:jassi123@localhost:5432/todoitems';




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
  database.pool.connect(function(err, client, done){
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
          database.pool.end();
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
   console.log(args);
   const results = [];
   database.pool.connect(function(err , client , done){
      if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    } 
    console.log("value " + args.todoItemId.value);
    client.query('DELETE FROM todolists WHERE todolist_id=($1)', [args.todoItemId.value]);

    var query = client.query('SELECT * FROM todolists ORDER BY todolist_id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      res.end(JSON.stringify(results));
    });  

   });
  
}

exports.findTodoItemsByStatus = function(args, res, next) {
  /**
   * Finds TodoItems by status
   * Multiple status values can be provided with comma separated strings
   *
   * status List Status values that need to be considered for filter
   * returns List
   **/
   const results = [];
   database.pool.connect(function(err , client , done){
      if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    } 

   })


 
}

exports.getPetById = function(args, res, next) {
  /**
   * Find pet by ID
   * Returns a single pet
   *
   * todoItemId Long ID of pet to return
   * returns inline_response_200
   **/
   const results = [];
   database.pool.connect(function(err , client , done){
      if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    } 

   })
  
};
  


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
   console.log(args);
   const results = [];
   database.pool.connect(function(err , client , done){
      if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    } 

   })
  res.end();
}

