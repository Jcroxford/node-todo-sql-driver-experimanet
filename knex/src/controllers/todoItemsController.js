const queries = require('../db/queries')

module.exports = {

  create(req, res) {
    return queries
      .createTodoItem(req.body.content, req.params.todoId)
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send({ message: error.message }))
  },

  update(req, res) {
    const {content, complete } = req.body
    const {todoItemId, todoId} = req.params
    
    return queries
      .updateTodoItem(todoItemId, content, complete, todoId)
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send({ message: error.message }))
    },

    destroy(req, res) {
      return queries
        .destroyTodoItem(req.params.todoItemId, req.params.todoId)
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send({ message: error.message }))
    }

}
