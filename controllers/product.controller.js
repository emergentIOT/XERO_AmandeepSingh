const Product = require('../models/Product');
//const { delete } = require('../routes/product.route');



async function insert(product) {
    console.log(`Inserting product in db ${product}`)
    const submit = await new Product(product).save();
    return submit;
}

function updateProduct(id,product, callback) {
 
  var query = {_id: id};
  console.log("query", query);
	var update = {
		name: product.name,
		description: product.description,
		price: product.price,
		deliveryPrice: product.deliveryPrice
  
  }
  console.log(update);
	Product.updateOne(query, { $set: {update} }, callback);
}

function deleteProduct(id, callback) {
    var query = {_id: id};
    Product.remove(query, callback);
}

function pushOptions(id, payload, callback) {
  var q = { _id: id };
  var option = {
    name: payload.name,
    description: payload.description
  }

  Product.updateOne( q, { $push : { options: [option]}}, callback);
}


// .delete((req,res)=>{
//     User.findByIdAndDelete(req.params.id, (err, data) => {sendResponse(res, err, data)})
//   })
  
//   function sendResponse(res,err,data){
//     if (err){
//       res.json({
//         success: false,
//         message: err
//       })
//     } else if (!data){
//       res.json({
//         success: false,
//         message: "Not Found"
//       })
//     } else {
//       res.json({
//         success: true,
//         data: data
//       })
//     }
//   }


module.exports = {

  insert,
  updateProduct,
  deleteProduct,
  pushOptions
    
}