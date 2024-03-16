/**
 * I need to write the controller /logic to register the user
 */
const bcrypt=require('bcryptjs')
const user_Model=require('../models/user.model')
const jwt=require('jsonwebtoken')
const secret=require('../configs/auth.config')
exports.signup = async (req,res)=>{
    /**
     * logic to create the user
     */
    //1.Read the request body
    const request_body=req.body
    //2.Insert the data in the users collection in MongoDB
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }
    try{
        const user_created=await user_Model.create(userObj)

        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            crestedAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
        res.status(201).send(res_obj)
    }catch(err){
        console.log('Error while registering user',err)
        res.status(500).send({
            messsage:'Some Error happend while registering the user'
        })
    }
}

exports.signin=async (req,res)=>{

    //Check if the userId is present in the system
    const user=await user_Model.findOne({userId:req.body.userId})
    if(user==null){
        return res.status(400).send({
            messsage:"User id passed is not a valid user id"
        })
    }


    //Password is correct
    const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
    if(!isPasswordValid){
        return res.status(401).send({
            messsage:"Wrong Password Passed"
        })
    }

    //using Jwt we will create the access token with given TTL and return
    const token=jwt.sign({id:user.userId},secret.secret,{
        expiresIn:120
    })
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token
    })
}