
const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.status(201).json({
        message:'Order was fetched',
    });
});

router.get('/', (req, res, next) => {
    res.status(201).json({
        message:'Order was created',
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(201).json({
        message:'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
        message:'Order details',
        orderId: req.params.orderId
    });
});

module.exports = router;
