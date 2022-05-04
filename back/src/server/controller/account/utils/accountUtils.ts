import {SzBxModel} from "../../../model/szbxModel";
import {SzbxTools} from "../../../tools/szbxTools"

export abstract class AccountUtils {
    protected checkPostContainMailORUserANDPassword(postData: any) {
        if ((!postData.email && !postData.username) || !postData.password)
            throw {
                code: "AccountUtilsError",
                message: "checkPostContainMailORUserANDPassword : Missing parameters" + (postData.email ? " email" : "") + (postData.username ? " username" : "") + (postData.password ? " password" : "") + "."
            };
    }
    protected checkPostContainMailANDUserANDPassword(postData: any) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: "AccountUtilsError",
                message: "checkPostContainMailANDUserANDPassword : Missing parameters" + (postData.email ? "" : " email") + (postData.username ? "" : " username") + (postData.password ? "" : " password") + "."
            };
    }


    protected async createUser(user: SzBxModel.User.IModelUser) {
        await SzBxModel.User.User.insert({
            username: user.username,
            email: user.email,
            password: SzbxTools.PasswordEncrypt.encrypt(user.password!),
        });
    }

    protected async createToken(newUser: SzBxModel.User.IModelUser) {

        const user = await SzBxModel.User.User.select(newUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyTokenExpiration : User not exist."
            };

        await SzBxModel.User.Token.insert({
            token: SzbxTools.Token.generateToken(user[0]!.uuid!),
            userUuid: user[0]!.uuid,
            expireAt: new Date(Date.now() + (1000 * 60 * 60))
        });
    }

    protected async sendEmailVerification(searchUser: SzBxModel.User.IModelUser) {
        const user = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "sendConfirmationMail : User not find."
            };

        const token = await SzBxModel.User.Token.select({userUuid: user[0]!.uuid});
        if (!token || token.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "sendEmailVerification : Invalid user"
            };

        await SzbxTools.Mailer.sendMail({
            from: process.env['EMAIL_AUTH_USER'],
            to: user[0]!.email!,
            subject: "Confirmation de votre compte",
            text: "Veuillez confirmer votre compte en cliquant sur le lien suivant : $$$$$ " + token[0]!.token
        });
    }


    protected async verifyTokenSignature(token: string) {
        if (!SzbxTools.Token.tockenChecker(token))
            throw {
                code: "AccountUtilsError",
                message: "verifyTokenSignature : Invalid signature."
            };
    }

    protected async verifyTokenExpiration(code: string) {
        let token = await SzBxModel.User.Token.select({token: code});
        if (!token || token.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyTokenExpiration : Token not exist."
            };

        if (token[0]!.expireAt! < new Date()) {
            await SzBxModel.User.Token.delete({token: code});
            await this.createToken({uuid: token[0]!.userUuid});
            token = await SzBxModel.User.Token.select({userUuid: token[0]!.userUuid});
            if (!token || token.length === 0)
                throw {
                    code: "AccountUtilsError",
                    message: "verifyTokenExpiration : Token not exist after generation."
                };

            await this.sendEmailVerification({uuid: token[0]!.userUuid});

            throw {
                code: "AccountUtilsError",
                message: "verifyTokenExpiration : Token expired, new token generated"
            };
        }
    }

    protected async verifyUser(code: string) {
        const token = await SzBxModel.User.Token.select({token: code});
        if (!token || token.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyUser : Token not exist after generation."
            };

        const user = await SzBxModel.User.User.select({uuid: token[0]!.userUuid});
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyUser : Invalid user."
            };
        if (user[0]!.isVerified)
            throw {
                code: "AccountUtilsError",
                message: "verifyUser : User already verified."
            };
        else {
            await SzBxModel.User.User.update({uuid: user[0]!.uuid}, {isVerified: true});
            await SzBxModel.User.Token.delete({token: code});
        }
    }

}
