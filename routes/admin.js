const express = require('express');
const { getAddProductPage, getAdminProductsPage, getEditProductPage, getLoginPage, getRegisterPage, requireAuth, getAdminUsersPage } = require('../controllers/admin/ProductController');
const { authenticateToken } = require('../middleware/authorization');

const router = express.Router();

router.get('/', authenticateToken, getAdminProductsPage);
router.get('/users', authenticateToken, getAdminUsersPage);
router.get('/login', getLoginPage);
router.get('/add', authenticateToken, getAddProductPage);
router.get('/edit/:productUrl', authenticateToken, getEditProductPage);

module.exports = router;