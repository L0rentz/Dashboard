const users = require("../controllers/user.controller.js");

exports.getCookie = (req, cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(req.headers.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

exports.checkRelog = async (req) => {
    const jwtCookie = this.getCookie(req, 'Authorization');
    const token = jwtCookie.split(' ')[1];
    const relogCheck = await users.relog(token);

    return (relogCheck);
}

module.exports = exports;