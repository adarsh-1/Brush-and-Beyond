import express from "express";
import {Usersignup, Userlogin, Userprofile, editProfile, getUserCount} from "../controllers/User.Controller.js"

const User_routes = express.Router();

User_routes.post("/Usersignup",Usersignup)
User_routes.post("/Userlogin",Userlogin)
User_routes.get("/Userprofile",Userprofile)
User_routes.post("/editProfile",editProfile)
User_routes.get("/getUserCount",getUserCount)
export default User_routes;