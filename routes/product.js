import express from "express";
import { getProduct, postProduct, putProduct,deleteProduct } from "../controller/product.js";
import { imageUpload } from "../ImageUpload/imageUpload.js";

const router = express.Router();

router.get("/",getProduct);
router.post("/",imageUpload.single("image"),postProduct);
router.put("/",putProduct);
router.delete("/:id",deleteProduct);

export default router;



//get, post, put, delete