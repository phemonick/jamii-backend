import express from 'express';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/users', userController.register);
userRouter.post('/users/login', userController.login);

export default userRouter;
