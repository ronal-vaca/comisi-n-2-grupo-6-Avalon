var express = require('express');
var router = express.Router();
const controller = require('../controllers/productosController');

const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/imagenProducto')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

/*ruta de todos los productos */
router.get('/', controller.listar);

/*ruta del buscador */
router.get('/buscar',controller.buscar)

/*rutas de carga de producto*/ 
router.get('/cargaProducto', controller.cargaProducto);
router.post('/cargaProducto',upload.any(),controller.publicarProducto);

/*ruta al detalle del producto */
router.get('/detalleProducto/:id',controller.detalleProducto);

/*ruta al carrito de compras */
router.get('/carrito/:id', controller.carrito);

/*ruta de edicion de producto */
router.get('/EditarProducto/:id', controller.vistaEditar)
router.put('/EditarProducto/:id', upload.any(),controller.guardarEditar)

router.get('/:catProducto', controller.catProducto);

module.exports = router;