const { saveProduct } = require("../../models/product");

exports.getAddProductPage = (req, res) => {
    const viewsData = {
        pageTitle: 'Add Product'
    };
    res.render('AddProduct', viewsData);
};

exports.postAddProductPage = (req, res) => {
    const product = {
        title: req.body.title,
        url: req.body.url,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }
    saveProduct(product);
    res.redirect('/');
};