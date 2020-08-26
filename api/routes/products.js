
const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: res.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: 'Handling POST request to /products',
        createProduct: product
    });
});

router.get('/:productId', (req, res, next) =>{
    const id= req.params.prodcutId;
    if (id === 'special'){
        res.status(200).json({
            message: 'It is special ID',
            id: id
        });
    }
    else{
        res.status(200).json({
            message: 'You passed the ID'
        });
    }
});

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productID',(req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;