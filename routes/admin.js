const express = require('express');
const { getAddProductPage, postAddProductPage, getAdminProductsPage, getEditProductPage, postEditProductPage, postDeleteProductPage, getLoginPage, getRegisterPage, requireAuth } = require('../controllers/admin/ProductController');

const router = express.Router();

router.get('/', requireAuth, getAdminProductsPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/add', requireAuth, getAddProductPage);
router.post('/add', requireAuth, postAddProductPage);
router.get('/edit/:productUrl', requireAuth, getEditProductPage);
router.post('/edit', requireAuth, postEditProductPage);
router.post('/delete', requireAuth, postDeleteProductPage);

module.exports = router;