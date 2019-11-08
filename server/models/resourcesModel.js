const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  findByProjectId,
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

function findByProjectId(id) {
  return db('projects AS p')
    .join('PtoR as pr', 'p.id', 'pr.project_id')
    .join('resources AS r', 'pr.resource_id', 'r.id')
    .select('r.id', 'r.name', 'r.description')
    .where({ 'p.id': id });
}

function add(resource) {
  return db('resources').insert(resource)
    .then(ids => {
      return findById(ids[0]);
    });
}
