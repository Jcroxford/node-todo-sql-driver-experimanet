const knex = require('./knex')
const _ = require('lodash')

// ===========================
// helper methods
// ===========================
// formats todos to be similar to that of sequelize reponse
// this is based on migration 20170911143445_TodoItems & 20170911142255_Todos
const formatTodos = (todos) => {
  const formattedTodos = []
  
  _.forIn(todos, (value, key) => {
    const { id, title, createdAt, updatedAt } = value[0]
    const todo = { id, title, createdAt, updatedAt }

    todo.todoItems = []
    for(todoItem of value) {
      const item = {
        id: todoItem['item.id'],
        content: todoItem['item.content'],
        complete: todoItem['item.complete'],
        createdAt: todoItem['item.createdAt'],
        updatedAt: todoItem['item.updatedAt'],
        todoId: todoItem['item.todoId']
      }

      todo.todoItems.push(item)
    }

    formattedTodos.push(todo)
  })

  return formattedTodos
}

const groupTodosByTodoId = todos => _.groupBy(todos, 'item.todoId')

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
          'TodoItems.id as item.id',
          'TodoItems.content as item.content',
          'TodoItems.complete as item.complete',
          'TodoItems.createdAt as item.createdAt',
          'TodoItems.updatedAt as item.updatedAt',
          'TodoItems.todoId as item.todoId'
        )
        .from('Todos')
        .leftJoin('TodoItems', 'Todos.id', 'TodoItems.todoId')
        .then(todos => groupTodosByTodoId(todos))
        .then(todos => resolve(formatTodos(todos)))
        .catch(error => reject(error))
    })
  },

  getTodoById(todoId) {
    return new Promise((resolve, reject) => {
      knex
        .select(
          'Todos.id',
          'Todos.title',
          'Todos.createdAt',
          'Todos.updatedAt',
          'TodoItems.id as item.id',
          'TodoItems.content as item.content',
          'TodoItems.complete as item.complete',
          'TodoItems.createdAt as item.createdAt',
          'TodoItems.updatedAt as item.updatedAt',
          'TodoItems.todoId as item.todoId'
        )
        .from('Todos')
        .leftJoin('TodoItems', 'Todos.id', 'TodoItems.todoId')
        .where('Todos.id', todoId)
        .then(todos => groupTodosByTodoId(todos))
        .then(todos => resolve(formatTodos(todos)[0])) // removing from array because there should only ever be 1 object
        .catch(error => reject(error))
    })
  },

  // ===========================
  // todoItem methods
  // ===========================
  createTodoItem(content, todoId) {
    return knex
      .returning('*')
      .insert({ content, todoId })
      .into('TodoItems')
  }

}