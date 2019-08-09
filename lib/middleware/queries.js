const { Pool } = require('pg');

const {
  POSTGRESQL_USERNAME,
  POSTGRESQL_HOST,
  POSTGRESQL_DB,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT
} = process.env;

console.log(
  POSTGRESQL_USERNAME,
  POSTGRESQL_HOST,
  POSTGRESQL_DB,
  POSTGRESQL_PORT
);

const pool = new Pool({
  user: POSTGRESQL_USERNAME,
  host: POSTGRESQL_HOST,
  database: POSTGRESQL_DB,
  password: POSTGRESQL_PASSWORD,
  port: POSTGRESQL_PORT
});

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
    [name, email],
    (error, results) => {
      if(error) throw error;
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    // eslint-disable-next-line no-unused-vars
    (error, results) => {
      if(error) throw error;
      res.status(200).send(`User modified with Id: ${id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    'DELETE FROM users WHERE id = $1',
    [id],
    // eslint-disable-next-line no-unused-vars
    (error, results) => {
      if(error) throw error;
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
