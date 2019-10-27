import EventModel from '../models/event';
import { apiResponse } from '../utils/response';

class Event {
  constructor() {
    this.EventModel = EventModel;
  }
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} event
   */
  async createEvent(req, res) {
    const {
      tokenData: { id }
    } = req.headers;
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
        category
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
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} event
   */
  async getEvent(req, res) {
    try {
      const { id } = req.params;
      const event = await EventModel.findById(id);
      if (!event) {
        return apiResponse(res, 404, 'Event does not exist', null);
      }
      event.itemsNeeded = JSON.parse(event.itemsNeeded);
      return apiResponse(res, 200, null, event);
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} events
   */
  async getEventsByCategory(req, res) {
    try {
      const { category } = req.params;
      const events = await EventModel.find({
        category
      });
      if (!events) {
        return apiResponse(res, 404, 'No event found', null);
      }
      const parsedEvent = events.map(event => {
        event.itemsNeeded = JSON.parse(event.itemsNeeded);
        return event;
      });
      return apiResponse(res, 200, null, parsedEvent);
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} events
   */
  async getAllEvents(req, res) {
    try {
      const events = await EventModel.find();
      if (!events) {
        return apiResponse(res, 404, 'No event found', null);
      }
      const parsedEvent = events.map(event => {
        event.itemsNeeded = JSON.parse(event.itemsNeeded);
        return event;
      });
      return apiResponse(res, 200, null, parsedEvent);
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} event
   */
  async editEvent(req, res) {
    try {
      const { id: userId } = req.header.tokenData;
      const { id } = req.params;
      const event = await EventModel.findOneAndUpdate(
        { _id: id, userId },
        {
          ...req.body
        },
        { new: true }
      );
      if (!event) {
        return apiResponse(res, 404, 'The event does not exist', event);
      }
      return apiResponse(res, 200, null, event);
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} event
   */
  async deleteEvent(req, res) {
    try {
      const { id: userId } = req.header.tokenData;
      const { id } = req.params;
      const event = await EventModel.findOneAndDelete({ _id: id, userId });
      if (!event) {
        return apiResponse(
          res,
          404,
          'The event does not exist or has been deleted already',
          null
        );
      }
      return apiResponse(res, 200, 'Event deleted successfully', event);
    } catch (error) {
      return apiResponse(res, 500, 'Internal server error', null);
    }
  }
}

export default new Event();
