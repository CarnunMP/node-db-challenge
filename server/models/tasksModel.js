const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  findByProjectId,
  add,
}

function find() {
  return db('tasks');
}

function findById(id) {
  return db('tasks AS t')
    .where({ 't.id': id })
    .first();
}

function findByProjectId(id) {
  return db('tasks AS t')
    .where({ 't.project_id': id });
}

function add(task) {
  return db('tasks').insert(task)
    .then(ids => {
      return findById(ids[0]);
    });
}