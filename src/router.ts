import { Router} from 'express';
import userRouter from './controllers/user/routes';


const appRouter = Router();

appRouter.use('/user',userRouter);

export default appRouter;