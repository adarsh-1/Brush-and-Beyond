
import AdminModel from "../models/Admin.Models.js";


export const Adminlogin = async (req, res) => {
  try {
    const { admin_id, admin_pass } = req.body;
    const admin_data = await AdminModel.findOne({ admin_id });

    if (admin_data) {
      if (admin_data.admin_pass === admin_pass) {
        res.status(200).json({
          code: 200,
          message: "Admin login successful",
          token: admin_data.admin_id,
        });
      } else {
        res.status(401).json({ code: 401, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ code: 404, message: "Invalid id or password" });
    }
  } catch (err) {
    console.error("Error logging in admin:", err);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};


