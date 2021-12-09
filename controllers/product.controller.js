const Product = require('../models/Product');

async function insert(product) {
    console.log(`Inserting product in db ${product}`)
    const submit = await new Product(product).save();
    return submit;
}


module.exports = {
    insert
}