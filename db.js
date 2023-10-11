const {Client} = require('pg');


const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'test',
    password: 'admin',
    port: '5433'
    
});

client.connect();

const executeQuery = () => {
    return new Promise((resolve, reject) => {
      client.query(`SELECT * FROM users`, (err, res) => {
        if (!err) {
          resolve(res.rows);
        } else {
          reject(err);
        }
        client.end();
      });
    });
};

module.exports = executeQuery;