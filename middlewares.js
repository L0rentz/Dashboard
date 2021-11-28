const logger = (req, res, next) => {
    console.log(`Received: ${req.method} ${req.path} Body: ${req.body}`);
    next()
}

const { secret } = require('./config/jwt.config');
const jwt = require('jsonwebtoken');
const tokenParser = require('./routes/utils.routes');

const authenticateJWT = (req, res, next) => {
    authHeader = req.headers.authorization;

    if (!authHeader)
        authHeader = tokenParser.getCookie(req, 'Authorization');

    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).send({
                    message: 'Invalid authorization token.'
                });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).send({
            message: 'You must provide authorization header to use this route.'
        });
    }
};

module.exports = {
    logger: logger,
    auth: authenticateJWT
}