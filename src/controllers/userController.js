import bcrypt from 'bcrypt';
import User from '../models/user';
import {apiResponse} from '../utils/response';
import {signToken} from '../utils/jwt'

export default class UserController {
  static async register(req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return apiResponse(res, 400, 'Email Exist', null)
      }
      const user = new User();
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.password = bcrypt.hashSync(req.body.password, 10);
      user.location = req.body.location;

      
      const newUser = await user.save()
      const token = signToken(newUser);
      return apiResponse(res, 201, null, {newUser, token})
    } catch (error) {
      return apiResponse(res, 500, error.message, null)
    }
  }

  static async login (req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (!existingUser || !bcrypt.compareSync(req.body.password, existingUser.password)) {
        return apiResponse(res, 404, 'User Not Found', null)
      }
      const token = signToken(existingUser);
      const payload = { message: 'Auth successful', token}
      return apiResponse(res, 200, null, payload)
    } catch (error) {
      return apiResponse(res, 500, error.message, null)
    }
  }
}