import {SkillzboxDatabaseKnex} from "./database/skillzboxDatabaseKnex";
import {SzbxController} from "./controller/szbxController";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {config} from 'dotenv';

// const rateLimit = require('express-rate-limit');

export class Server {
    private app: express.Express = express();

    constructor() {
        this.initializeServer();
    }

    private initializeServer() {
        config();
        this.app.use(cors(
            {
                origin: '*', // Temporary
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                credentials: true,
            }
        ));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.set('title', 'Skillzbox - API');
        this.initializeRoutes();
        SkillzboxDatabaseKnex.initializeDatabasePool();
    }

    private initializeRoutes() {
        this.app.use("/account", new SzbxController.AccountController().getRouter());
        // this.app.use("/user", new SzbxController.UserController().getRouter());

    }

    public run() {
        this.app.listen(process.env.PORT || 3001);
    }
}
