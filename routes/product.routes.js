const productController=require('../controllers/product.controller')
const authMw=require('../middlewares/auth.mw')

module.exports=(app)=>{
    app.post('/ecomm/api/v1/products',[authMw.verifyToken,authMw.isAdmin],productController.createNewProduct)
    app.get('/ecomm/api/v1/products',[authMw.verifyToken],productController.getAllProducts)
    app.get('/ecomm/api/v1/products/:product_name',[authMw.verifyToken],productController.getSingleProduct)

}