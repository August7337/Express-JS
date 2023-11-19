const express = require('express');
const executeQuery = require('../db.js');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../middleware/authorization.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const queryResult = await executeQuery(`SELECT * FROM posts`);
        res.json(queryResult);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/url', async (req, res) => {
  try {
    reqBody = req.body;
    const queryResult = await executeQuery(`SELECT * FROM posts WHERE post_url = '${reqBody.url}'`);
    res.json(queryResult);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
    try {
        reqBody = req.body;
        const newPost = await executeQuery(
        `INSERT INTO posts (post_date,post_url,post_title,post_image,post_description,post_add_HTML) 
        VALUES ('${reqBody.date}','${reqBody.url}','${reqBody.title}','${reqBody.image}','${reqBody.description}','${reqBody.add_HTML}') RETURNING *`
      );
      res.json(`success to add ${reqBody.title}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
      reqBody = req.body;
      const deletePosts = await executeQuery(
        `DELETE FROM posts WHERE post_id = '${reqBody.id}'`
      );
      res.json(`success to delete ${reqBody.id}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.patch('/', async (req, res) => {
    try {
      reqBody = req.body;
      const patchPosts = await executeQuery(
        `UPDATE posts SET post_date='${reqBody.date}',post_url='${reqBody.url}', post_title='${reqBody.title}', 
        post_image='${reqBody.image}', post_description='${reqBody.description}', post_add_html='${reqBody.add_HTML}'
        WHERE post_id='${reqBody.id}';`
      );
      res.json(`success to update ${reqBody.url}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


module.exports = router;