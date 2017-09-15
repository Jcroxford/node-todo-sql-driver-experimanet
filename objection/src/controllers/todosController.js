const Todos = require('../models/todosModel')

module.exports = {

  create(req, res) {
    Todos
      .query()
      .insert({ title: req.body.title })
      .then(todo => Todos.query().where('id', '=', todo.id))
      .then(todos => res.status(201).send(todos[0]))
      .catch(error => res.status(400).send(error))
  },

  list(req, res) {
    Todos
      .query()
      .eager('todoItems')
      .then(todos => res.send(todos))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    Todos
      .query()
      .eager('todoItems')
      .where('id', req.params.todoId)
      .then(todos => {
        if(todos.length === 0) {
          throw new Error('todo list does not exist')
        }
        
        res.send(todos[0])
      })
      .catch(error => res.status(400).send({ message: error.message }))
  },

  update(req, res) {
    if(!req.body.title) {
      return res.status(400).send({ message: 'request must contain a valid title in order to update' })
    }
    
    return Todos
      .query()
      .updateAndFetchById(req.params.todoId, {
        title: req.body.title
      })
      .then(todo => res.send(todo))
      .catch(error => res.status(400).send({ message: error.message }))
  },

  destroy(req, res) {
    return Todos
      .query()
      .delete()
      .where('id', req.params.todoId)
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send({ message: error.message }))
  }

}
