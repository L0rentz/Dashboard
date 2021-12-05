module.exports = app => {
    const path = require('path');
    const users = require("../controllers/user.controller");
    const dashboard = require("../controllers/dashboard.controller");
    const aboutJson = require("../config/about");
    const { _, auth } = require('../middlewares');
    const utils = require('./utils.routes');
    const url = require('url');
    const oauth = require('../oauth/google');
    const { google } = require('googleapis');
    const requestIp = require('request-ip');

    var router = require("express").Router();

    router.post("/signup", users.signup);

    router.post("/login", users.login);

    router.post("/dashboard/save", auth, dashboard.save);

    router.get("/dashboard/load", auth, dashboard.load);

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

    app.get('/oauth2callback', async (req, res) => {
        var params = url.parse(req.url, true).query;
        oauth.oauth2Client.getToken(params.code).then(async (value) => {
            const { tokens } = value;
            oauth.oauth2Client.setCredentials(tokens);
            const dat = await google.oauth2('v2').userinfo.get();
            const result = await oauth.tokenHandling(dat, tokens);
            if (result == 'signup' || result == 'login') {
                var userFound = await users.getUserByJWT(dat.data.email);
                if (userFound) {
                    res.cookie('Authorization', 'Bearer ' + userFound.dataValues.jwt, { httpOnly: false });
                    res.cookie('access_token', tokens.access_token, { httpOnly: false });
                    res.redirect('/login');
                    return;
                }
            }
            const components = {
                error: 'An error happened.',
            }
            const urlParameters = new URLSearchParams(components);
            res.redirect('/login' + '?' + urlParameters);
        }).catch((err) => {
            const components = {
                error: 'An error happened.',
            }
            const urlParameters = new URLSearchParams(components);
            res.redirect('/login' + '?' + urlParameters);
        });
    });

    app.get('/googleoauth2', (req, res) => {
        res.redirect(oauth.authorizeUrl);
    });

    app.get('/about.json', (req, res) => {
        res.status(200).send(aboutJson.getAboutJson(requestIp.getClientIp(req)));
    });

    //router.post("/changepassword", auth, users.changepassword);

    //router.post("/verifypassword", auth, users.verifypassword);

    app.use('/user', router);
};