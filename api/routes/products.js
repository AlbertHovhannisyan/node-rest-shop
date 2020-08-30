
const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
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
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product succesfully',
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
});

router.get('/:productId', (req, res, next) => {

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
});


router.patch('/:productId', (req, res, next) => {
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
});

router.delete('/:productId',(req, res, next) => {
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
});

module.exports = router;