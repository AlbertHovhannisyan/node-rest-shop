
const { Router } = require('express');
const router = Router();

const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.order_get_all );

router.post('/', OrdersController.orders_create_order);

router.get('/:orderId', OrdersController.orders_create_order);

router.delete('/:orderId', OrdersController.order_delete_order);

module.exports = router;
