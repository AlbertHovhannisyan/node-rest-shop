
const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Order = require('../models/order');
const Product = require('../models/order')

router.get('/', checkAuth, (req, res, next) => {
   Order.find()
       .select('Prodcut quantity _id')
       .populate('product', 'name')
       .exec()
       .then(docs => {
           res.status(200).json({
               count: docs.length,
               orders: docs.map(doc => {
                   return{
                       _id: doc._id,
                       product: doc.product,
                       quantity: doc.quantity,
                       request: {
                           type: 'GET',
                           url:  + doc._id
                       }
                   };
               })
           });
       })
       .catch(err => {
           res.status(500).json({
               error: err
           });
       });
});

router.post('/', checkAuth, (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            return order.save()
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Order Strored',
                        createOrder: {
                            _id: result._id,
                            product: result.product,
                            quantity: result.quantity
                        },
                        request: {
                            type: 'GET',
                            url: 'http://locallhost:3000/order' + result._id
                        }
                    });
                })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            });
        })
});

router.get('/:orderId', checkAuth, (req, res, next) => {
  Order.findById(res.params.orderId)
      .populate('product')
      .exec()
      .then(order => {
          if(!order){
              return res.status(404).json({
                  message: 'Order Not found'
              })
          }
          res.status(200).json({
              order: order,
              request: {
                  type: 'GET',
                  url: 'http://locallhost:3000/orders/'
              }
          })
              .catch(err => {
                  res.status(500).json({
                      error: err
                  })
              }) ;
      });
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
  Order.remove({_id: req.params.orderId })
      .exec()
      .then(result => {
          message: 'Order Deleted',
          res.status(200).json({
              request: {
                  type: 'POST',
                  url: 'http://locallhost:3000/orders/',
                  body: {productId: 'ID', quantity: 'Number'}
              }
          })
      });
});

module.exports = router;
