/**
 * POST localhost:8080/ecomm/api/v1/categories
 */

const authMw = require('../middlewares/auth.mw')

const category_controller= require('../controllers/category.controller')

module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[authMw.verifyToken,authMw.isAdmin],category_controller.createNewCategory)
}