/*const sql_select = `SELECT * FROM "USER"`;

pool.query(sql_select, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(result.rows);
  });*/

const express = require('express');
const cors = require('cors');
const db = require("./models");
const { logger } = require('./middlewares');
const config = require('./config/server.config')();
const path = require('path');

const app = express();

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger);

db.connection.sync();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/dashboard', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname + '/views/dashboard.html'));
});

require("./routes/user.routes")(app);

app.listen(config.port, () => {
  console.log(`Express server listening at http://localhost:${config.port}`);
});