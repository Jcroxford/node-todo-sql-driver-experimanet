const queries = require('../db/queries')

module.exports = {

  create(req, res) {
    return queries
      .createTodoItem(req.body.content, req.params.todoId)
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send({ message: error.message }))
  }

}
