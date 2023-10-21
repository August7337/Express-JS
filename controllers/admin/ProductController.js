const { saveProduct, fetchAllProducts, getProductByUrl, updateProductByUrl, deleteProductByUrl } = require("../../models/product");

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
    res.redirect('/admin');
};

exports.postDeleteProductPage = (req, res) => {
    const productUrl = req.body.productUrl;
    deleteProductByUrl(productUrl, () => {
        res.redirect('/admin');
    });
};

exports.getLoginPage = (req, res) => {
    //const viewsData = {
    //    pageTitle: 'Login'
    //};
    //console.log('test');
    res.render('login');
};

exports.getRegisterPage = (req, res) => {
    const viewsData = {
        pageTitle: 'Register'
    };
    res.render('register', viewsData);
};

exports.test = (req, res) => {
    console.log('test');
};

exports.requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/admin/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas authentifié.
    };
};

  