import Contact from "../models/Contact.Models.js";

export const addContacts = async (req, res) => {
  const { name, email, phoneno, query } = req.body;
  
  try {
    const contactDoc = new Contact({
      name,
      email,
      phoneno,
      query,
    });
    await contactDoc.save();
    res.status(200).send("Thank you for contacting us");
  } catch (error) {
    console.error("Error occurred while adding contact:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const showContacts = async (req, res) => {
    try {
      const contactData = await Contact.find();
      if (contactData.length > 0) {
        res.status(200).send(contactData);
      } else {
        res.status(404).send({ message: "No contacts found" });
      }
    } catch (error) {
      console.error("Error occurred while fetching contacts:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
