
import { productModel } from "../model/productModel.js";


export const getProduct = async (req,res)=>{
    try{
       const Items =await productModel.find() 
       res.json(Items);
    //    console.log(Items);
    }
    catch(e){

        console.log("Error in the get Product", e);
    }
   
    
}



export const postProduct = async (req,res)=>{
    try{
    const {name, price, stock, category, qty, popular}=req.body;
    const image = req.file.filename;
    const product={
        name: name,
        qty: qty,
        popular: popular,
        image: image,
        category : category,
        price : parseInt(price),
        stock: parseInt(stock)
        
    }
    
  const newItem= new productModel(product);
  
  const savedItem = await newItem.save();// Product saved 

  
    }
    catch(e){
        console.log("Error during saving the item is : ",e);
    }
}





export const putProduct=()=>{}



export  const deleteProduct= async (req,res)=>{
    console.log(req.params.id);
    try {
        await forminsertdata.findByIdAndDelete(req.params.id);
    } catch (error) {
        console.log(error); 
    }
    
    }
