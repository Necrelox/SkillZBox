import {SzBxModel} from '../../../model/szbxModel';
import {SzbxTools} from '../../../tools/szbxTools';
import {CodeError} from './enum/codeError';
import {MessageError} from "./enum/messageError";

export abstract class AccountUtils {

    public async tranformPostBodyToUserSearch(postBody: SzBxModel.User.IModelUser): Promise<SzBxModel.User.IModelUser> {
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

    protected async checkSyntaxUsername(username: string) {
        const regex: RegExp = /^\w+$/;
        if (!regex.test(username))
            throw {
                code: CodeError.ACCOUNT_UTILS_CHECK_SYNTAXE_USERNAME,
                message: MessageError.USERNAME_BAD_SYNTAX
            }
    }

    protected async getUserBySearch(searchUser: SzBxModel.User.IModelUser): Promise<SzBxModel.User.IModelUser[]> {
        const user: SzBxModel.User.IModelUser[] = await SzBxModel.User.User.select(searchUser);
        if (!user || user.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_GET_USER_BY_SEARCH,
                message: MessageError.USER_NOT_FOUND
            }
        return user;
    }

    protected async getTokenBySearch(tokenSearch: SzBxModel.User.IModelUserToken): Promise<SzBxModel.User.IModelUserToken[]> {
        const token: SzBxModel.User.IModelUserToken[] = await SzBxModel.User.Token.select(tokenSearch);
        if (!token || token.length === 0)
            throw {
                code: CodeError.ACCOUNT_UTILS_GET_TOKEN_BY_USER,
                message: MessageError.TOKEN_NOT_FOUND
            }
        return token;
    }

    protected async createUser(user: SzBxModel.User.IModelUser) {
        await SzBxModel.User.User.insert({
            username: user.username,
            email: user.email,
            password: user.password!,
        });
    }

    protected async createToken(user: SzBxModel.User.IModelUser) {
        await SzBxModel.User.Token.delete({userUuid: user?.uuid});

        await SzBxModel.User.Token.insert({
            token: SzbxTools.Token.generateToken(user?.uuid!),
            userUuid: user?.uuid,
            expireAt: new Date(Date.now() + (1000 * 60 * 60))
        });
    }

    protected async createTokenAndReturn(newUser: SzBxModel.User.IModelUser): Promise<SzBxModel.User.IModelUserToken[]> {
        await this.createToken(newUser);
        const user:  SzBxModel.User.IModelUser[] = await SzBxModel.User.User.select(newUser);
        const token = await SzBxModel.User.Token.select({userUuid: user[0]!.uuid});
        return token;
    }

    protected async sendEmailVerification(user: SzBxModel.User.IModelUser, token: SzBxModel.User.IModelUserToken) {
        await SzbxTools.Mailer.sendMail({
            from: process.env.EMAIL_AUTH_USER,
            to: user?.email!,
            subject: "Confirmation de votre compte",
            text: "Veuillez confirmer votre compte en cliquant sur le lien suivant : $$$$$ " + token?.token
        });
    }

    protected async verifyTokenSignature(token: string) {
        if (!SzbxTools.Token.tokenChecker(token))
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_TOKEN_SIGNATURE,
                message: MessageError.TOKEN_INVALID_SIGNATURE
            };
    }

    protected async verifyTokenExpiration(token: SzBxModel.User.IModelUserToken) {

        if (token?.expireAt! < new Date()) {
            await this.createToken({uuid: token!.userUuid});
            // const newToken : SzBxModel.User.IModelUserToken[] = await this.getTokenBySearch({userUuid: token?.userUuid});
            // const user: SzBxModel.User.IModelUser[] = await SzBxModel.User.User.select({uuid: token?.userUuid});
            // await this.sendEmailVerification(user[0]!, newToken[0]!);

            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_TOKEN_EXPIRATION,
                message: MessageError.TOKEN_EXPIRED
            };
        }
    }

    protected async setVerifyUser(token: SzBxModel.User.IModelUserToken) {
        const user: SzBxModel.User.IModelUser[] = await this.getUserBySearch({uuid: token?.userUuid});
        if (user[0]!.isVerified)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_USER,
                message: MessageError.USER_ALREADY_VERIFIED
            };
        else {
            await SzBxModel.User.User.update({uuid: user[0]!.uuid}, {isVerified: true});
            await SzBxModel.User.Token.delete(token);
        }
    }

    protected async verifyLoginAndReturnUser(searchUser: SzBxModel.User.IModelUser, password: string) : Promise<SzBxModel.User.IModelUser> {
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
        return user[0]!;
    }

    protected async verifyIfBlacklisted(user: SzBxModel.User.IModelUser) {
        if (user!.isBlackListed)
            throw {
                code: CodeError.ACCOUNT_UTILS_VERIFY_BLACKLIST,
                message: MessageError.USER_IS_BLACKLISTED
            };
    }

    protected async updateUserIsConnected(user: SzBxModel.User.IModelUser) {
        await SzBxModel.User.User.update({uuid: user.uuid}, {isConnected: true});
    }

    protected async addNewIpOrUpdate(user: SzBxModel.User.IModelUser, ip: string) {
        const userIP: SzBxModel.User.IModelUserIp[] = await SzBxModel.User.Ip.select({
            ip: ip,
            userUuid: user.uuid
        });
        if (!userIP || userIP.length === 0) {
            await SzBxModel.User.Ip.insert({
                ip,
                userUuid: user?.uuid,
                active: true
            });
        } else {
            await SzBxModel.User.Ip.update({
                ip,
                userUuid: user?.uuid,
            }, {active: true});
        }
    }

    protected async addNewMacAddressOrUpdate(user: SzBxModel.User.IModelUser, macAddress: string) {
        const userMacAddress: SzBxModel.User.IModelUserIp[] = await SzBxModel.User.MacAddress.select({
            macAddress,
            userUuid: user!.uuid
        });
        if (!userMacAddress || userMacAddress.length === 0) {
            await SzBxModel.User.MacAddress.insert({
                macAddress,
                userUuid: user.uuid,
                active: true
            });
        } else {
            await SzBxModel.User.MacAddress.update({
                macAddress,
                userUuid: user.uuid,
            }, {active: true});
        }
    }

    protected async addNewDeviceOrUpdate(user: SzBxModel.User.IModelUser, device: string) {
        const userDevice: SzBxModel.User.IModelUserDevice[] = await SzBxModel.User.Device.select({
            device,
            userUuid: user.uuid
        });
        if (!userDevice || userDevice.length === 0) {
            await SzBxModel.User.Device.insert({
                device,
                userUuid: user.uuid,
                active: true
            });
        } else {
            await SzBxModel.User.Device.update({
                device,
                userUuid: user.uuid,
            }, {active: true});
        }
    }
}
