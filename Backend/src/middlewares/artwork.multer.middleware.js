import exp from "constants";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads/artworks",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadartwork = multer({
  storage: storage,
}).single("image");
export default uploadartwork;
