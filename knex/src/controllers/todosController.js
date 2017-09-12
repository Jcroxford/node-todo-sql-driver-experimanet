const queries = require('../db/queries')

module.exports = {

  create(req, res) {
    return queries
      .createTodo(req.body.title)
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error))
  },

  list(req, res) {
    return queries
      .getAllTodos()
      .then(todos => res.send(todos))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return queries
      .getTodoById(req.params.todoId)
      .then(todo => res.send(todo))
      .catch(error => res.status(400).send(error))
  }

}