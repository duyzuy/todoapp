const express = require('express');
const router = express.Router();
const todoController = require('../app/Controllers/TodoController')


router.post('/addTodo', todoController.addNewTodo)
router.delete('/deleteTodo', todoController.deleteTodo)
router.post('/editTodo', todoController.editTodo)
router.post('/completeTodo', todoController.completeTodo)

module.exports = router