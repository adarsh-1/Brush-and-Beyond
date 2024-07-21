import User from "../models/User.Models.js";


export const Usersignup = async (req, res) => {
  const { name, id, email, password, phoneno, city, state, address } = req.body;
  
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { id }] });

    if (existingUser) {
      return res.send("Provided email or id already exists");
    }
    const newUser = new User({
      name,
      id,
      email,
      password,
      phoneno,
      city,
      state,
      address,
    });

    await newUser.save();
    res.status(201).send("Thank you for your registration" );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred during registration");
  }
};

 
export const Userlogin = async (req, res) => {
  try {
    let account_Info = req.body;
    console.log(account_Info);
    const { id, password } = account_Info;
    const user_data = await User.findOne({ id: id });

    if (user_data) {
      if (user_data.password === password) {
        res.status(200).json({
          code: 200,
          message: "User login successful",
          token: user_data.id,
        });
      } else {
        res.status(401).json({ code: 401, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ code: 404, message: "Invalid ID or Password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};


export const Userprofile = async (req, res) => {
  try {
    const uid = req.query.id;
     console.log(`Data received from client: ${uid}`);
    const user_data = await User.findOne({ id : uid });
    console.log(user_data);
    res.send(user_data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching profile");
  }
};


export const editProfile = async (req, res) => {
  try {
    const { id, name, email, phoneno, city, address, state } = req.body;

      const updateDoc ={
        $set:{
          name: name,
          email: email,
          phoneno:phoneno,
          city: city,
          address: address,
          state: state  
        }
      };
      const filter_condition = {id : id}
      const status =await User.updateOne(filter_condition,updateDoc)
      console.log(status);
      res.send(status)
  } catch (err) {
    console.log(err);
  }
};


export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Failed to fetch user count' });
  }
};
