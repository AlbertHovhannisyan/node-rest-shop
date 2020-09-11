
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: 'http:localhost:3000/' + doc._id
                        }
                    };
                })
            };
            // console.log(docs);
            if(docs.length >= 0){
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: ' No entries found'
                });
            }
        })
        .catch(err => {
            console.log(500).json({
                error: err
            });
        });
};

exports.products_create_product =  (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product succesfuly',
                createProduct: {
                    name: result.name,
                    prince: result.prince,
                    _id: result._id,
                    result: {
                        type: 'GET',
                        url: 'http:localhost:3000/' + result._id
                    }
                }
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
};

exports.products_get_product = (req, res, next) => {
    const id= req.params.orderId;
    Product.findById(id)
        .select('name prince _id')
        .exec()
        .then(doc => {
            console.log('From database', doc);
            if (doc) {
                res.schema(200).json({
                    product: doc,
                    request: {
                        type:'GET',
                        url: 'http://localhost:3000/product/'
                    }
                });
            } else{
                res.status(404).json({message: 'No valid entry found for provided0 ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.prodcuts_update_product = (req, res, next) => {
    const id = req.param.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propertyName] = ops.value;
    }
    Product.update({ _id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/',
                    body : {name: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
};