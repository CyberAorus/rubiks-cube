const express = require('express');
const homeController = require('./controllers/homeController');
const createController = require('./controllers/createController');
const router = express.Router();

router.get('/', homeController.index);
router.use('/cube', createController);
router.get('/about', homeController.about);

module.exports = router;
