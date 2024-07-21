import Feedback from "../models/Feedback.Model.js";

export const addFeedback = async (req, res) => {
  const { name, email, query } = req.body;

  try {
    const feedbackDoc = new Feedback({ name, email, query });
    await feedbackDoc.save();
    res.status(200).send("Thank you for your feedback");
  } catch (error) {
    console.error("Error occurred while saving feedback:", error);
    res.status(500).send("An error occurred while saving feedback");
  }
};


export const showFeedback = async (req, res) => {
    try {
      const feedbackData = await Feedback.find();
      
      if (feedbackData.length > 0) {
        res.status(200).json(feedbackData);
      } else {
        res.status(404).send("No feedback found");
      }
    } catch (error) {
      console.error("Error occurred while fetching feedback:", error);
      res.status(500).send("Internal Server Error");
    }
  };


  export const getTotalFeedbackCount = async (req, res) => {
    try {
      const totalFeedbacks = await Feedback.countDocuments();
  
      res.json({ count: totalFeedbacks });
    } catch (error) {
      console.error('Error fetching total feedback count:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };