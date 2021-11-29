const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const users = require("../controllers/user.controller");

const keyPath = path.join(__dirname, 'oauth.google.json');
let keys = { redirect_uris: [''] };
if (fs.existsSync(keyPath)) {
    keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
);

google.options({ auth: oauth2Client });

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email'
];

const authorizeUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    scope: scopes
});

var tokenHandling = async (dat, tokens) => {
    if (tokens.refresh_token) {
        var check = await users.oauthSignup(dat.data.email, tokens.refresh_token);
        if (check)
            return 'signup';
    }
    if (tokens.access_token)
        return 'login';

    return 'error';
};

module.exports = {
    oauth2Client,
    authorizeUrl,
    google,
    tokenHandling,
}