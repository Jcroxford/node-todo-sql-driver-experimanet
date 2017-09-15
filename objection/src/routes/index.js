const todosController =  require('../controllers').todosController
const todoItemsController = require('../controllers').todoItemsController
module.exports = (app) => {
  
  // todos routes
  app.post('/api/todos/create', todosController.create)
  app.get('/api/todos/list', todosController.list)

  // todo items routes
  app.post('/api/todos/create/:todoId/items', todoItemsController.create)

}
