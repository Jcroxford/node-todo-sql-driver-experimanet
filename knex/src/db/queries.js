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
    // all todo lists that do not have any todo items will be listed in the
    // null category. If any of these lists exist, we must loop through each
    // object and get their own unique properties. Otherwise, unique properties
    // can be obtained from the first todoItem the list contains
    if(key === 'null') {
      for(let todo of value) {
        const { id, title, createdAt, updatedAt } = todo

        formattedTodos.push({
          id,
          title,
          createdAt,
          updatedAt,
          todoItems: []
        })
      }
    } else {
      const { id, title, createdAt, updatedAt } = value[0]
      const todo = { id, title, createdAt, updatedAt }

      todo.todoItems = []
      for(let todoItem of value) {
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
    }
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
        .then(todos => {
          if(todos.length === 0) {
            throw new Error('todo does not exist')
          }

          return groupTodosByTodoId(todos)
        })
        .then(todos => resolve(formatTodos(todos)[0])) // removing from array because there should only ever be 1 object
        .catch(error => reject(error))
    })
  },

  updateTodoById(todoId, title) {
    if(!title) {
      return Promise.resolve(this.getTodoById(todoId))
    }
    
    return new Promise((resolve, reject) => {
      knex
        .from('Todos')
        .update({ title, updatedAt: knex.fn.now() })
        .where('id', todoId)
        .then(updated => {
          if(!updated) { 
            throw new Error('todo does not exist')
          }
        })
        .then(() => resolve(this.getTodoById(todoId)))
        .catch(error => reject(error))
    })
  },

  destroyTodo(todoId) {
    return new Promise((resolve, reject) => {
      this.getTodoById(todoId)
        .then(todos => {
          if(todos.length === 0) {
            throw new Error('todo does not exist')
          }

          return knex.from('TodoItems').del().where('todoId', todoId)
        })
        .then(() => knex.from('Todos').del().where('id', todoId))
        .then(() => resolve())
        .catch(error => reject(error))
    })
  },

  // ===========================
  // todoItem methods
  // ===========================
  createTodoItem(content, todoId) {
    return new Promise((resolve, reject) => {
      this.getTodoById(todoId)
        .then(todos => {
          if(todos.length === 0) {
            throw new Error('todo does not exist')
          }

          resolve(knex.returning('*').insert({ content, todoId }).into('TodoItems'))
        })
        .catch(error => reject(error))
    })
  },

  getTodoItemById(todoItemId, todoId) {
    return knex
      .select()
      .from('TodoItems')
      .where({
        id: todoItemId,
        todoId
      })
  },

  updateTodoItem(todoItemId, content, complete, todoId) {
    return new Promise((resolve, reject) => {
      this.getTodoItemById(todoItemId, todoId)
        .then(todoItems => {
          if(todoItems.length === 0) {
            throw new Error('todo item does not exist')
          }

          return todoItems[0]
        })
        .then(todoItem => {
          return knex
            .returning('*')
            .update({
              content: content === undefined ? todoItem.content : content,
              complete: complete === undefined ? todoItem.complete : complete,
              updatedAt: knex.fn.now()
            })
            .from('TodoItems')
            .where('id', todoItemId)
        })
        .then(todoItems => resolve(todoItems[0])) // comes back in array but will only contain one object
        .catch(error => reject(error))
    })
  },

  destroyTodoItem(todoItemId, todoId) {
    return new Promise((resolve, reject) => {
      this.getTodoItemById(todoItemId, todoId)
        .then(todoItems => {
          if(todoItems.length === 0) {
            throw new Error('todo item does not exist')
          }

          resolve(knex.from('TodoItems').del().where('id', todoItemId))
        })
        .catch(error => reject(error))
    })
  }

}
