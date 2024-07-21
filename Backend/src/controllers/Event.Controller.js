import Event from "../models/Events.Models.js";

export const addEvents = async (req, res) => {
  const { eventName, eventVenue, eventDescription, eventOrganiser, eventDateTime } = req.body;

  try {
    const event = new Event({
      eventName,
      eventVenue,
      eventDescription,
      eventOrganiser,
      eventDateTime
    });

    await event.save();
    res.status(201).send("Event Post Successfully");
  } catch (error) {
    console.error("Error occurred while adding event details:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const showEvents = async (req, res) => {
    try {
      const eventsData = await Event.find();
      if (eventsData.length > 0) {
        res.send(eventsData);
      } else {
        res.status(404).send("No events details available");
      }
    } catch (error) {
      console.error("Error occurred while fetching announcements:", error);
      res.status(500).send("Internal Server Error");
    }
  };


  export const countUpcomingEvents = async (req, res) => {
    try {
      const currentDate = new Date();
  
      const upcomingEventCount = await Event.countDocuments({ eventDateTime: { $gt: currentDate } });
  
      res.status(200).json({ count: upcomingEventCount });
    } catch (error) {
      console.error('Error counting upcoming events:', error);
      res.status(500).json({ message: 'Failed to count upcoming events' });
    }
  };