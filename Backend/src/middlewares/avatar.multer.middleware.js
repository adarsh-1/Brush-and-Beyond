// import exp from "constants";
import multer from "multer";
// import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads/avatars",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadavatar = multer({
  storage: storage,
}).single("avatar");
export default uploadavatar;
