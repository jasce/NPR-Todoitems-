'use strict';

var url = require('url');

var TodoItems = require('./TodoItemsService');

module.exports.addTodoItem = function addTodoItem (req, res, next) {
  TodoItems.addTodoItem(req.swagger.params, res, next);
};

module.exports.deletetodoItem = function deletetodoItem (req, res, next) {
  TodoItems.deletetodoItem(req.swagger.params, res, next);
};

module.exports.findTodoItemsByStatus = function findTodoItemsByStatus (req, res, next) {
  TodoItems.findTodoItemsByStatus(req.swagger.params, res, next);
};

module.exports.getPetById = function getPetById (req, res, next) {
  TodoItems.getPetById(req.swagger.params, res, next);
};

module.exports.updateTodoWithForm = function updateTodoWithForm (req, res, next) {
  TodoItems.updateTodoWithForm(req.swagger.params, res, next);
};
