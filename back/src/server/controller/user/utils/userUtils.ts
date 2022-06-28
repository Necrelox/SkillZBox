import * as Models from "../../../model";
import * as DBQueries from "../../../database";
import {CodeError} from "../enum/codeError";
import {MessageError} from "../enum/messageError";
import * as Tools from "../../../tools";
import {ControllerUtils} from "../../utils/controllerUtils";

export abstract class UserUtils extends ControllerUtils {

    /** POST */
    protected async checkPostContainUserRequested(postBody: any) {
        if (!('userRequested' in postBody))
            throw {
                code: CodeError.CHECK_POST_CONTAIN_USER_REQUESTED,
                message: MessageError.CHECK_POST_CONTAIN_USER_REQUESTED
            }
    }

    /** FRIEND */

    protected async getUserFriendsFKUserByReflect(friends: Models.User.IFriend): Promise<Models.User.IFriendFKUser[]> {
        return await DBQueries.UserQuery.Friend.selectFK(friends);
    }

    protected async addFriend(userUuid: Buffer, friendUuid: Buffer) {
        await DBQueries.UserQuery.Friend.insert({user: userUuid, friend: friendUuid});
    }

    protected async checkIfUserIsNotAlreadyFriend(user: Buffer, friend: Buffer) {
        const friends: Models.User.IFriend[] = await DBQueries.UserQuery.Friend.select({
            user,
            friend
        });
        if (friends.length !== 0)
            throw {
                code: CodeError.CHECK_IF_USER_IS_NOT_ALREADY_FRIEND,
                message: MessageError.CHECK_IF_USER_IS_NOT_ALREADY_FRIEND
            }
    }



    /** FRIEND REQUEST */
    protected async addFriendRequest(userUuid: Buffer, userRequestedUuid: Buffer) {
        await DBQueries.UserQuery.FriendRequest.insert({userSendingRequest: userUuid, userRequested: userRequestedUuid});
    }

    protected async deleteUserFriendRequestSendingAndReceived(userSendingRequest: Buffer, userRequested: Buffer) {
        await DBQueries.UserQuery.FriendRequest.delete({userRequested, userSendingRequest}); // je supp ma demande
        await DBQueries.UserQuery.FriendRequest.delete({userRequested: userSendingRequest, userSendingRequest: userRequested}); // je supp sa demande
    }

    protected async getUserFriendRequestReceivedFKUserByReflect(friendRequestReflect: Models.User.IFriendRequest): Promise<Models.User.IFriendRequestFKUser[]> {
        return await DBQueries.UserQuery.FriendRequest.selectFKUserSending(friendRequestReflect);
    }

    protected async getUserFriendRequestSendingFKUserByReflect(friendRequestReflect: Models.User.IFriendRequest): Promise<Models.User.IFriendRequestFKUser[]> {
        return await DBQueries.UserQuery.FriendRequest.selectFKUserRequested(friendRequestReflect);
    }

    protected async checkUserSendingHasAlreadySendToTheUserRequested(userWhereToLook: Buffer, userToCheck: Buffer) {
        const friendRequest: Models.User.IFriendRequest[] = await DBQueries.UserQuery.FriendRequest.select({
            userSendingRequest: userWhereToLook,
            userRequested: userToCheck
        });
        if (friendRequest.length !== 0)
            throw {
                code: CodeError.CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED,
                message: MessageError.CHECK_USER_SENDING_HAS_ALREADY_SEND_TO_THE_USER_REQUESTED
            }
    }

    protected async checkIfUserRequestHasAlreadySendRequestToTheUserSendTheRequest(userSendingRequest: Buffer, userRequested: Buffer) : Promise<string> {
        const friendRequest: Models.User.IFriendRequest[] = await DBQueries.UserQuery.FriendRequest.select({
            userSendingRequest: userRequested,
            userRequested: userSendingRequest
        });
        if (friendRequest.length !== 0) {
            await this.addFriend(userSendingRequest, userRequested);
            await this.addFriend(userRequested, userSendingRequest);
            await this.deleteUserFriendRequestSendingAndReceived(userSendingRequest, userRequested);
            return 'The user has already send a request to you, so you are now friends !';
        }
        return '';
    }

    /** USER */
    protected async checkIfUserRequestedNameIsNotSameToHimSelf(userRequestedName: string, userSendingName: string) {
        if (userSendingName === userRequestedName)
            throw {
                code: CodeError.CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF,
                message: MessageError.CHECK_IF_USER_REQUESTED_NAME_IS_NOT_SAME_TO_HIM_SELF
            }
    }

    protected async checkUserReflectForModify(userReflect: Models.User.IUser) {
        if ('email' in userReflect) {
            Tools.Mailer.checkEmailHasBadSyntax(userReflect.email!);
            Tools.Mailer.checkEmailIsTemporary(userReflect.email!);
        }
        if ('username' in userReflect) {
            await this.checkSyntaxUsername(userReflect.username!);
            await this.checkLengthUsername(userReflect.username!);
        }
        if ('password' in userReflect) {
            const password: string = userReflect.password!.toString();
            await this.checkLengthPassword(password);
            await this.checkSyntaxPassword(password);
        }
    }
}
