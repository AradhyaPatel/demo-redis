import { Router} from 'express';
import userRouter from './controllers/user/routes';
// import * as swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from './swagger.json';

const appRouter = Router();

// appRouter.use('/api-docs', swaggerUi.serve);
// appRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));
appRouter.use('/user',userRouter);

export default appRouter;