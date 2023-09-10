const { saveProduct, fetchAllProducts, getProductByUrl, updateProductByUrl } = require("../../models/product");

exports.getAddProductPage = (req, res) => {
    const viewsData = {
        edit: false,
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

exports.getAdminProductsPage = (req, res) => {
    fetchAllProducts((products) => {
        const viewsData = {
            admin: true,
            pageTitle: 'Admin Products',
            products
        }
        res.render('product-list', viewsData);
    })
}

exports.getEditProductPage = (req, res) => {
    const productUrl = req.params.productUrl;
    
    getProductByUrl(productUrl, (product) => {
        const viewsData = {
            edit: true,
            product,
            pageTitle: 'Edit Product'
        };
        res.render('AddProduct', viewsData);
    });
};

exports.postEditProductPage = (req, res) => {
    const product = {
        title: req.body.title,
        url: req.body.productUrl,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    };
    updateProductByUrl(product, req.body.productUrl);
    res.redirect('/products');
};

exports.postDeleteProductPage = (req, res) => {

};