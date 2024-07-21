import Artist from "../models/Artist.Models.js";

export const Artistsignup = async (req, res) => {
  const { id, name, email, password, phoneno, address, city, experience, skills, gender } = req.body;
  
  try {

    const existingArtist = await Artist.findOne({ $or: [{ email }, { id }] });

    if (existingArtist) {
      return res.send("Provided email or ID already exists");
    }

    const newArtist = new Artist({
      id,
      name,
      email,
      password,
      phoneno,
      address,
      city,
      experience,
      skills,
      gender,
      avatar: req.file.filename
    });

    await newArtist.save();
    res.status(201).json("Thank you for your registration" );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred during registration");
  }
};


export const Artistlogin = async (req, res) => {
  try {
    let account_Info = req.body;
    console.log(account_Info);
    const { id, password } = account_Info;
    const artist_data = await Artist.findOne({ id: id });

    if (artist_data) {
      if (artist_data.password === password) {
        res.status(200).json({
          code: 200,
          message: "Artist login successful",
          token: artist_data.id,
        });
      } else {
        res.status(401).json({ code: 401, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ code: 404, message: "Invalid ID or Password" });
    }
  } catch (error) {
    console.error("Error logging in artist:", error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};


export const Artistprofile = async (req, res) => {
  try {
    const id = req.query.id;
    const artist_data = await Artist.findOne({ id: id });
    res.send(artist_data);
  } catch (err) {
    console.log(err);
  }
};


export const editProfile = async (req, res) => {
  try {
    const { id, name, email, phoneno, address, city, experience, skills, gender } = req.body;

    const updateDoc = {
      name,
      email,
      phoneno,
      address,
      city,
      experience,
      skills,
      gender,
    };
    const updatedArtist = await Artist.findOneAndUpdate({ id: id }, updateDoc, { new: true });

    if (!updatedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.json(updatedArtist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllArtists = async (req, res) => {
  try {
      const artists = await Artist.find();
      res.json(artists);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};


