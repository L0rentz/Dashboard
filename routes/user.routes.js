module.exports = app => {
    const path = require('path');
    const users = require("../controllers/user.controller.js");
    const { _, auth } = require('../middlewares');
    const utils = require('./utils.routes');

    var router = require("express").Router();

    router.post("/signup", users.signup);

    router.post("/login", users.login);

    app.get('/login', async (req, res) => {
        if (!await utils.checkRelog(req))
            res.sendFile(path.join(__dirname + '/../views/index.html'));
        else
            res.redirect('dashboard');
    });

    app.get('/dashboard', auth, (req, res) => {
        res.sendFile(path.join(__dirname + '/../views/dashboard.html'));
    });

    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname + '/../views/signup.html'));
    });

    //router.post("/changepassword", auth, users.changepassword);

    //router.post("/verifypassword", auth, users.verifypassword);

    app.use('/user', router);
};