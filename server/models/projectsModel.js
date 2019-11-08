const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  add,
}

function find() {
  return db('projects AS p');
}

function findById(id) {
  return db('projects AS p')
    .where({ 'p.id': id })
    .first();
}

function add(project) {
  return db('projects').insert(project)
    .then(ids => {
      return findById(ids[0]);
    });
}