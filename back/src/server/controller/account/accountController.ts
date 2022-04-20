import {Router} from "express";
import {randomUUID} from "crypto";

// import {User} from "../../model/user/user";
// import {UserToken} from "../../model/user/token/token";

import {SzBxModel} from "../../model/szbxModel";

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
        this._router.post('/signup', async (req: any, res: any) => {
            await AccountController.postMethodSignup(req, res)
        });
    }

    /**
     * Create a new user
     * @param req request
     * @param res response
     * @returns {Promise<void>} void
     */
    private static async postMethodSignup(req: any, res: any) {
        try {
            const {username, password, email} = req.body;

            await SzBxModel.User.User.insert({
                username: username,
                password: password,
                email: email
            });

            const user = await SzBxModel.User.User.select({
                username: username,
                password: password,
                email: email
            })

            await SzBxModel.User.Token.insert({
                token: randomUUID(),
                userUuid: user[0]!.uuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            });

            res.status(200).send({
                message: 'User and UserToken created',
                content: {
                    code: "OK",
                    sqlMessage: "Create user successfully"
                }
            });
        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    sqlMessage: error?.sqlMessage,
                }
            });
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
