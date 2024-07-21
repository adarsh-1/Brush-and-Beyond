import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

//routes import
import admin_routes from "./routes/Admin.Routes.js";
import artist_routes from "./routes/Artist.Routes.js";
import User_routes from "./routes/User.Routes.js";
import artwork_routes from "./routes/Artwork.Routes.js";
import feedback_routes from "./routes/Feedback.Routes.js";
import event_routes from "./routes/Event.Routes.js";
import contact_routes from "./routes/Contact.Routes.js";
import checkout_routes from "./routes/Checkout.Routes.js"




//routes declaration
app.use("/admin", admin_routes);
app.use("/artist", artist_routes)
app.use("/User", User_routes)
app.use("/artwork", artwork_routes)
app.use("/feedback", feedback_routes)
app.use("/event", event_routes)
app.use("/contact", contact_routes)
app.use("/checkout", checkout_routes)




export { app }
// http://localhost:4000/