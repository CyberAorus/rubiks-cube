const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddlewares');

router.use(isAuth);

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
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
    const cube = await cubeService.getOneDetails(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllUnique(cube.accessories).lean();
    res.render('accessory/attach', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);
    res.redirect(`/cube/details/${accessoryId}`);
});

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    if (!cube) {
        res.redirect('/404');
    }
    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);
    res.redirect(`/cube/details/${modifiedCube._id}`);
});

module.exports = router;