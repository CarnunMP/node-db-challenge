
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
    })
    .createTable('resources', table => {
      table.increments();
      table.string('name', 128)
        .notNullable();
      table.string('description', 256);
    })
    .createTable('tasks', table => {
      table.increments();
      table.string('description', 256)
        .notNullable();
      table.string('notes', 256);
      table.boolean('completed')
        .notNullable()
        .defaultTo('false');
      table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id').inTable('projects');
    })
    .createTable('PtoR', table => {
      table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id').inTable('projects');
      table.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id').inTable('resources');
      table.primary(['project_id', 'resource_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('PtoR')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
