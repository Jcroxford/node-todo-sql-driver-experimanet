const knex = require('./knex')
const _ = require('lodash')

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
    return new Promise((resolve, reject) => {
      knex
        .select(
          'Todos.id',
          'Todos.title',
          'Todos.createdAt',
          'Todos.updatedAt',
          'TodoItems.id as todoItems.id',
          'TodoItems.content as todoItems.content',
          'TodoItems.complete as todoItems.complete',
          'TodoItems.createdAt as todoItems.createdAt',
          'TodoItems.updatedAt as todoItems.updatedAt',
          'TodoItems.todoId as todoItems.todoId'
        )
        .from('Todos')
        .leftJoin('TodoItems', 'Todos.id', 'TodoItems.todoId')
        .then(todos => _.groupBy(todos, 'todoItems.todoId'))
        .then(todos => {
          const formattedTodos = []
  
          _.forIn(todos, (value, key) => {
            const { id, title, createdAt, updatedAt } = value[0]
            const todo = { id, title, createdAt, updatedAt }
  
            todo.todoItems = []
            for(todoItem of value) {
              const item = {
                id: todoItem['todoItems.id'],
                content: todoItem['todoItems.content'],
                complete: todoItem['todoItems.complete'],
                createdAt: todoItem['todoItems.createdAt'],
                updatedAt: todoItem['todoItems.updatedAt'],
                todoId: todoItem['todoItems.todoId']
              }
  
              todo.todoItems.push(item)
            }
  
            formattedTodos.push(todo)
          })
  
          resolve(formattedTodos)
        })
        .catch(error => reject(error))
    })
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
