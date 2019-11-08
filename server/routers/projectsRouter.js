const express = require('express');

const Projects = require('../models/projectsModel');
const Resources = require('../models/resourcesModel');
const Tasks = require('../models/tasksModel');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
    .then(projects => {
      const fixedBools = projects.map(project => ({
        ...project,
        completed: project.completed === '1',
      }));
      // ^Hmm... there must be a way to do this in the model/knex file? :/

      res.status(200).json(fixedBools);
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to get projects: ${err.message}`,
      });
    });
});

// Stretch:
router.get('/:id', (req, res) => {
  Projects.findById(req.params.id)
    .then(project => {
      const fixedBoolsProject = {
        ...project,
        completed: project.completed === '1',
      };

      Tasks.findByProjectId(req.params.id)
        .then(tasks => {
          const fixedBoolsTasks = tasks.map(task => ({
            ...task,
            completed: task.completed === '1',
          }));

          Resources.findByProjectId(req.params.id)
            .then(resources => {
              const returnObj = {
                ...fixedBoolsProject,
                tasks: fixedBoolsTasks,
                resources: resources,
              }

              res.status(200).json(returnObj);
            })
            .catch(err => {
              res.status(500).json( {
                message: `Failed to get resources for project: ${err.message}`,
              });
            });
        })
        .catch(err => {
          res.status(500).json( {
            message: `Failed to get tasks for project: ${err.message}`,
          });
        });
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to get project by id: ${err.message}`,
      });
    });
})

router.get('/:id/tasks', (req, res) => {
  Tasks.findByProjectId(req.params.id)
    .then(tasks => {
      const fixedBools = tasks.map(task => ({
        ...task,
        completed: task.completed === '1',
      }));

      res.status(200).json(fixedBools);
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