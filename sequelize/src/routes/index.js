const todosController = require('../controllers').todos

module.exports = (app) => {
  app.post('/api/todos/create', todosController.create)
  app.get('/api/todos/list', todosController.list)
}