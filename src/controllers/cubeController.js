const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;
    //TODO cube vallidation
    if (cube.name.length < 3) {
        res.status(400).send('Cube name should be at least 3 symbols long');
        return;
    }
    //TODO save cube to db
    try {
        await cubeService.save(cube);
        res.redirect('/');

    } catch (error) {
        res.status(500).send(error.message);
    }

});

module.exports = router;