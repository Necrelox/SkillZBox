import {SzBxModel} from "../../../model/szbxModel";
import {SzbxTools} from "../../../tools/szbxTools"

export abstract class AccountUtils {

    protected async createSearchUserWithPostBody(postBody: any): Promise<SzBxModel.User.IModelUser> {
        const searchUser: SzBxModel.User.IModelUser = {};
        if (postBody.email)
            searchUser.email = postBody.email;
        if (postBody.username)
            searchUser.username = postBody.username;
        return searchUser;
    }

    protected async checkPostContainMailORUsernameANDPassword(postData: any) {
        if ((!postData.email && !postData.username) || !postData.password)
            throw {
                code: "AccountUtilsError",
                message: "checkPostContainMailORUserANDPassword : Missing parameters" + (postData.email ? " email" : "") + (postData.username ? " username" : "") + (postData.password ? " password" : "") + "."
            };
    }

    protected async checkPostContainMailANDUserANDPassword(postData: any) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: "AccountUtilsError",
                message: "checkPostContainMailANDUserANDPassword : Missing parameters" + (postData.email ? "" : " email") + (postData.username ? "" : " username") + (postData.password ? "" : " password") + "."
            };
    }

    protected async checkPostContainIpANDMacAddressANDDeviceType(postData: any) {
        if (!postData.ip || !postData.macAddress || !postData.deviceType)
            throw {
                code: "AccountUtilsError",
                message: "checkPostContainIpANDMacAddressANDDeviceType : Missing parameters" + (postData.ip ? "" : " ip") + (postData.macAddress ? "" : " macAddress") + (postData.deviceType ? "" : " deviceType") + "."
            }
    }

    protected async createUser(user: SzBxModel.User.IModelUser) {
        await SzBxModel.User.User.insert({
            username: user.username,
            email: user.email,
            password: user.password!,
        });
    }

    protected async createToken(newUser: SzBxModel.User.IModelUser) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(newUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyTokenExpiration : User not exist."
            };

        const token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select({
            userUuid: user[0]!.uuid
        })
        if (token && token.length > 0)
            await SzBxModel.User.Token.delete({userUuid: user[0]!.uuid});

        await SzBxModel.User.Token.insert({
            token: SzbxTools.Token.generateToken(user[0]!.uuid!),
            userUuid: user[0]!.uuid,
            expireAt: new Date(Date.now() + (1000 * 60 * 60))
        });
    }

    protected async createTokenAndReturn(newUser: SzBxModel.User.IModelUser): Promise<SzBxModel.User.IModelUserToken[]> {
        await this.createToken(newUser);
        const user:  SzBxModel.User.IModelUser[] = await SzBxModel.User.User.select(newUser);
        return await SzBxModel.User.Token.select({userUuid: user[0]!.uuid});
    }

    protected async sendEmailVerification(searchUser: SzBxModel.User.IModelUser) {
        const user:  SzBxModel.User.IModelUser[] = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "sendConfirmationMail : User not find."
            };

        const token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select({userUuid: user[0]!.uuid});
        if (!token || token.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "sendEmailVerification : Invalid user"
            };

        await SzbxTools.Mailer.sendMail({
            from: process.env.EMAIL_AUTH_USER,
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
        let token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select({token: code});
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
        const token: SzBxModel.User.IModelUserToken[]  = await SzBxModel.User.Token.select({token: code});
        if (!token || token.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyUser : Token not exist after generation."
            };

        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select({uuid: token[0]!.userUuid});
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

    protected async verifyLogin(searchUser: SzBxModel.User.IModelUser, password: string) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyLogin : Invalid" + searchUser.username ? "username" : "email"
            };
        if (!SzbxTools.PasswordEncrypt.compare(password, user[0]!.password!))
            throw {
                code: "AccountUtilsError",
                message: "verifyLogin : Invalid password."
            };
        if (!user[0]!.isVerified)
            throw {
                code: "AccountUtilsError",
                message: "verifyLogin : User not verified."
            };
    }

    protected async verifyIfBlacklisted(searchUser: SzBxModel.User.IModelUser) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "verifyIfBlacklisted : Invalid user."
            };
        if (user[0]!.isBlackListed)
            throw {
                code: "AccountUtilsError",
                message: "verifyIfBlacklisted : User is blacklisted."
            };
    }

    protected async updateUserIsConnected(searchUser: SzBxModel.User.IModelUser) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "updateUserIsConnected : Invalid user."
            };
        await SzBxModel.User.User.update({uuid: user[0]!.uuid}, {isConnected: true});
    }

    protected async addNewIpOrUpdate(searchUser: SzBxModel.User.IModelUser, ip: string) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "addNewIpOrUpdate : Invalid user."
            };
        const userIP: SzBxModel.User.IModelUserIp[] = await SzBxModel.User.Ip.select({
            ip,
            userUuid: user[0]!.uuid
        });
        if (!userIP || userIP.length === 0) {
            await SzBxModel.User.Ip.insert({
                ip,
                userUuid: user[0]!.uuid,
                active: true
            });
        } else {
            await SzBxModel.User.Ip.update({
                ip,
                userUuid: user[0]!.uuid,
            }, {active: true});
        }
    }

    protected async addNewMacAddressOrUpdate(searchUser: SzBxModel.User.IModelUser, macAddress: string) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "addNewIpOrUpdate : Invalid user."
            };
        const userMacAddress: SzBxModel.User.IModelUserIp[] = await SzBxModel.User.MacAddress.select({
            macAddress,
            userUuid: user[0]!.uuid
        });
        if (!userMacAddress || userMacAddress.length === 0) {
            await SzBxModel.User.MacAddress.insert({
                macAddress,
                userUuid: user[0]!.uuid,
                active: true
            });
        } else {
            await SzBxModel.User.MacAddress.update({
                macAddress,
                userUuid: user[0]!.uuid,
            }, {active: true});
        }
    }

    protected async addNewDeviceOrUpdate(searchUser: SzBxModel.User.IModelUser, device: string) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: "AccountUtilsError",
                message: "addNewIpOrUpdate : Invalid user."
            };
        const userDevice: SzBxModel.User.IModelUserDevice[] = await SzBxModel.User.Device.select({
            device,
            userUuid: user[0]!.uuid
        });
        if (!userDevice || userDevice.length === 0) {
            await SzBxModel.User.Device.insert({
                device,
                userUuid: user[0]!.uuid,
                active: true
            });
        } else {
            await SzBxModel.User.Device.update({
                device,
                userUuid: user[0]!.uuid,
            }, {active: true});
        }
    }
}
