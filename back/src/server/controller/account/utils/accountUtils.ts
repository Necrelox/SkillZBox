import {SzBxModel} from "../../../model/szbxModel";
import {SzbxTools} from "../../../tools/szbxTools"


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
            password: SzbxTools.PasswordEncrypt.encrypt(user.password),
        });
    }
}
