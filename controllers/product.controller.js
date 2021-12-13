const Product = require('../models/Product');


/**
 * 
 * @param {Object} product 
 * Save Obj to Db.
 */
async function insert(product) {

  if(!product) {
    return;
  }
    console.log(`Inserting product in db ${product}`)
    const submit = await new Product(product).save();
    return submit;
}

/**
 * 
 * @param {ProductID} id 
 * @param {Object} product 
 * @param {*} callback 
 */
function updateProduct(id,product, callback) {
 
  var query = {_id: id};
	var update = {
		name: product.name,
		description: product.description,
		price: product.price,
		deliveryPrice: product.deliveryPrice
  
  }
  console.log(update);
	Product.updateOne(query, update, callback);
}

/**
 * 
 * @param {Product ID} id 
 * @param {*} callback 
 */
function deleteProduct(id, callback) {

    var query = {_id: id};
    Product.remove(query, callback);
}

/**
 * 
 * @param {Product ID} id 
 * @param {Name & Description} payload 
 * @param {*} callback 
 */
function pushOptions(id, payload, callback) {
  
  var q = { _id: id };
  var option = {
    name: payload.name,
    description: payload.description
  }

  Product.updateOne( q, { $push : { options: [option]}}, callback);
}

module.exports = {
  insert,
  updateProduct,
  deleteProduct,
  pushOptions
    
}