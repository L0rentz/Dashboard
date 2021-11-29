const { dashboards } = require("../models");
const db = require("../models");
const User = db.users;
const Dashboard = db.dashboards;

async function findDashboardByUserid(userid) {
    try {
        dashboard = await Dashboard.findAll({ where: { userid: userid } })
        return (dashboard instanceof Array) ? dashboard[0] : null;
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

function splitOnFirst(str, sep) {
    const index = str.indexOf(sep);
    return index < 0 ? [str] : [str.slice(0, index), str.slice(index + sep.length)];
}

exports.save = async (req, res) => {
    var jwt = splitOnFirst(req.cookies.Authorization, ' ')[1];
    var user = await findUserByJWT(jwt);
    if (!user) {
        res.status(500).send("User not found.")
        return;
    }
    var dashboard = await findDashboardByUserid(user.dataValues.id);
    dashboard.grid = JSON.stringify(req.body);
    dashboard.save();
    res.status(200).send("Grid saved.");
}

exports.load = async (req, res) => {
    var jwt = splitOnFirst(req.cookies.Authorization, ' ')[1];
    var user = await findUserByJWT(jwt);
    if (!user) {
        res.status(500).send("User not found.");
        return;
    }
    var dashboard = await findDashboardByUserid(user.dataValues.id);
    var json = {
        dashboard: JSON.parse(dashboard.dataValues.grid),
    }
    res.status(200).send(json);
}

module.exports = exports;