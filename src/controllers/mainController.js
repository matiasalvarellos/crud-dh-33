
// un objeto literal con las acciones para cada ruta
const mainController = {
    home: function(req, res){
        res.render("product-create-form")
    }
}   
// Acá exportamos el resultado
module.exports = mainController;