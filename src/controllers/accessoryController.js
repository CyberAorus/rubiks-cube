const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    
});

module.exports = router;