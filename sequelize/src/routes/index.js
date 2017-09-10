const todosController = require('../controllers').todos
const todoItemsController = require('../controllers').todoItems

module.exports = (app) => {
  
  // todos routes
  app.post('/api/todos/create', todosController.create)
  app.get('/api/todos/list', todosController.list)

  // todo items routes
  app.post('/api/todos/create/:todoId/items', todoItemsController.create)
}