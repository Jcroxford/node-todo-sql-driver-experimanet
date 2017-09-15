const Model = require('objection').Model

class Todos extends Model {
  static get tableName() {
    return 'Todos'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestame' }
      }
    }
  }

  static get relationMappings() {
    const TodoItems = require('./todoItemsModel')
    
    return {
      todoItems: {
        relation: Model.HasManyRelation,
        modelClass: TodoItems,
        join: {
          from: 'Todos.id',
          to: 'TodoItems.todoId'
        }
      }
    }
  }
}

module.exports = Todos
