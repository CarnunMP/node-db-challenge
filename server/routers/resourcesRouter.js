const express = require('express');

const Resources = require('../models/resourcesModel');

const router = express.Router();

router.get('/', (req, res) => {
  Resources.find()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      res.status(500).json( {
        message: `Failed to get resources: ${err.message}`,
      });
    });
})

module.exports = router;