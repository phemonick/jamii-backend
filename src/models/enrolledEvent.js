import mongoose, { Schema } from 'mongoose';

const EnrolledEventSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const EnrolledEvent = mongoose.model('EnrolledEvent', EnrolledEventSchema);
export default EnrolledEvent;