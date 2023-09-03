const express = require('express');
const router = express.Router();
const { getHomePage, getProductDetailsPage } = require('../controllers/HomeController');

router.get('/', getHomePage);

router.get('/product/details/:productUrl', getProductDetailsPage);

module.exports = router;