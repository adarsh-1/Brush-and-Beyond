import express from "express";
import { Adminlogin } from "../controllers/Admin.Controller.js";


const admin_routes = express.Router();


admin_routes.post("/adminlogin", Adminlogin);


export default admin_routes;
