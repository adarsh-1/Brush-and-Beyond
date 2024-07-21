import Mongoose from "mongoose";
const EventsSchema = new Mongoose.Schema({
    eventName: {
        type: String,
        required: true
      },
      eventVenue: {
        type: String,
        required: true
      },
      eventDescription: {
        type: String,
        required: true
      },
      eventOrganiser: {
        type: String,
        required: true
      },
      eventDateTime: {
        type: Date,
        required: true
      }
})
const Event= Mongoose.model("Event",EventsSchema)
export default Event;