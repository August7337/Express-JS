const express = require('express');
const { authenticateToken } = require('../middleware/authorization.js');
const { getUsers, postUser, deleteUser } = require('../controllers/admin/UsersControler.js');

const router = express.Router();

router.get('/',authenticateToken, getUsers);
router.post('/', authenticateToken, postUser);
router.delete('/', authenticateToken, deleteUser);

module.exports = router;
