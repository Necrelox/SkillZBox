import {SkillzboxDatabaseKnex} from "./database/skillzboxDatabaseKnex";
import {SzbxController} from "./controller/szbxController";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {config} from 'dotenv';

// const rateLimit = require('express-rate-limit');

export class Server {
    private _app: express.Express = express();

    constructor() {
        this._initializeServer();
    }

    private _initializeServer() {
        config();
        this._app.use(cors(
            {
                origin: '*', // Temporary
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                credentials: true,
            }
        ));
        this._app.use(helmet());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }));
        this._app.use("/account", new SzbxController.AccountController().getRouter());
        SkillzboxDatabaseKnex.initializeDatabasePool();
    }

    public run() {
        this._app.listen(process.env.PORT || 3001);
    }
}
