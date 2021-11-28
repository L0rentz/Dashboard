const express = require('express');
const cors = require('cors');
const db = require("./models");
const config = require('./config/server.config');
const { logger } = require('./middlewares');

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

require("./routes/user.routes")(app);

app.listen(config.port, () => {
  console.log(`Express server listening at http://${config.host}:${config.port}`);
});