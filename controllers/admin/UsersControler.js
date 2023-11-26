const executeQuery = require('../../db.js');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
      const queryResult = await executeQuery(`SELECT * FROM users`);
      res.json(queryResult);
    } catch (error) {
      console.error(err.message);
      res.status(500).json({ error: error.message });
    }
}

exports.postUser = async (req, res) => {
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
}

exports.deleteUser = async (req, res) => {
    try {
        reqEmail = req.body;
        const deleteUser = await executeQuery(
          `DELETE FROM users WHERE user_email = '${reqEmail.email}'`
        );
        res.json(`success to delete ${reqEmail}`);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}