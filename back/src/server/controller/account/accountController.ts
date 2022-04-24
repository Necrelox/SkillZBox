import {AccountUtils} from "./utils/accountUtils";

import {Router} from "express";

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
            super.checkPostContainMailANDUserANDPassword(req.body)
            await super.createUser(req.body)


            //
            // const user = await SzBxModel.User.User.select({
            //     username: username,
            //     password: password,
            //     email: email
            // })
            //
            // await SzBxModel.User.Token.insert({
            //     token: randomUUID(),
            //     userUuid: user[0]!.uuid,
            //     expireAt: new Date(Date.now() + (1000 * 60 * 60))
            // });

            // await SzbxTools.Mailer.sendMail({
            //     from: process.env['EMAIL_AUTH_USER'],
            //     to: 'fesgsgd@gmail.com',
            //     subject: 'Sending Email using Node.js',
            //     text: 'That was easy!'
            // });

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User and Token created successfully.'
                }
            });
        } catch (error: any) {
            console.log(error);
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
