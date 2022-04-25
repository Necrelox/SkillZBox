import {SzBxModel} from "../../../model/szbxModel";
import {SzbxTools} from "../../../tools/szbxTools"

import {randomUUID, createHmac} from 'crypto'

export abstract class AccountUtils {
    protected checkPostContainMailORUserANDPassword(postData: any) {
        if ((!postData.email && !postData.username) || !postData.password)
            throw {
                code: "AccountUtilsError",
                message: "Missing parameters" + (postData.email ? " email" : "") + (postData.username ? " username" : "") + (postData.password ? " password" : "")
            };
    }
    protected checkPostContainMailANDUserANDPassword(postData: any) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: "AccountUtilsError",
                message: "Missing parameters" + (postData.email ? "" : " email") + (postData.username ? "" : " username") + (postData.password ? "" : " password")
            };
    }

    protected async createUser(user: SzBxModel.User.IModelUser) {
        await SzBxModel.User.User.insert({
            username: user.username,
            email: user.email,
            password: SzbxTools.PasswordEncrypt.encrypt(user.password!),
        });
    }

    protected async createToken(user: SzBxModel.User.IModelUser) {
        const getUser = await SzBxModel.User.User.select({
            username: user.username,
            email: user.email
        })
        const hashedUserEmail = createHmac('sha256', randomUUID())
            .update(getUser[0]!.email!)
            .digest('hex');
        const token = randomUUID();
        await SzBxModel.User.Token.insert({
            token: token + '.' + hashedUserEmail + '.' + createHmac('sha256', 'szbx')
                .update(token + getUser[0]!.password!)
                .digest('hex'),
            userUuid: getUser[0]!.uuid,
            expireAt: new Date(Date.now() + (1000 * 60 * 60))
        });

    }

    protected async sendMail(to: string, subject: string, text: string) {
        await SzbxTools.Mailer.sendMail({
            from: process.env['EMAIL_AUTH_USER'],
            to: to,
            subject: subject,
            text: text
        });
    }

}
