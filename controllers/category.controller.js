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