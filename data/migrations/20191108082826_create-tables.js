
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', table => {
      table.increments();
      table.string('name', 128)
        .notNullable();
      table.string('description', 256);
      table.boolean('completed')
        .notNullable()
        .defaultTo('false');
    });
};

exports.down = function(knex) {
  return knex.schema
    //
    .dropTableIfExists('projects');
};
