const knex = require('./knex')

module.exports = {

  createTodo(title) {
    return knex
      .returning('*')
      .insert({ title })
      .into('Todos')
  },

  getAllTodos() {
    return knex
      .select()
      .from('Todos')
  }

}
