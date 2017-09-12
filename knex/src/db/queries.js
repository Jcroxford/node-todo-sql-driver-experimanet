const knex = require('./knex')

module.exports = {

  // ===========================
  // todo methods
  // ===========================
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
  },

  // ===========================
  // todo methods
  // ===========================
  createTodoItem(content, todoId) {
    return knex
      .returning('*')
      .insert({ content, todoId })
      .into('TodoItems')
  }

}
