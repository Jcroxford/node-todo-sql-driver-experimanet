const Todo = require('../models').Todo
const TodoItem = require('../models').TodoItem

module.exports = {

  create(req, res) {
    return Todo
      .create({
        title: req.body.title
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error))
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todos => res.send(todos))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todo => {
        if(!todo) {
          return res.status(400).send({ message: 'todo not found' })
        }

        res.send(todo)
      })
      .catch(error => res.status(400).send(error))
  }

}