import {AccountUtils} from "./utils/accountUtils";

import {Router} from "express";
import {SzbxTools} from "../../tools/szbxTools";

export class AccountController extends AccountUtils{
    private _router = Router();

    constructor() {
        super();
        this._initializeAccountController();
    }

    private _initializeAccountController() {
        this._router.post('/signup', async (req: any, res: any) => {
            await this.postMethodSignup(req, res);
        });
        this._router.post('/verify', async (req: any, res: any) => {
            await this.postMethodVerify(req, res);
        });
        this._router.post('/login', async (req: any, res: any) => {
            await this.postMethodLogin(req, res);
        });
    }

    private async postMethodSignup(req: any, res: any) {
        try {
            super.checkPostContainMailANDUserANDPassword(req.body);
            SzbxTools.Mailer.emailHasBadSyntaxe(req.body.email);
            SzbxTools.Mailer.emailIsTemporary(req.body.email);
            await super.createUser(req.body);
            await super.createToken({email: req.body.email, username: req.body.username});
            await super.sendEmailVerification({email: req.body.email});

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

    private async postMethodVerify(req: any, res: any) {
        try {
            const code = req.body.code;
            await super.verifyTokenSignature(code);
            await super.verifyTokenExpiration(code);
            await super.verifyUser(code);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User verified successfully.'
                }
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).send({
                content: {
                    code: error?.code,
                    error: error,
                }
            });
        }
    }

    public getRouter() {
        return this._router;
    }

    private async postMethodLogin(req: any, res: any) {
        try {
            super.checkPostContainMailORUserANDPassword(req.body);
            await super.verifyLogin({
                email: req.body.email || null,
                username: req.body.username || null,
                password: req.body.password
            });


            // select le user
            // check if user is verified
            // delete old token
            // create new token
            // send token

        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    sqlMessage: error?.sqlMessage,
                }
            });
        }
    }

}

