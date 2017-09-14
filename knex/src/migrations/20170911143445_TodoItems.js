
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('TodoItems', (todoItemsTable) => {
    todoItemsTable.increments()
    todoItemsTable.string('content').notNullable()
    todoItemsTable.boolean('complete').defaultTo(false)
    todoItemsTable.timestamp('createdAt').defaultTo(knex.fn.now())
    todoItemsTable.timestamp('updatedAt').defaultTo(knex.fn.now())
    todoItemsTable.integer('todoId').unsigned().notNullable()
    todoItemsTable.foreign('todoId').references('id').inTable('Todos').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('TodoItems')
};
