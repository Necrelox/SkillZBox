class Exemple {
    #router;

    constructor() {
        this.#router = require("express").Router();
        this.#initializeExempleRoad()
    }

    getRouter() {
        return this.#router;
    }

    #initializeExempleRoad() {
        this.#router.get('/', (req, res) => { this.#helloWorld(req, res) });
    }

    #helloWorld(req, res) {
        res.status(200).json({
            message: "Hello World"
        });
    }

}

module.exports = Exemple;

