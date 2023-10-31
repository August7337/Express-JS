const express = require('express');
const executeQuery = require('../db.js');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../middleware/authorization.js');

const router = express.Router();

router.get('/',authenticateToken, async (req, res) => {
  try {
    const queryResult = await executeQuery(`SELECT * FROM users`);
    res.json(queryResult);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body.name);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    reqName = req.body.name;
    reqEmail = req.body.email;
    const newUser = await executeQuery(
      `INSERT INTO users (user_name,user_email,user_password) VALUES ('${reqName}','${reqEmail}','${hashedPassword}') RETURNING *`
    );
    res.json(`success to add ${req.body.name}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/delete', async (req, res) => {
  try {
    reqEmail = req.body;
    console.log('reqEmail : ', reqEmail);
    const deleteUser = await executeQuery(
      `DELETE FROM users WHERE user_email = '${reqEmail.email}'`
    );
    res.json(`success to delete ${reqEmail}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
