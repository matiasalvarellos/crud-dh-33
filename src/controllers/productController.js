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
        const products = findAll()
        
        res.render("menu-products", { products: products })
    },
    detail: function( req, res){
        //obtengo la informacion
        const products = findAll()

        let productFound = products.find(function(plato){
            return plato.id == req.params.id
        })

        res.render("product-detail", {product: productFound});

    },
    create: function(req, res){
        res.render("product-create-form")
    },
    store: function(req, res){
        let products = findAll()
        let newProduct = {
            id: products.length + 1,
            name: req.body.name ,
            price: req.body.price,
            description: req.body.description 
        }
        
        products.push(newProduct)

        writeFile(products)
        
        res.redirect("/products/list");
    },
    edit: function(req, res){
        let products = findAll()

        let productFound = products.find(function(plato){
            return plato.id == req.params.id
        })

        res.render("product-update-form", {product: productFound})
    },
    update: function(req, res){
        let products = findAll()

        // let newArray = products.map(function(plato){
        //     if(plato.id == req.params.id){
        //         plato.name = req.body.name;
        //         plato.description = req.body.description;
        //         plato.price = req.body.price;
        //     }
        //     return plato
        // })
        //otra forma
        let productFound = products.find(function(plato){
            return plato.id == req.params.id
        })

        productFound.name = req.body.name;
        productFound.description = req.body.description;
        productFound.price = req.body.price;

        writeFile(products)

        res.redirect("/products/list")

    },
    destroy: function(req, res){
        let products = findAll()

        let productIndex = products.findIndex(function(plato){
            return plato.id == req.params.id
        })

        products.splice(productIndex, 1)

        writeFile(products)

        res.redirect("/products/list");

    }
}

module.exports = controller
