import {Router, IRouter, Request, Response, NextFunction} from "express";
import {UserUtils} from "./utils/userUtils";
import {BearerToken} from "../../middleware/bearerToken/bearerToken";
import * as Models from "../../model";

export class UserController extends UserUtils {
    private _router: IRouter = Router();

    constructor() {
        super();
        this.initializeAccountController();
    }

    private initializeAccountController() {
        this._router.use("/me", async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get('/me', async (req: Request, res: Response) => {
            await this.getMethodMe(req, res);
        });
        this._router.put('/me', async (req: Request, res: Response) => {
            await this.putMethodMe(req, res);
        });

        this._router.use("/me/logo", async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get("/me/logo", async (req: Request, res: Response) => {
            await this.getMethodMeLogo(req, res);
        });
        this._router.post("/me/logo", async (req: Request, res: Response) => {
            await this.postMethodMeLogo(req, res);
        });
        this._router.delete("/me/logo", async (req: Request, res: Response) => {
            await this.deleteMethodMeLogo(req, res);
        });

        this._router.use("/me/user-friends", async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get("/me/user-friends", async (req: Request, res: Response) => {
            await this.getMethodMeUserFriend(req, res);
        });
        this._router.delete("/me/user-friends", async (req: Request, res: Response) => {
            await this.deleteMethodMeUserFriend(req, res);
        });

        this._router.use("/me/user-friends-requests", async (req: Request, res: Response, next: NextFunction) => {
            await BearerToken.checkToken(req, res, next);
        });
        this._router.get("/me/user-friends-requests", async (req: Request, res: Response) => {
            await this.getMethodMeUserFriendRequest(req, res);
        });
        this._router.post("/me/user-friends-requests", async (req: Request, res: Response) => {
            await this.postMethodMeUserFriendRequest(req, res);
        });
        this._router.delete("/me/user-friends-requests", async (req: Request, res: Response) => {
            await this.deleteMethodMeUserFriendRequest(req, res);
        });
    }

    /** ME */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            res.status(200).send({
                code: 'OK',
                user: {
                    username: tokenFKUser.username,
                    email: tokenFKUser.email,
                    activityMessage: tokenFKUser.activityMessage,
                    isConnected: tokenFKUser.isConnected,
                    createdAt: tokenFKUser.createdAt,
                }
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async putMethodMe(req: Request, res: Response) {
        try {
            const reflectUser: Models.User.IUser = req.body;
            if (Object.keys(reflectUser).length > 0) {
                await super.checkUserReflectForModify(reflectUser);
                const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
                await super.updateUserByReflect({uuid: tokenFKUser.uuid!}, reflectUser);
            } else {
                res.status(200).send({
                    code: "OK",
                    message: "No data to update."
                });
            }
            res.status(200).send({
                code: "OK",
                message: "User updated."
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    /** LOGO */
    private async getMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo ne peux pas être fais sans la la librairie
            res.status(200).send({
                code: "OK",
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async postMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo à faire
            res.status(200).send({
                code: "OK",
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeLogo(_req: Request, res: Response) {
        try {
            // todo à faire
            res.status(200).send({
                code: "OK",

            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    /** USER FRIEND */

    private async getMethodMeUserFriend(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            const friendsFKUsers: Models.User.IFriendFKUser[] = await super.getUserFriendsFKUserByReflect({user: tokenFKUser.uuid!});
            res.status(200).send({
                code: "OK",
                message: "Get friends list.",
                friends: friendsFKUsers.map((friendsFKUser: Models.User.IFriendFKUser) => {
                    return {
                        friendUuid: friendsFKUser.friend,
                        username: friendsFKUser.username,
                        activityMessage: friendsFKUser.activityMessage,
                        isConnected: friendsFKUser.isConnected,
                        createdAt: friendsFKUser.createdAt,
                    }
                })
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeUserFriend(_req: Request, res: Response) {
        try {
            // await super.verifyPostContainFriend(req.body)
            // const friendUuid: Buffer = req.body.friendUuid;
            // const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            // await super.deleteUserFriendByUserUuidAndFriendUuid(tokenFKUser.userUuid!, friendUuid);
            res.status(200).send({
                code: "OK",
                message: "Friend deleted."
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    /** USER FRIEND REQUEST  */
    private async getMethodMeUserFriendRequest(req: Request, res: Response) {
        try {
            const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            const meRequested: Models.User.IFriendRequestFKUser[] = await super.getUserFriendRequestReceivedFKUserByReflect({userRequested: tokenFKUser.uuid!});
            const meSentRequests: Models.User.IFriendRequestFKUser[] = await super.getUserFriendRequestSendingFKUserByReflect({userSendingRequest: tokenFKUser.uuid!});
            res.status(200).send({
                code: "OK",
                message: "Get friends request list.",
                meRequestedBy: meRequested.map((item: Models.User.IFriendRequestFKUser) => {
                    return {
                        username: item.username,
                        activityMessage: item.activityMessage,
                        isConnected: item.isConnected,
                        createdAt: item.createdAt,
                    }
                }),
                meSentRequestsTo: meSentRequests.map((item: Models.User.IFriendRequestFKUser) => {
                    return {
                        username: item.username,
                        activityMessage: item.activityMessage,
                        isConnected: item.isConnected,
                        createdAt: item.createdAt,
                    }
                })
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async postMethodMeUserFriendRequest(req: Request, res: Response) {
        try {
            await super.checkPostContainUserRequested(req.body)
            const userRequested: Models.User.IUser = await super.getUserByReflect({username: req.body.userRequested});
            const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            await super.checkIfUserRequestedNameIsNotSameToHimSelf(tokenFKUser.username!, userRequested.username!);
            await super.checkIfUserIsNotAlreadyFriend(tokenFKUser.uuid!, userRequested.uuid!);
            await super.checkUserSendingHasAlreadySendToTheUserRequested(tokenFKUser.uuid!, userRequested.uuid!);
            let message = await super.checkIfUserRequestHasAlreadySendRequestToTheUserSendTheRequest(tokenFKUser.uuid!, userRequested.uuid!);
            if (message === "") { // todo
                await super.addFriendRequest(tokenFKUser.userUuid!, userRequested.uuid!);
                message = "Friend request sent !";
            }
            res.status(200).send({
                code: "OK",
                message
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }

    private async deleteMethodMeUserFriendRequest(req: Request, res: Response) {
        try {
            await super.checkPostContainUserRequested(req.body)
            const tokenFKUser: Models.User.ITokenFKUser = await super.getUserByFKTokenByBearerToken((req.headers.authorization)?.split(" ")[1]!);
            const userRequested: Models.User.IUser = await super.getUserByReflect({username: req.body.userRequested});
            await super.checkIfUserRequestedNameIsNotSameToHimSelf(tokenFKUser.username!, userRequested.username!);
            await super.deleteUserFriendRequestSendingAndReceived(tokenFKUser.uuid!, userRequested.uuid!);
            res.status(200).send({
                code: "OK",
                message: "Friend request deleted."
            });
        } catch (error: any) {
            res.status(500).send({error});
        }
    }


    public getRouter(): IRouter {
        return this._router;
    }
}
