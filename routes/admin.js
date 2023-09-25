const express = require('express');
const { getAddProductPage, postAddProductPage, getAdminProductsPage, getEditProductPage, postEditProductPage, postDeleteProductPage, getLoginPage, getRegisterPage, requireAuth } = require('../controllers/admin/ProductController');

const router = express.Router();

router.get('/', getAdminProductsPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/add', getAddProductPage);
router.post('/add', postAddProductPage);
router.get('/edit/:productUrl', getEditProductPage);
router.post('/edit', postEditProductPage);
router.post('/delete', postDeleteProductPage);

module.exports = router;