import express from 'express';
import event from '../controllers/event';
import { verifyToken } from '../utils/jwt';

const eventRouter = express.Router();
eventRouter.post('/event', verifyToken, event.createEvent);

export default eventRouter;
