const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddlewares');
const { body, validationResult } = require('express-validator');

router.use(isAuth);

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post(
    '/create',
    isAuth, // middleware for checking if user is logged in
    body('name').not().isEmpty(), // middleware for checking if name is not empty
    body('description').isLength({ min: 5, max: 120 }), // middleware for checking if description is at least 5 characters long
    body('difficulty').toInt().isInt({ min: 1, max: 6 }), // middleware for checking if difficulty is between 1 and 6   
    async (req, res) => {
        const cube = req.body;
        cube.owner = req.user._id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array()[0].message);
        }
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

    }
);

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    const isOwner = cube.owner == req.user?._id;

    res.render('details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {

    const cube = await cubeService.getOneDetails(req.params.cubeId).lean();

    const accessories = await accessoryService.getAllUnique(cube.accessories).lean();
    res.render('accessory/attach', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);
    res.redirect(`/cube/details/${req.params.cubeId}`);
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    cube[`difficulty${cube.difficulty}`] = true;

    if (cube.owner != req.user._id) {
        //TODO: add message
        return res.redirect('/404')
    }

    if (!cube) {
        res.redirect('/404');
    }
    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);
    res.redirect(`/cube/details/${modifiedCube._id}`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    //TODO: add is owner vallidation
    res.render('cube/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);
    res.redirect('/');
})

module.exports = router;