const category_model=require('../models/category.model')
/**
 * Controller for creating the category
 */

exports.createNewCategory=async (req,res)=>{
    //Read the request body

    //Create the category object
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }
    try{
        //Insert into mongodb
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log('Error while creating the category',err)
        res.status(500).send({
            message:"Error while creating the category"
        })
    }

    
    
    //return the response of the created category
}
exports.getAllCategories=async(req,res)=>{
    try{
        const categories=await category_model.find()

        res.status(200).send(categories)
    }
    catch(err){
        console.log('Error While getting all categories',err.message)
        res.status(500).send({
            message:'Internal Server Error while getting all categories'
        })
    }
}

// return the response of single category
exports.getSingleCategory=async(req,res)=>{
    try{
        const category=await category_model.find({name:req.params.category_name})
        res.status(200).send(category)
    }
    catch(err){
        console.log(`Error while getting the category with name=${req.params.category_name}`,err.message)
        res.status(500).send({
            message:"Internal Server Error while getting the category"
        })    
    }
}

//Updating a category
exports.editCategory=async(req,res)=>{
    try{
        const category=await category_model.findOne({name:req.params.category_name})

        if(!category){
            return res.status(404).send({
                message:"Category not found"
            })
        }

        category.name=req.body.name? req.body.name:category.name
        category.description=req.body.description ? req.body.description:category.description

        console.log(category)

        const updatedCategory=await category.save()
        console.log(`Category ${updatedCategory.name} data pushed`)
        res.status(200).send(updatedCategory)

    }
    catch(err){
        console.log("Error while updating category data",err.message)
        res.status(500).send({
            message:"Internal server error while updating category data"
        })
    }
}

// Deleting a Category
exports.deleteCategory=async(req,res)=>{
    try{
        const category=await category_model.findOne({name:req.params.category_name})
        if (!category){
            return res.status(404).send({
                message:"Category not found"
            })
        }
        await category_model.deleteOne({name:req.params.category_name})
        console.log(`Category ${category.name} deleted succefully`)
        res.status(200).send({message:"category deleted succfully"})
    }
    catch(err){
        console.log('Error while deleting category',err.message)
        req.status(500).send({
            message:"Internal Server Error While Deleting the category"
        })
    }
}