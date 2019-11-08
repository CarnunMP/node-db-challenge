const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  add,
}

function find() {
  return db('resources');
}

function findById(id) {
  return db('resources AS r')
    .where({ 'r.id': id })
    .first();
}

function add(resource) {
  return db('resources').insert(resource)
    .then(ids => {
      return findById(ids[0]);
    });
}
