const express = require('express');
const { getAddProductPage, postAddProductPage, getAdminProductsPage, getEditProductPage, postEditProductPage, postDeleteProductPage, getLoginPage, getRegisterPage, requireAuth, getAdminUsersPage } = require('../controllers/admin/ProductController');
const { authenticateToken } = require('../middleware/authorization');

const router = express.Router();

router.get('/', authenticateToken, getAdminProductsPage);
router.get('/users', authenticateToken, getAdminUsersPage);
router.get('/login', getLoginPage);
router.get('/add', authenticateToken, getAddProductPage);
router.post('/add', authenticateToken, postAddProductPage);
router.get('/edit/:productUrl', authenticateToken, getEditProductPage);
router.post('/edit', authenticateToken, postEditProductPage);
router.post('/delete', authenticateToken, postDeleteProductPage);

module.exports = router;