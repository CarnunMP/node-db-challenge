const express = require('express');

const Projects = require('../models/projectsModel');
const Tasks = require('../models/tasksModel');

const router = express.Router();

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

router.get('/:id/tasks', (req, res) => {
  Tasks.findByProjectId(req.params.id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to get tasks for project: ${err.message}`,
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