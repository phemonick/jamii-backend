import userRoute from './user'

const api = '/api/';

export default (app) => {
  app.use(api, userRoute)
} 