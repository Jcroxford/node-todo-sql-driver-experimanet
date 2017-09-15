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
}

module.exports = TodoItems
