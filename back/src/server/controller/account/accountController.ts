import {AccountUtils} from "./utils/accountUtils";

import {Router, IRouter, Request, Response} from "express";
import {SzbxTools} from "../../tools/szbxTools";
import {SzBxModel} from "../../model/szbxModel";

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
            SzbxTools.Mailer.checkEmailHasBadSyntax(req.body.email);
            SzbxTools.Mailer.checkEmailIsTemporary(req.body.email);
            await super.checkSyntaxUsername(req.body.username);
            await super.createUser({
                email: req.body.email,
                username: req.body.username,
                password: SzbxTools.PasswordEncrypt.encrypt(req.body.password)
            })
            const user: SzBxModel.User.IModelUser[] = await super.getUserBySearch({
                email: req.body.email,
                username: req.body.username,
            });
            await super.createToken(user[0]!);
            // const token: SzBxModel.User.IModelUserToken[] = await super.getTokenBySearch({userUuid: user[0]!.uuid});
            // await super.sendEmailVerification(user[0]!, token[0]!);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User and Token created successfully.'
                }
            });
        } catch (error: any) {
            res.status(500).send({
                content: error
            });
        }
    }

    private async postMethodVerify(req: Request, res: Response) {
        try {
            const code = req.body.code;
            await super.verifyTokenSignature(code);
            const token: SzBxModel.User.IModelUserToken[] = await super.getTokenBySearch({token: code});
            await super.verifyTokenExpiration(token[0]!);
            await super.setVerifyUser(token[0]!);

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User verified successfully.'
                }
            });
        } catch (error: any) {
            res.status(500).send({
                content: error
            });
        }
    }

    private async postMethodLogin(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            const searchUser: SzBxModel.User.IModelUser = await super.tranformPostBodyToUserSearch(req.body);
            const user: SzBxModel.User.IModelUser = await super.verifyLoginAndReturnUser(searchUser, req.body.password);
            await super.verifyIfBlacklisted(user);
            await super.updateUserIsConnected(user);
            await super.createToken(user);
            const token: SzBxModel.User.IModelUserToken[] = await super.getTokenBySearch({userUuid: user.uuid});
            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User logged successfully.',
                    userUuid: user.uuid,
                    token : token
                }
            });

        } catch (error: any) {
            res.status(500).send({
                content: error
            });
        }
    }

    private async postMethodLoginCli(req: Request, res: Response) {
        try {
            await super.checkPostContainMailORUsernameANDPassword(req.body);
            const searchUser: SzBxModel.User.IModelUser = await super.tranformPostBodyToUserSearch(req.body);
            await super.checkPostContainIpANDMacAddressANDDeviceType(req.body);
            const user: SzBxModel.User.IModelUser = await super.verifyLoginAndReturnUser(searchUser, req.body.password);
            await super.verifyIfBlacklisted(user);
            await super.addNewIpOrUpdate(user, req.body.ip);
            await super.addNewMacAddressOrUpdate(user, req.body.macAddress);
            await super.addNewDeviceOrUpdate(user, req.body.deviceType);
            await super.updateUserIsConnected(user);
            await super.createToken(user);
            const token: SzBxModel.User.IModelUserToken[] = await super.getTokenBySearch({userUuid: user.uuid});

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: 'User logged successfully.',
                    userUuid: user.uuid,
                    token: token[0]!.token
                }
            });

        } catch (error: any) {
            res.status(500).send({
                content: error
            });
        }
    }

    public getRouter() {
        return this._router;
    }
}

