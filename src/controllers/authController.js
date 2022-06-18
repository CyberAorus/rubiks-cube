const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    let createdUser = await authService.register(req.body);
    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        //TODO: add notification
        res.redirect('404');
    }
    res.redirect('/auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    let token = await authService.login(req.body);
    if (!token) {
        return res.redirect('/404');
    };
    //res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
    res.cookie('session', token);
    res.redirect('/');
});

module.exports = router;