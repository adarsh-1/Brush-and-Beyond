import express from "express"
import {saveCheckoutDetails, getUserCheckoutData, getAllCheckouts} from "../controllers/Checkout.Controller.js";

const checkout_routes = express.Router();

checkout_routes.post("/saveCheckout",saveCheckoutDetails)
checkout_routes.get("/getUserCheckoutData/:userId",getUserCheckoutData)
checkout_routes.get("/getAllCheckouts",getAllCheckouts)

export default checkout_routes;