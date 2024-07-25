//used to handle the data, functions will be used to get data, create/update data, delete data...
let products = require('../data/products.json');   //the global variable          once gained, all in javascript object form  
const {v4 : uuidv4} = require('uuid');
const {writeDataToFiles} = require('../utils');
//weird inclusion way 


function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}     //return a new promise object as the result



function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => {
            return product.id === id;  
        });

        resolve(product);
    });
}

//func dealing with the addition stuff
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct);
        writeDataToFiles('./data/products.json', products);
        resolve(newProduct);
    });
}

//func dealing with the updating stuff----updating the existing data in the JSON file
function update(id, updatedProduct) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => {
            return product.id === id;
        });

        products[index] = {id, ...updatedProduct};
        writeDataToFiles('./data/products.json', products);
        resolve(products[index]);
    });

}

//func dealing with the deleting stuff---deleting the specified data from the JSON file
function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => {
            return p.id !== id;
        });
        writeDataToFiles('./data/products.json', products);
        resolve();
    });

}



module.exports = {findAll, findById, create, update, remove};



