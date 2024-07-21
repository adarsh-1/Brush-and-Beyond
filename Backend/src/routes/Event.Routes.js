import express from "express"
import { addEvents, showEvents, countUpcomingEvents } from "../controllers/Event.Controller.js";

const event_routes = express.Router();

event_routes.post("/addEvent",addEvents)
event_routes.get("/showEvent",showEvents)
event_routes.get("/countUpcomingEvents",countUpcomingEvents)

export default event_routes;