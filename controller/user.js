
import {userModel} from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();


export const postUser = async(req,res)=>{
    try{      

        const {userName,email, password}  = req.body;

        
        const userExsist = await userModel.findOne({email: email});
        if(userExsist){
            res.status(402).json({error:"User Already Exsists "});
        }
       
        const salt = await bcrypt.genSalt();//default value is 10
        const hashedPassword = await bcrypt.hash(password,salt);

        const user={
            userName:userName,
            email:email,
            password:hashedPassword
        }
       
        const newUser = new userModel(user);

        await newUser.save()
        console.log("new User is : ",newUser);
    }catch(e){
        console.log("Error in the Post User  : ", e);
    }
}


export const getUser = async (req,res)=>{
    try{
        const user =await userModel.find() 
        res.json(user);
        console.log("i am in getUser: ",user);
     }
     catch(e){
 
         console.log("Error in the get User", e);
     }
}


export const loginUser = async(req,res)=>{
try{
    const{email, password} = req.body;

    if(!email || !password){
        return res.this.status(400).json({error:"Plz fill the form"});
    }

    const userLogin = await userModel.findOne({email: email});


    console.log("in LoginUser Controller", userLogin);

    if(!userLogin)
    {
        res.status(400).json({error: "Invalid Credentials"});
    }
    else{
        const isMatch = await bcrypt.compare(password, userLogin.password);
        // jwt token
           
        if(isMatch){
            const token = jwt.sign({email: userLogin.email}, process.env.SECRETE_KEY);
            // const token = userLogin.generateAuthToken();
            
            res.cookie("jwt_token",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            res.json({message:"user Login Successfull", user: token})
        }
        else{
            res.status(400).json({error: "Invalid Credentials", user: false});
        }
        
    }
   

}catch(err){
    console.log(err)
}

}






    export const decodeToken = async(req,res)=>{
        const token=req.header['x-access-token'];
        try{
            const decoded = jwt.verify(token,process.env.SECRETE_KEY);
            const email = decoded.email;
            const user = await userModel.findOne({email : email});
            return res.json({message:"OK", user:user});  
        }catch(err){
            console.log(err)
            res.json({message:"Error", error:"invalid token"})
        }
    }
