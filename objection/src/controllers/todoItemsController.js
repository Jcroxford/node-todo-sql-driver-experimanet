const TodoItems = require('../models/todoItemsModel')

module.exports = {

  create(req, res) {
    TodoItems
      .query()
      .insert({
        content: req.body.content,
        todoId: parseInt(req.params.todoId)
      })
      .then(todoItem => TodoItems.query().where('id', '=', todoItem.id))
      .then(todoItems => res.status(201).send(todoItems[0]))
      .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    TodoItems
      .query()
      .updateAndFetchById(req.params.todoItemId, {
        content: req.body.content,
        complete: req.body.complete
      })
      .then(todo => res.send(todo))
      .catch(error => res.status(400).send({ message: error.message }))
  },

  destroy(req, res) {
    TodoItems
      .query()
      .delete()
      .where({
        id: req.params.todoItemId,
        todoId: req.params.todoId
      })
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send({ message: error.message }))
  }

}
