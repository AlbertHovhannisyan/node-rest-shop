
const { Router } = require('express');
const router = Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString()+file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    // reject a file
  if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png')
      callback(null, true);
  else {
   callback(null, false);
  }
};

const upload = multer({storage: storage,
    limits: {
    fileSize: 2056 * 2056 *5
    },
    fileFilter: fileFilter
});

router.get('/', ProductController.products_get_all);

router.post('/', checkAuth, ProductController.products_create_product);

router.get('/:productId', ProductController.products_get_product);

router.patch('/:productId', checkAuth, ProductController.prodcuts_update_product);

router.delete('/:productId',checkAuth, ProductController.products_delete_product);

module.exports = router;