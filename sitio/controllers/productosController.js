const fs = require('fs');
const path = require('path')
let dbProducto = require('../data/database')


module.exports={
    listar:function(req, res){
        res.render('productos',{
            title:"Nuestros productos",
            dbProducto:dbProducto
        });
    },
    buscar:function(req,res){
        let buscar = req.query.buscar;
        let resultados = [];
        dbProducto.forEach(function(producto){
            if(producto.nombre.toLowerCase().includes(buscar.toLowerCase())){
                resultados.push(producto)
            }
        })
        res.render('productos',{
            title:"Resultados de la busqueda",
            dbProducto:resultados
        })
    },
    cargaProducto:function(req, res) {
        res.render('productAdd', { title: 'Avalon Productos' });
    },
    detalleProducto: function(req, res) {
        res.render('detalleProducto', {
          title: "Detalle de producto"
        });
    },
    carrito:function(req, res) {
        let idProducto = req.params.id;
        res.render('CarritoDeCompras', {
          title: "Carrito de compras",
          dbProducto:dbProducto,
          idProducto:idProducto
        });
    },
    catProducto:function(req,res){
        let catProducto = req.params.catProducto
        res.render('catProductos',{
            title:"Avalon",
            catProducto:catProducto,
            dbProducto:dbProducto
        })
    },
    publicarProducto: function(req,res,next){
        let lastID = 1;

        dbProducto.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })
        let nuevoProducto={
            id: lastID + 1,
            nombre: req.body.nombre.trim(),
            precio: Number(req.body.precio),
            descuento: Number(req.body.descuento),
            categoriaProducto: req.body.catergoria,
            descripcion:req.body.descripcion,
            imagen: (req.files[0])?req.files[0].filename:"productoMuestra.png"
        };
        dbProducto.push(nuevoProducto);
        fs.writeFileSync(path.join(__dirname,"..",'data',"productosDataBase.json"),JSON.stringify(dbProducto),'utf-8');
        res.redirect('/productos');
    }
}