const todosController =  require('../controllers').todosController

module.exports = (app) => {
  
  app.post('/api/todos/create', todosController.create)

}
