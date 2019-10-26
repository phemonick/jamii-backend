import userRoute from './user';
import eventRoute from './event';

const api = '/api/';

export default app => {
  app.use(api, userRoute);
  app.use(api, eventRoute);
};
