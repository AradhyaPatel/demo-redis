import  { Router } from 'express';
import UserController from './controller';

const userRouter  = Router();

userRouter.route('/get')
.get(UserController.get);

userRouter.route('/create').post(UserController.create)

userRouter.route('/update').patch(UserController.update)

userRouter.route('/delete').delete(UserController.delete)


export default userRouter;