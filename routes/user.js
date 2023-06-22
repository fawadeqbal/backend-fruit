import express from "express";
import { postUser, getUser } from "../controller/user.js";

const router = express.Router();

router.post("/",postUser);
router.get("/",getUser);

export default router;
