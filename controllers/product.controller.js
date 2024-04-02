const Category=require('../models/category.model')
const Product=require('../models/product.model')

/**
 * Controller to create a new Category
 */
exports.createNewProduct=async(req,res)=>{
    try{
        const data={
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            cost:req.body.cost
        }
        const product = await Product.create(data)
        console.log(`New Product '${product.name}' created`)
        try{
            const category=await Category.findOne({name:product.category})
            category.products.push(product.name)
            await category.save()
        }catch(err){
            console.log('Error while updating the category',err)
            return res.status(500).send({
                message:"Internal Server Error while Updating the category of the Product"
            })
        }
        res.status(201).send(product)
    }catch(err){
        console.log("Error while creating new product",err)
        res.status(500).send({
            message:"Internal Server Error while creating new product"
        })
    }
}
exports.getAllProducts=async(req,res)=>{
    try{
        queryObj={}

        if(req.query.category){
            queryObj.category=req.query.category
        }
        const products=await Product.find(queryObj)

        res.status(200).send(products)
    }catch(err){
        console.log("Error while getting all products",err.message)
        res.status(500).send({
            message:"Internal Server error while getting all products"
        })
    }
}
exports.getSingleProduct=async(req,res)=>{
    try{
        queryObj={}
        if(req.query.category){
            queryObj.category=req.query.category
        }
        const productName=req.params.product_name
        const product=await Product.findOne({name:productName,...queryObj})

        if(!product){
            return res.status(400).send({
                message:`Product ${productName} not found.`
            })
        }

        res.status(200).send(product)
    }catch(err){
        console.log(`Error while getting "${req.params.product_name}"`,err.message)
        res.status(500).send({
            message:"Internal Server Error while getting the product"
        })
    }
}