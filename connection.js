import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();//

const dbURL = process.env.Mongo_URL;

export const connection= mongoose.connect(dbURL, {useUnifiedTopology: true, useNewUrlParser: true});