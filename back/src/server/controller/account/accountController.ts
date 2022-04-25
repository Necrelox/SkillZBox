import {AccountUtils} from "./utils/accountUtils";

import {Router} from "express";
import {SzbxTools} from "../../tools/szbxTools";

export class AccountController extends AccountUtils{
    private _router = Router();

    constructor() {
        super();
        this._initializeAccountController()
    }

    private _initializeAccountController() {
        this._router.post('/signup', async (req: any, res: any) => {
            await this.postMethodSignup(req, res)
        });
        this._router.post('/verify', async (req: any, res: any) => {
            await this.postMethodVerify(req, res)
        });
    }

    private async postMethodSignup(req: any, res: any) {
        try {
            console.log(req.body);
            super.checkPostContainMailANDUserANDPassword(req.body);
            SzbxTools.Mailer.emailHasBadSyntaxe(req.body.email);
            SzbxTools.Mailer.emailIsTemporary(req.body.email);
            await super.createUser(req.body);
            await super.createToken(req.body);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User and Token created successfully.'
                }
            });
        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    error: error
                }
            });
        }
    }

    private async postMethodVerify(_req: any, res: any) {
        try {
            // const {code} = req.body;


        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    sqlMessage: error?.sqlMessage,
                }
            });
        }
    }

    public getRouter() {
        return this._router;
    }

}
