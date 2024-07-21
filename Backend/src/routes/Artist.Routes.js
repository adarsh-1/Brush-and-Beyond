import express from "express";
import {Artistlogin, Artistsignup, Artistprofile, editProfile, getAllArtists} from "../controllers/Artist.Controller.js"
import uploadavatar from "../middlewares/avatar.multer.middleware.js";
const artist_routes = express.Router();

artist_routes.post("/Artistsignup",uploadavatar,Artistsignup)
artist_routes.post("/Artistlogin",Artistlogin)
artist_routes.get("/Artistprofile",Artistprofile)
artist_routes.post("/editProfile",editProfile)
artist_routes.get("/getAllArtists",getAllArtists)

export default artist_routes;