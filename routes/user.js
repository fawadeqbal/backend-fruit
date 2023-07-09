import express from "express";
import { postUser, getUser, loginUser,decodeToken } from "../controller/user.js";

const router = express.Router();

router.post("/register", postUser);
router.post("/login", loginUser);
router.get("/", getUser);
router.post("/decodeToken",decodeToken);
export default router;
