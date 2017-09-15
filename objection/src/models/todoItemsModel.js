const Model = require('objection').Model

class TodoItems extends Model {
  static get tableName() {
    return 'TodoItems'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      require: ['content', 'todoId'],
      properties: {
        id: { type: 'integer' },
        content: { type: 'string', minLength: 1, maxLength: 255 },
        complete: { type: 'boolean' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
        todoId: {type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    const Todos = require('./todosModel')

    return {
      todos: {
        relation: Model.BelongsToOneRelation,
        modelClass: Todos,
        join: {
          from: 'TodoItems.todoId',
          to: 'Todos.id'
        }
      }
    }
  }
}

module.exports = TodoItems
