const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV = 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.json({
    info: 'Node.js, Express, and Postgres API'
  });
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
