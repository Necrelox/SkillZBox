import {AccountUtils} from "./utils/accountUtils";

import {Router, IRouter, Request, Response} from "express";
import {SzbxTools} from "../../tools/szbxTools";
import {SzBxModel} from "../../model/szbxModel";
import {ErrorController} from "../interface/ErrorController";

export class AccountController extends AccountUtils{
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.post('/signup', async (req: Request, res: Response) => {
            await this.postMethodSignup(req, res);
        });
        this._router.post('/verify', async (req: Request, res: Response) => {
            await this.postMethodVerify(req, res);
        });
        this._router.post('/login', async (req: Request, res: Response) => {
            await this.postMethodLogin(req, res);
        });
        this._router.post('/login-cli', async (req: Request, res: Response) => {
            await this.postMethodLoginCli(req, res);
        });
    }

    private async postMethodSignup(req: Request, res: Response) {
        try {
            await super.checkPostContainMailANDUserANDPassword(req.body);
            SzbxTools.Mailer.emailHasBadSyntaxe(req.body.email);
            SzbxTools.Mailer.emailIsTemporary(req.body.email);
            await super.checkSyntaxeUsername(req.body.username);
            await super.createUser({
                email: req.body.email,
                username: req.body.username,
                password: SzbxTools.PasswordEncrypt.encrypt(req.body.password)
            });
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
                    message: error?.message
                }
            });
        }
    }

    private async postMethodVerify(req: Request, res: Response) {
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
            res.status(500).send({
                content: {
                    code: error?.code,
                    message: error?.message,
                }
            });
        }
    }

    private async postMethodLogin(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            const searchUser: SzBxModel.User.IModelUser = await super.createSearchUserWithPostBody(req.body);

            await super.verifyLogin(searchUser, req.body.password);
            await super.verifyIfBlacklisted(searchUser);
            await super.updateUserIsConnected(searchUser);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: !'User logged successfully.',
                    token : (await super.createTokenAndReturn(searchUser))![0]!.token
                }
            });

        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    message: error?.message,
                }
            });
        }
    }

    private async postMethodLoginCli(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            await super.checkPostContainIpANDMacAddressANDDeviceType(req.body);
            const searchUser: SzBxModel.User.IModelUser = await super.createSearchUserWithPostBody(req.body);
            await super.verifyLogin(searchUser, req.body.password);
            await super.verifyIfBlacklisted(searchUser);
            await super.addNewIpOrUpdate(searchUser, req.body.ip);
            await super.addNewMacAddressOrUpdate(searchUser, req.body.macAddress);
            await super.addNewDeviceOrUpdate(searchUser, req.body.deviceType);
            await super.updateUserIsConnected(searchUser);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User logged successfully.',
                    token : (await super.createTokenAndReturn(searchUser))[0]!.token!
                }
            });

        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    message: error?.message,
                }
            });
        }
    }

    public getRouter() {
        return this._router;
    }
}

