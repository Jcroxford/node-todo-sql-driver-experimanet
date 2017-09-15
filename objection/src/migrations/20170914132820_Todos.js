exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('Todos', (todosTable) => {
    todosTable.increments()
    todosTable.string('title').notNullable()
    todosTable.timestamp('createdAt').defaultTo(knex.fn.now())
    todosTable.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Todos')
};
