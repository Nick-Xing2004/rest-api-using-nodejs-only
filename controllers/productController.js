const Product = require('../models/productModel');
const { getPostData } = require('../utils');

async function getProducts(req, res) {     //essentially do the capsulation within a varied function
    try {
        const products = await Product.findAll();   //the asynchronous operation, thus using await
        res.writeHead(200, {'Content-type': 'application/json'});
        // console.log(products);    //what you get is array of javaScript objects
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}


async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);   //the asynchronous operation, thus using await 
        //finally resolved to a value     

        if (!product) {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(JSON.stringify({'message': "the specified product not found!"}));
        } else {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(product));
        }
        
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}


async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);

        const product = {    //the attribute has the order 
            title,
            description,
            price
        };
        const newProduct = await Product.create(product);

        res.writeHead(201, {'Content-type': 'application/json'});
        res.end(JSON.stringify(newProduct));
        // console.log(JSON.stringify(newProduct));
    }
    catch (error) {
        console.log(error);
    }
}


async function updateProduct(req, res, id) {
    try {
       const product = Product.findById(id);

       if (!product) {
        res.writeHead(404, {'Content-type': 'application/json'});
        res.end(JSON.stringify({'message': "the specified product not found!"}));
       }
       else {
        const data = await getPostData(req);
        const {title, description, price} = JSON.parse(data);

        const updatedProduct = {
            title: title || product.title,
            description: description || product.description,
            price: price || product.price
        }
        
        const updProduct = await Product.update(id, updatedProduct);

        res.writeHead(200, {'Content-type': 'application/json'});   //201 -----create some data
        res.end(JSON.stringify(updProduct));
       }
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req, res, id) {
    try {
        const product = Product.findById(id);
 
        if (!product) {
         res.writeHead(404, {'Content-type': 'application/json'});
         res.end(JSON.stringify({'message': "the specified product not found!"}));
        }
        else { 
         await Product.remove(id);

         res.writeHead(200, {'Content-type': 'application/json'});   //201 -----create some data
         res.end(JSON.stringify({message: `the product with id ${id} has been removed!`}));
        }
     }
     catch (error) {
        console.log(error);
     }
}










//to use the controller  we export it
module.exports = {getProducts, getProduct, createProduct, updateProduct, deleteProduct};






