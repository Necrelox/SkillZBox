import {AccountUtils} from "./utils/accountUtils";
import {SzBxModel} from "../../model/szbxModel";

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
            super.checkPostContainMailANDUserANDPassword(req.body);
            SzbxTools.Mailer.emailHasBadSyntaxe(req.body.email);
            SzbxTools.Mailer.emailIsTemporary(req.body.email);
            await super.createUser(req.body);
            const user = await SzBxModel.User.User.select({email: req.body.email, username: req.body.username});
            await super.createToken(user!);
            const tokenUser = await SzBxModel.User.Token.select({userUuid: user[0]!.uuid});
            await super.sendMail(req.body.email, "Confirmation de votre compte",
                "Veuillez confirmer votre compte en cliquant sur le lien suivant : $$$$$" + tokenUser[0]!.token);
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
            // const {code} = req.body.code;
            // vérifier le code si il appartient à un user
            // si oui, vérifier si le user est déjà confirmé
            // si oui, renvoyer un message d'erreur
            // si non, verifier le code si il est expiré
            // si oui, renvoyer un message d'erreur
            // si non, valider le compte, supprimer le token et en recréer un nouveau puis renvoyer le tokenz


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
