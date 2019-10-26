import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    username: user.fullName,
    location: user.location,
  }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
}

export const verifyToken = () => {

}