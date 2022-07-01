import * as express from "express";
import routes from './router';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';


class Server {
    private application: any;
    constructor() {
        this.application = express();
        this.application.use(express.json());
        this.application.use(express.urlencoded());
    }

    public bootstrap() {
        this.setupRoute(); 
        return this.application;
    }

    public setupRoute() {
        this.application.use('/api', routes);
        this.application.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    }

    public run() {     
        this.application.listen(9000, function (err) {
            if (err) {
                console.log("Error in server setup")
            }
            console.log("Server listening on Port", 9000);
        })
    }
}

export default Server;
