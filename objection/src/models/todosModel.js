const Model = require('objection').Model

class Todos extends Model {
  static get tableName() {
    return 'Todos'
  }

  // FIXME: define the json schema or ignore?
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

  // static get relationMappings() {
  //   return {

  //   }
  // }
}

module.exports = Todos
