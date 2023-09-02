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
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }
    saveProduct(product);
    res.redirect('/');
};