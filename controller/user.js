import {userModel} from "../model/userModel.js";


export const postUser = async(req,res)=>{
    try{
        const {userName,email, password}  = req.body
        const user={
            userName:userName,
            email:email,
            password:password
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