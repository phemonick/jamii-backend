import EnrolledEvents from '../models/enrolledEvent';
import Event from '../models/event';
import { apiResponse } from '../utils/response';

export default class EnrolledEvent {
  static async enroll(req, res) {
    try {
      const { tokenData: { id } } = req.headers;
      const { eventId } = req.body;
      const enrolled = await EnrolledEvent.findOne({userId: id})
      if (enrolled) {
        return apiResponse(res, 409, 'Already Enrolled', null);
      }
      const enrolledEvent = await EnrolledEvents.create({
        eventId,
        userId: id
      });
      return apiResponse(res, 201, null, enrolledEvent)
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }

  static async optOut(req, res) {
    try {
      const { tokenData: { id } } = req.headers;
      const enrolled = await EnrolledEvent.findOneAndDelete({userId: id})
      return apiResponse(res, 200, null, {message: "ypu have opted out of this event"})
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
}