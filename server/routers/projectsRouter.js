const express = require('express');

const tasksRouter = require('./routers/tasksRouter');

const router = express.Router();

router.use('/:id/tasks', tasksRouter);

// router.get...