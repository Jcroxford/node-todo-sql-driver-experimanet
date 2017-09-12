const todosController = require('../controllers').todosController
const todoItemsController = require('../controllers').todoItemsController

module.exports = (app) => {
  
  // todos routes
  app.post('/api/todos/create', todosController.create)
  app.get('/api/todos/list', todosController.list)
  app.get('/api/todos/:todoId', todosController.retrieve)
  // app.put('/api/todos/update/:todoId', todosController.update)
  // app.delete('/api/todos/remove/:todoId', todosController.destroy)

  // todo items routes
  app.post('/api/todos/create/:todoId/items', todoItemsController.create)
  // app.put('/api/todos/update/:todoId/:todoItemId', todoItemsController.update)
  // app.delete('/api/todos/remove/:todoId/:todoItemId', todoItemsController.delete)

}
