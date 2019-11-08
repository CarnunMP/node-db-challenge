const express = require('express');

const projectsRouter = require('./routers/projectsRouter');
const resourcesRouter = require('./routers/resourcesRouter');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);

server.get('/', (req, res) => {
  res.send('<h2> Hello World! <h2>');
})

module.exports = server;