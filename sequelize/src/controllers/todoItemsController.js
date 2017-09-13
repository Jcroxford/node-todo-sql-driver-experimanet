const TodoItem = require('../models').TodoItem

module.exports = {
  
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    const { content, complete } = req.body

    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId
        }
      })
      .then(todoItem => {
        if(!todoItem) {
          throw new Error('todo item does not exist')
        }

        return todoItem.update({
          content: content === undefined ? todoItem.content : content,
          complete: complete === undefined ? todoItem.complete : complete
        })
      })
      .then(todoItem => res.send(todoItem))
      .catch(error => res.status(400).send({ message: error.message }))
  },

  destroy(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId
        }
      })
      .then(todoItem => {
        if(!todoItem) {
          // return res.status(400).send({ message: 'todo item does not exist' })
          throw new Error('todo item does not exist')
        }
        return todoItem.destroy()
      })
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send({ message: error.message }))
  }

}