const express = require('express');

const tasksRouter = require('./tasksRouter');
const Projects = require('../models/projectsModel');
const Resources = require('../models/resourcesModel');

const router = express.Router();

router.use('/:id/tasks', tasksRouter);

router.get('/', (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to get projects: ${err.message}`,
      });
    });
});

router.post('/', (req, res) => {
  Projects.add(req.body)
    .then(project => {
      res.status(201).json({
        message: 'Successfully posted project.',
        project,
      });
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to post project: ${err.message}`,
      });
    });
});

module.exports = router;