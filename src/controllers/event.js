import EventModel from '../models/event';
import { apiResponse } from '../utils/response';

class Event {
  constructor() {
    this.EventModel = EventModel;
  }
  async createEvent(req, res) {
    try {
      const {
        title,
        description,
        image,
        itemsNeeded,
        numberOfParticipants,
        eventDate,
        eventLocation,
        donation,
        category,
        tokenData: { id }
      } = req.body;
      const event = await EventModel.create({
        userId: id,
        title,
        description,
        image,
        itemsNeeded: JSON.stringify(itemsNeeded),
        numberOfParticipants,
        eventDate,
        eventLocation,
        donation,
        category
      });
      return apiResponse(res, 200, null, event);
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
}

export default new Event();
