const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();

const ExempleController = require('./controller/exemple');

class Server {
    #app = express();
    #exempleController = new ExempleController();
    #port = process.env.PORT || 3000;
    init = false;
    runned = false;

    constructor() {
        this.#initializeServer();
    }

    getApp() {
        return this.#app;
    }

    #initializeServer() {
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: false }));
        this.#app.use(logger('dev'));
        this.#app.use(cookieParser());
        this.#app.use(helmet());
        this.init = true;
    }

    run() {
        this.#app.listen(this.#port, () => {
            console.log("\x1b[31m", "Server is running on port " + this.#port + "\x1b[0m");
        })
        this.#app.use("/", this.#exempleController.getRouter());
        this.runned = true;
    }
}

module.exports = Server;
