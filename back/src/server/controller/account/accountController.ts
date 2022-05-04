import {AccountUtils} from "./utils/accountUtils";
import {SzBxModel} from "../../model/szbxModel";

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
            await super.sendEmailVerification(req.body.email);

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


            // vérifier le code si il appartient à un user
            // const user = await SzBxModel.User.User.select({uuid: token[0]!.userUuid});

            // await super.verifyUser(code);


            // si oui, vérifier si le user est déjà confirmé
            // si oui, renvoyer un message d'erreur
            // si non, verifier le code si il est expiré
            // si oui, renvoyer un message d'erreur
            // si non, valider le compte,

            res.status(200).send({
                content: {
                    code: 'OK',
                    message: ''
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

    private async postMethodLogin(_req: any, res: any) {
        try {
            // post username or email and password
            // verify post
            // select le user
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

