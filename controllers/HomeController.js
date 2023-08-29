const { getAllProducts } = require("../models/product");

exports.getHomePage = (req, res) => {
    const viewsData = {
        products: getAllProducts(),
        pageTitle: 'Home Page - Products List'
    };
    res.render('homepage', viewsData);
};