const express = require('express');
const executeQuery  = require('../db.js')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const queryResult = await executeQuery();
    res.json(queryResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Une erreur sest produite' });
  }
});

module.exports = router;
