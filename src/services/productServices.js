const req = require("express/lib/request");
const fs = require("fs");
const path = require("path")

const service = {
    file: "../data/products.json",
    readFile: function(){
        return fs.readFileSync(path.join(__dirname, this.file), "utf-8")
    },
    writeFile: function(array){
        let dataToString = JSON.stringify(array, null, 4)
        fs.writeFileSync(path.join(__dirname, this.file), dataToString);
    },
    findAll: function(){
        return JSON.parse(this.readFile())
    },
    findByPk: function(id){

        const products = this.findAll()
        let productFound = products.find(function(product){
            return product.id == id
        })
        return productFound;
    },
    create: function(payload){
        let products = this.findAll()
        let product = {
            ...payload,
            id: products.length + 1
        }
        products.push(product)
        this.writeFile(products)
    },
    update: function(payload, id){
        const products = this.findAll()
        
        let productsUpdate = products.map(function(product){
            if(product.id == id){
                return {
                    id: product.id,
                    ...payload,
                }
            }
            return product
        })
        this.writeFile(productsUpdate);
    },
    destroy: function(id){
        let products = this.findAll();

        let productIndex = products.findIndex((product)=>{
            return product.id == id
        })

        products.splice(productIndex, 1);

        this.writeFile(products);
    }
}

module.exports = service