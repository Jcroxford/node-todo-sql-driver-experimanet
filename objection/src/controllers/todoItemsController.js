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
  }

}
