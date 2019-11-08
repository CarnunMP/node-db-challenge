const express = require('express');

const tasksRouter = require('./routers/tasksRouter');
const Projects = require('../models/projectsModel');
const Resources = require('../models/resourcesModel');

const router = express.Router();

router.use('/:id/tasks', tasksRouter);

// router.get...

module.exports = router;