
const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ProductRoutes = require('./api/routes/products');
const OrderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGODB_PASSWORD + '@node-rest-shop.ksps9.mongodb.net/test?retryWrites=true&w=majority',
    {
        //mongoose version check after update version will  https://github.com/feathersjs/cli/issues/136
        useNewUrlParser: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS'){
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
     return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/products', ProductRoutes);
app.use('/products', OrderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
