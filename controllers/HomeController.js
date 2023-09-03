const { fetchAllProducts, getProductByUrl } = require("../models/product");

exports.getHomePage = (req, res) => {

    fetchAllProducts(products => {
        const viewsData = {
            products,
            pageTitle: 'Home Page - Products List'
        };
        res.render('homepage', viewsData);
    });
};

exports.getProductDetailsPage = (req, res) => {
    const productUrl = req.params.productUrl;
    getProductByUrl(productUrl, product => {
        const viewsData = {
            product,
            pageTitle: product.title
        };
        res.render('ProductDetails', viewsData)
    });
}