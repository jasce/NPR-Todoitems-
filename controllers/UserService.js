'use strict';

exports.createUser = function(args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body Body_1 Created user object
   * no response value expected for this operation
   **/
  res.end();
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
  var examples = {};
  examples['application/json'] = "aeiou";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.logoutUser = function(args, res, next) {
  /**
   * Logs out current logged in user session
   * 
   *
   * no response value expected for this operation
   **/
  res.end();
}

