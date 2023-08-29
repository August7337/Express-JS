const products = [{title: 'Product 1'}];

exports.saveProduct = (product) => {
    products.push(product);
};

exports.getAllProducts = () => {
    return products;
};