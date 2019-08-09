const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const db = require('./middleware/queries');

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

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser),
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
