import * as express from "express";
import routes from './router';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';


class Server {
    private app: any;
    constructor(private config) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }

    public bootstrap() {
        this.setupRoute();
        return this.app;
    }

    public setupRoute() {
        this.app.use("/health", (req, res) => {
            res.send("I am okay")
        })
        this.app.use('/api', routes);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    }

    public run() {
        const { config: { PORT } } = this;
        this.app.listen(PORT, function (err) {
            if (err) {
                console.log("Error in server setup")
            }
            console.log("Server listening on Port", PORT);
        })
    }
}

export default Server;
