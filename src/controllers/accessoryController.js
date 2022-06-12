const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('accessory/create');
});

module.exports = router;