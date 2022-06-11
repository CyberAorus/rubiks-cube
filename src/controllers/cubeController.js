const router = require('express').Router();
const fs = require('fs/promises');
const cubes = require('../db.json');
const path = require('path');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;
    //TODO cube vallidation
    if (cube.name.length < 3) {
        res.status(400).send('Cube name should be at least 3 symbols long');
        return;
    }

    cubes.push(cube);
    fs.writeFile(path.resolve('src', 'db.json'), JSON.stringify(cubes, '', 4), {urlenconded: 'utf8'})
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

module.exports = router;