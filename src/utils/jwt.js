import jwt from 'jsonwebtoken';
import { apiResponse } from '../utils/response';

export const signToken = user => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.fullName,
      location: user.location
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization || req.body.token || req.params.token;
    if (!token) {
      return apiResponse(
        res,
        401,
        'Please signup or login to provide a token',
        null
      );
    }
    const tokenData = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('tokenData', tokenData);
    req.body.tokenData = tokenData;
    return next();
  } catch (error) {
    return apiResponse(res, 500, 'Internal sevrer error', null);
  }
};
