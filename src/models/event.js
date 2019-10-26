import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  eventDate: { type: String, required: true },
  eventLocation: { type: String, required: true },
  neededDonation: { type: Number, default: 0 },
  numberOfParticipants: { type: Number, default: 0 },
  itemsNeeded: { type: String, required: true },
  category: { type: String, required: true }
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
