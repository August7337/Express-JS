let api_url = '/api';

exports.getHomePage = async (req, res) => {
    const fetchProducts = await fetch(`${process.env.DOMAIN}/api/posts`);
    products = await fetchProducts.json();
    const viewsData = {
        admin: false,
        products,
        pageTitle: 'Home Page - Products List'
    };
    res.render('product-list', viewsData);
};

exports.getProductDetailsPage = async (req, res) => {
    async function getPostByUrl(data) {
        const res = await fetch(`${process.env.DOMAIN}/api/posts/url`, {
          method: 'POST',
          credentials:'include',
          cache:'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return await res.json();
    }

    const products = await getPostByUrl({url: req.params.productUrl});
    if (products.error) {
        console.log(products.error);
        return;
    }
    product = products[0];
    const viewsData = {
        product,
        pageTitle: product.title
    };
    res.render('ProductDetails', viewsData)
}