const Category=require('../models/category.model')
const Product=require('../models/product.model')
const Cart=require('../models/cart.model')

exports.createNewCart=async(req,res)=>{
    try{
        const cart=await Cart.create({})
        console.log(`New Cart '${cart._id} created'`)
        res.status(201).send(cart)
    }catch(err){
        console.log('Error WHile Creating the cart',err)
        res.status(500).send({
            message:"Internal Server Error while Creating the cart"
        })
    }
}
exports.updateCart=async(req,res)=>{
    try{
        const cart=await Cart.findOne({_id:req.params.id})
        cart.products=req.body.products ? req.body.products:cart.products

        if(cart.products){
            let cost=0
            for (p of cart.products){
                console.log(p)
                prod=await Product.findOne({name:p})
                console.log(prod.cost)
                cost+=prod.cost
            }
            console.log(cost)
            cart.total_cost=cost
        }
        updated_cart= await cart.save()
        console.log(`Cart '${cart._id}' updated`)
        res.status(200).send(cart)
    }catch(err){
        console.log('Error while updating the cart ',err)
        res.status(500).send({
            message:"Internal Server Error while updating the cart"
        })
    }
}
exports.getallCart=async(req,res)=>{
    try{
        const cart=await Cart.find({_id:req.params.id})
        res.status(200).send(cart)
    }catch(err){
        console.log("Error while getting cart details.",err)
        res.status(500).send({
            message:"Internal Server Error While getting the cart details."
        })
    }
}