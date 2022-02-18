const fs = require("fs");
const path = require("path")

function findAll(){
   let data = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8")
   let platos = JSON.parse(data);
   return platos
}
function writeFile(array){
    let string = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), string)
}

const controller = {
    list: function(req, res){
        //obtengo todos los productos
        const products = findAll()
        
        //devuelvo una respuesta
        //muestro la vista con todos los productos
        res.render("menu-products", { products: products })
    },
    detail: function( req, res){
        //obtengo todos los productos
        const products = findAll()

        //busco el producto
        let productFound = products.find(function(plato){
            return plato.id == req.params.id
        })

        //devuelvo una respuesta
        //muestro la vista de detalle, y le paso la inform del producto que busque
        res.render("product-detail", {product: productFound});

    },
    create: function(req, res){
        //devuelvo el formulario de creacion de producto
        res.render("product-create-form")
    },
    store: function(req, res){
        //obtengo los productos
        let products = findAll()

        //creo el nuevo producto para agregar
        let newProduct = {
            id: products.length + 1,
            name: req.body.name ,
            price: req.body.price,
            description: req.body.description 
        }
        
        //agrego el nuevo producto a mi listado de productos 
        products.push(newProduct)

        //modifico mi base de datos
        writeFile(products)
        
        //devuelvo una respuesta 
        //redirecciono al listado de productos
        res.redirect("/products/list");
    },
    edit: function(req, res){
        //obtengo los productos
        let products = findAll()

        //busco el producto
        let productFound = products.find(function(plato){
            return plato.id == req.params.id
        })

        //devuelvo el formulario de edicion con informacion del producto a editar
        res.render("product-update-form", {product: productFound})
    },
    update: function(req, res){
        //obtengo los productos
        let products = findAll()

        //busco el producto que voy a actualizar
        let productFound = products.find(function(plato){
            return plato.id == req.params.id
        })

        //modifico el produto que busque
        productFound.name = req.body.name;
        productFound.description = req.body.description;
        productFound.price = req.body.price;

        //modifico mi base de datos
        writeFile(products)

        //redirecciono al listado de productos
        res.redirect("/products/list")

    },
    destroy: function(req, res){
        //obtengo todos los productos
        let products = findAll()

        //busco el producto y obtengo su indice
        let productIndex = products.findIndex(function(plato){
            return plato.id == req.params.id
        })

        //elimino el producto que busque, pasando su indice 
        products.splice(productIndex, 1)

        //modifico mi base de datos
        writeFile(products) 

        //redirecciono al listado de productos
        res.redirect("/products/list");

    }
}

module.exports = controller
