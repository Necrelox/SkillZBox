import {AccountUtils} from "./utils/accountUtils";

import {Router, IRouter} from "express";
import {SzbxTools} from "../../tools/szbxTools";
import {SzBxModel} from "../../model/szbxModel";

export class AccountController extends AccountUtils{
    private _router: IRouter = Router();

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
        this._router.post('/login-cli', async (req: any, res: any) => {
            await this.postMethodLoginCli(req, res);
        });
    }

    private async postMethodSignup(req: any, res: any) {
        try {
            await super.checkPostContainMailANDUserANDPassword(req.body);
            SzbxTools.Mailer.emailHasBadSyntaxe(req.body.email);
            SzbxTools.Mailer.emailIsTemporary(req.body.email);
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
                    error
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
            res.status(500).send({
                content: {
                    code: error?.code,
                    error,
                }
            });
        }
    }

    private async postMethodLogin(req: any, res: any) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            const searchUser: SzBxModel.User.IModelUser = await super.createSearchUserWithPostBody(req.body);

            await super.verifyLogin(searchUser, req.body.password);
            await super.verifyIfBlacklisted(searchUser);
            await super.updateUserIsConnected(searchUser);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User logged successfully.',
                    token : (await super.createTokenAndReturn(searchUser))[0]!.token
                }
            });

        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    error
                }
            });
        }
    }

    private async postMethodLoginCli(req: any, res: any) {
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
                    token : (await super.createTokenAndReturn(searchUser))[0]!.token
                }
            });

        } catch (error: any) {
            res.status(500).send({
                content: {
                    code: error?.code,
                    error
                }
            });
        }
    }

    public getRouter() {
        return this._router;
    }
}

