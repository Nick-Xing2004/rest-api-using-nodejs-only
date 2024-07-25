const http = require('http');      //the http server
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('./controllers/productController');

//importing in the data we hope to use in the project
const product = require('./data/products.json');


const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);    //will wait for the function to process 
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];     //splitting the string by '/' to get the id #.
        getProduct(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);
    }
    else {
        res.writeHead(400, {'Content-type': 'application/json'});
        res.end(JSON.stringify({message: "the specified route not found"}));
    }
});


const PORT =  process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`server is now running on port ${PORT}`);
});