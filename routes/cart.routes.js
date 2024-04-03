const cartController=require('../controllers/cart.controller')
const authMw=require('../middlewares/auth.mw')

module.exports=(app)=>{
    app.post('/ecomm/api/v1/carts',[authMw.verifyToken],cartController.createNewCart)
    app.put('/ecomm/api/v1/carts/:id',[authMw.verifyToken],cartController.updateCart)
}