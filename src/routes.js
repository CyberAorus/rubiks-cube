const express = require('express');
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const router = express.Router();

router.get('/', homeController.index);
router.use('/cube', cubeController);
router.get('/about', homeController.about);

module.exports = router;
