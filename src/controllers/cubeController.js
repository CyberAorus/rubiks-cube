const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

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
        await cubeService.create(cube);
        res.redirect('/');

    } catch (error) {
        res.status(500).send(error.message);
    }

});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();

    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean();
    res.render('accessory/attach', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const cubeId = req.params.cubeId;
    const accessoryId = req.body.accessoryId;
    
    await cubeService.attachAccessory(cubeId, accessoryId);
    res.redirect(`/cube/details/${cubeId}`);
});

module.exports = router;