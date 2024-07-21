import express from "express"
import { addContacts, showContacts } from "../controllers/Contact.Controller.js";

const contact_routes = express.Router();

contact_routes.post("/addContact",addContacts)
contact_routes.get("/showContact",showContacts)

export default contact_routes;