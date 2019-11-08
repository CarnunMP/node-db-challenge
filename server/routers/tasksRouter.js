const express = require('express');

const Tasks = require('../models/tasksModel');

const router = express.Router();

router.get('/', (req, res) => {
  Tasks.find()
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to get task: ${err.message}`,
      });
    });
});

router.post('/', (req, res) => {
  Tasks.add(req.body)
    .then(task => {
      res.status(201).json({
        message: 'Successfully posted task.',
        task,
      });
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to post project: ${err.message}`,
      });
    });
});

module.exports = router;