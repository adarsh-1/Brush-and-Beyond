import express from "express"
import { AddArtworks, ShowArtworks, ShowArtworksByArtistId, getArtworkById } from "../controllers/Artwork.Controller.js";
import uploadartwork from "../middlewares/artwork.multer.middleware.js";


const artwork_routes = express.Router();

artwork_routes.post("/addArtworks",uploadartwork,AddArtworks)
artwork_routes.get("/showArtworks",ShowArtworks)
artwork_routes.get("/ShowArtworksByArtistId",ShowArtworksByArtistId)
artwork_routes.get("/:id",getArtworkById)

export default artwork_routes;