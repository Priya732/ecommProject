/**
 * POST localhost:8080/ecomm/api/v1/categories
 */

const authMw = require('../middlewares/auth.mw')

const category_controller= require('../controllers/category.controller')

module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[authMw.verifyToken,authMw.isAdmin],category_controller.createNewCategory)
    app.get('/ecomm/api/v1/categories',[authMw.verifyToken],category_controller.getAllCategories)
    app.get('/ecomm/api/v1/categories/:category_name',[authMw.verifyToken],category_controller.getSingleCategory)
    app.put('/ecomm/api/v1/categories/:category_name',[authMw.verifyToken,authMw.isAdmin],category_controller.editCategory)
    app.delete('/ecomm/api/v1/categories/:category_name',[authMw.verifyToken,authMw.isAdmin],category_controller.deleteCategory)
}