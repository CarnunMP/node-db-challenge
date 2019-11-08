const express = require('express');

const projectsRouter = require('./routers/projectsRouter');
const resourcesRouter = require('./routers/resourcesRouter');
const tasksRouter = require('./routers/tasksRouter');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);

server.get('/', (req, res) => {
  res.send('<h2> Hello World! <h2>');
})

function logger(req, res, next) {
  console.log(req.method, req.url, new Date().toISOString());
  next();
}

module.exports = server;