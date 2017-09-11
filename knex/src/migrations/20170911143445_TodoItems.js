
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('TodoItems', (todoItemsTable) => {
    todoItemsTable.increments()
    todoItemsTable.string('content').notNullable()
    todoItemsTable.boolean('complete').defaultTo(false)
    todoItemsTable.timestamp('createdAt').defaultTo(knex.fn.now())
    todoItemsTable.timestamp('updatedAt').defaultTo(knex.fn.now())
    todoItemsTable.integer('TodosId').unsigned().notNullable()
    todoItemsTable.foreign('TodosId').references('id').inTable('Todos')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('TodoItems')
};
