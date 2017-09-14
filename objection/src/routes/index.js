const todosController =  require('../controllers').todosController

module.exports = (app) => {
  
  // todos routes
  app.post('/api/todos/create', todosController.create)
  app.get('/api/todos/list', todosController.list)

  // todo items routes


}
