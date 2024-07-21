import express from "express"
import { addFeedback, showFeedback, getTotalFeedbackCount } from "../controllers/Feedback.Controller.js";

const feedback_routes = express.Router();

feedback_routes.post("/addFeedback",addFeedback)
feedback_routes.get("/showFeedback",showFeedback)
feedback_routes.get("/getTotalFeedbackCount",getTotalFeedbackCount)

export default feedback_routes;