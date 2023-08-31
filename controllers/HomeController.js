const { fetchAllProducts } = require("../models/product");

exports.getHomePage = (req, res) => {

    fetchAllProducts(products => {
        const viewsData = {
            products,
            pageTitle: 'Home Page - Products List'
        };
        res.render('homepage', viewsData);
    });

    
};