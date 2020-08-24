const express = require('express');
const app=express();

const ProductRoutes = require('./api/routes/products');
const OrderRoutes = require('./api/routes/orders');

app.use('/products',ProductRoutes);
app.use('/products',OrderRoutes);

module.exports = app;