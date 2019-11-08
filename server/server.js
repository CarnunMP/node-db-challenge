const express = require('express');

const projectsRouter = require('./routers/projectsRouter');
const resourcesRouter = require('./routers/resourcesRouter');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);

module.exports = server;