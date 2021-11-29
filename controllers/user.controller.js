const db = require("../models");
const User = db.users;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');
const validator = require("email-validator");
var { user } = require("../config/db.config");

async function findUserByEmail(email) {
    try {
        users = await User.findAll({ where: { email: email } })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

async function findUserByJWT(jwt) {
    try {
        users = await User.findAll({ where: { jwt: jwt } })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

exports.getUserByJWT = async (email) => {
    try {
        users = await User.findAll({ where: { email: email } })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

exports.checkJwtCookie = async (jwtCookie) => {
    if (jwtCookie)
        console.log(jwtCookie)

    user = null;
    if (jwtCookie)
        user = await findUserByJWT(jwtCookie);

    if (user == null || !(user instanceof User))
        return false;
    return true;
}

exports.signup = (req, res) => {
    console.log(req.body)

    if (!req.body.email, !req.body.password) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return;
    }

    if (!validator.validate(req.body.email)) {
        res.status(400).send({
            message: 'Please provide a valid email.'
        });
        return;
    }

    // Create the User Record
    const newUser = {
        email: req.body.email,
        password: req.body.password
    }

    User.create(newUser)
        .then(data => {
            res.send({
                message: "Signup successful!",
                route: "/login"
            });
        })
        .catch(err => {
            let message = err.message || "Some error occurred while signing you up.";
            if (message == "Validation error")
                message = "Email already exist."
            res.status(500).send({
                message: message,
                errObj: err
            });
        });
}

exports.oauthSignup = async (email, token) => {
    console.log(email + ':' + token);

    if (!email)
        return false;

    if (!token)
        return false;

    if (!validator.validate(email))
        return false;

    // Create the User Record
    const newUser = {
        email: email,
        oauth: token,
        salt: User.generateSalt(),
        jwt: jwt.sign({ email: email }, secret),
    }

    const result = await User.create(newUser);

    if (result instanceof User)
        return true;
    return false;
}

exports.login = async (req, res) => {
    console.log(req.body)

    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please provide email and password.'
        });
        return;
    }

    if (!validator.validate(req.body.email)) {
        res.status(400).send({
            message: 'Please provide a valid email.'
        });
        return;
    }

    user = null;
    if (req.body.email) {
        user = await findUserByEmail(req.body.email);
    }
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid credentials!"
        });
    } else {
        if (user.verifyPassword(req.body.password)) {
            user.jwt = jwt.sign({ email: user.email }, secret);
            user.save();
            res.status(200).json({
                message: "Login successful",
                route: "/dashboard",
                token: user.dataValues.jwt,
            })
        } else {
            res.status(403).send({
                message: "Invalid credentials!"
            });
        }
    }
}

exports.changepassword = async (req, res) => {
    console.log(req.body)

    if (!req.body.oldpassword || !req.body.newpassword) {
        res.status(400).send({
            message: 'Please provide both old and new password.'
        });
        return;
    }
    user = await findUserByEmail(req.user.email);
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid credentials!"
        });
    } else {
        if (user.verifyPassword(req.body.oldpassword)) {
            user.update({ password: req.body.newpassword }, {
                where: { id: user.id }
            });
            res.status(200).send({
                message: "Password updated successfully!"
            })
        } else {
            res.status(403).send({
                message: "Invalid old password! Please recheck."
            });
        }
    }
}

exports.verifypassword = async (req, res) => {
    console.log(req.body)

    if (!req.body.password) {
        res.status(400).send({
            message: 'Please provide your password to re-authenticate.'
        });
        return;
    }
    user = await findUserByEmail(req.user.email);
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid credentials!"
        });
    } else {
        if (user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Password verification successful!"
            })
        } else {
            res.status(403).send({
                message: "Invalid password! Please recheck."
            });
        }
    }
}

module.exports = exports;