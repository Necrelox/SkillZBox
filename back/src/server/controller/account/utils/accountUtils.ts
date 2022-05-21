import {SzBxModel} from '../../../model/szbxModel';
import {SzbxTools} from '../../../tools/szbxTools';
import {CodeError} from './enum/codeError';
import {MessageError} from "./enum/messageError";

export abstract class AccountUtils {

    public async TranformPostToUserSearch(postBody: SzBxModel.User.IModelUser): Promise<SzBxModel.User.IModelUser> {
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
                code: CodeError.ACCOUNT_UTILS_CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD,
                message: MessageError.MISSING_PARAMETER + (postData.email ? '':   ' email') + (postData.username ? '' :  ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainMailANDUserANDPassword(postData: any) {
        if (!postData.email || !postData.username || !postData.password)
            throw {
                code: CodeError.ACCOUNT_UTILS_CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD,
                message: MessageError.MISSING_PARAMETER + (postData.email ? '' :  " email") + (postData.username ? '' : ' username') + (postData.password ? '' : ' password') + '.'
            };
    }

    protected async checkPostContainIpANDMacAddressANDDeviceType(postData: any) {
        if (!postData.ip || !postData.macAddress || !postData.deviceType)
            throw {
                code: CodeError.ACCOUNT_UTILS_CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE,
                message: MessageError.MISSING_PARAMETER + (postData.ip && " ip") + (postData.macAddress && " macAddress") + (postData.deviceType && " deviceType") + "."
            }
    }

    protected async checkSyntaxeUsername(username: string) {
        const regex: RegExp = /^\w+$/;

        if (!regex.test(username))
            throw {
                code: CodeError.ACCOUNT_UTILS_CHECK_SYNTAXE_USERNAME,
                message: MessageError.USERNAME_BAD_SYNTAX
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
                code: CodeError.ACCOUNT_UTILS_CREATE_TOKEN,
                message: MessageError.USER_NOT_FOUND
            };

        const token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select({
            userUuid: user[0]!.uuid
        })
        if (token && token.length > 0)
            await SzBxModel.User.Token.delete({userUuid: user[0]!.uuid});

        SzBxModel.User.Token.insert({
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
                code: CodeError.ACCOUNT_UTILS_SEND_EMAIL_VERIFICATION,
                message: MessageError.USER_NOT_FOUND
            };

        const token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select({userUuid: user[0]!.uuid});
        if (!token || token.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_SEND_EMAIL_VERIFICATION,
                message: MessageError.TOKEN_NOT_FOUND
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
                code: CodeError.ACCOUNT_UTILS_VERIFY_TOKEN_SIGNATURE,
                message: MessageError.TOKEN_INVALID_SIGNATURE
            };
    }

    protected async verifyTokenExpiration(code: string) {
        let token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select({token: code});
        if (!token || token.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_TOKEN_EXPIRATION,
                message: MessageError.TOKEN_NOT_FOUND
            };

        if (token[0]!.expireAt! < new Date()) {
            await SzBxModel.User.Token.delete({token: code});
            await this.createToken({uuid: token[0]!.userUuid});
            token = await SzBxModel.User.Token.select({userUuid: token[0]!.userUuid});
            if (!token || token.length === 0)
                throw {
                    code: CodeError.ACCOUNT_UTILS_VERIFY_TOKEN_EXPIRATION,
                    message: MessageError.TOKEN_NOT_FOUND_AFTER_GENERATE
                };

            await this.sendEmailVerification({uuid: token[0]!.userUuid});

            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_TOKEN_EXPIRATION,
                message: MessageError.TOKEN_EXPIRED
            };
        }
    }

    protected async verifyUser(code: string) {
        const token: SzBxModel.User.IModelUserToken[]  = await SzBxModel.User.Token.select({token: code});
        if (!token || token.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_USER,
                message: MessageError.TOKEN_NOT_FOUND
            };

        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select({uuid: token[0]!.userUuid});
        if (!user || user.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_USER,
                message: MessageError.USER_NOT_FOUND
            };
        if (user[0]!.isVerified)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_USER,
                message: MessageError.USER_ALREADY_VERIFIED
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
                code: CodeError.ACCOUNT_UTILS_VERIFY_LOGIN,
                message: searchUser?.username ? "Invalid username" : "Invalid email"
            };
        if (!SzbxTools.PasswordEncrypt.compare(password, user[0]!.password!))
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_LOGIN,
                message: MessageError.LOGIN_INVALID_PASSWORD
            };
        if (!user[0]!.isVerified)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_LOGIN,
                message: MessageError.USER_NOT_VERIFIED
            };
    }

    protected async verifyIfBlacklisted(searchUser: SzBxModel.User.IModelUser) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_BLACKLIST,
                message: MessageError.USER_NOT_FOUND
            };
        if (user[0]!.isBlackListed)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_BLACKLIST,
                message: MessageError.USER_IS_BLACKLISTED
            };
    }

    protected async updateUserIsConnected(searchUser: SzBxModel.User.IModelUser) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_UPDATE_USER_IS_CONNECTED,
                message: MessageError.USER_NOT_FOUND
            };
        await SzBxModel.User.User.update({uuid: user[0]!.uuid}, {isConnected: true});
    }

    protected async addNewIpOrUpdate(searchUser: SzBxModel.User.IModelUser, ip: string) {
        const user: SzBxModel.User.IModelUser[]  = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_ADD_NEW_IP_OR_UPDATE,
                message: MessageError.USER_NOT_FOUND
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
                code: CodeError.ACCOUNT_UTILS_ADD_NEW_MACADDRESS_OR_UPDATE,
                message: MessageError.USER_NOT_FOUND
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
                code: CodeError.ACCOUNT_UTILS_ADD_NEW_DEVICE_OR_UPDATE,
                message: MessageError.USER_NOT_FOUND
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
