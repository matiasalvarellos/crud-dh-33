const productService = require("../services/productServices");

const controller = {
    list: function(req, res){
        const products = productService.findAll()
        res.render("menu-products", {products: products})
    },
    detail: function(req, res){
        const product = productService.findByPk(req.params.id);
        res.render("product-detail", {product: product});
    },
    create: function(req, res){
        res.render("product-create-form");
    },
    store: function(req, res){
        productService.create(req.body);
        res.redirect("/products/list");
    },
    edit: function( req, res ){
        const productFound = productService.findByPk(req.params.id);
        res.render("product-update-form", {product: productFound});
    },
    update: function( req, res ){
        productService.update(req.body, req.params.id);
        res.redirect("/products/list");
    },
    destroy: function( req, res ){
        productService.destroy(req.params.id);
        res.redirect("/products/list");
    }
}

module.exports = controller;