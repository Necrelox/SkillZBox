import {Router} from "express";
import {User} from "server/model/user/user";

export class AccountController {
    private _router = Router();

    constructor() {
        this._initializeAccountController()
    }

    /**
     * Initialize the account controller
     * @returns {Promise<void>} void
     */
    private _initializeAccountController() {
        this._router.post('/signup', (req: any, res: any) => { AccountController.getMethodSignup(req, res) });
    }

    /**
     * Create a new user
     * @param req request
     * @param res response
     * @returns {Promise<void>} void
     */
    private static postMethodSignup(req: any, res: any) {
        try {
            const { username, password, email } = req.body;
            const user = new User();

            res.status(200).send({ message: "Account created" });
        } catch (error) {
            res.status(500).send({ message: "Error creating account" });
        }
    }

    /**
     * Return the router
     * @returns {Router} router
     */
    public getRouter() {
        return this._router;
    }

}
