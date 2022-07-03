import {DatabaseKnex, Transaction, ErrorDatabase} from '../../DatabaseKnex';
import {User} from '../../../model';
import * as Models from '../../../model';

enum CodeError {
    UPDATE_USER_TRANSACTION = 'UserQueries::updateUserTransaction',
}

enum MessageError {
    NO_USER_FOUND_BY_TOKEN = 'No user found by token.',
}


export class UserQueries {
    /** Sample Queries */

    public static async getUserByFKFriendRequestOnSending(friendRequest: Models.User.IFriendRequest): Promise<Models.User.IFriendRequestFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND_REQUESTS')
            .where(friendRequest)
            .join('USER', 'USER.uuid', '=', 'USER_FRIEND_REQUESTS.userSendingRequest')
            .then((friendRequests: Models.User.IFriendRequestFKUser[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async getUserByFKFriendRequestOnRequested(friendRequest: Models.User.IFriendRequest): Promise<Models.User.IFriendRequestFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND_REQUESTS')
            .where(friendRequest)
            .join('USER', 'USER.uuid', '=', 'USER_FRIEND_REQUESTS.userRequested')
            .then((friendRequests: Models.User.IFriendRequestFKUser[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async getUserByFKToken(token: User.IToken): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_TOKEN')
            .where(token)
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .then((tokens: User.ITokenFKUser[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async getFriendsByFKUser(user: User.IUser): Promise<User.IFriend[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND')
            .where(user)
            .join('USER', 'USER.uuid', '=', 'USER_FRIEND.friend')
            .then((friends: User.IFriend[]) => {
                return friends;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async getFriend(friend: User.IFriend) : Promise<User.IFriend[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND')
            .where(friend)
            .then((friends: User.IFriend[]) => {
                return friends;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async getFriendRequest(friendRequest: User.IFriendRequest) : Promise<User.IFriendRequest[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND_REQUESTS')
            .where(friendRequest)
            .then((friendRequests: User.IFriendRequest[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async deleteFriend(where: User.IFriend) {
        return DatabaseKnex.getInstance().delete().from('USER_FRIEND').where(where);
    }

    public static async deleteFriendRequest(friendRequest: User.IFriendRequest) {
        return DatabaseKnex.getInstance().delete().from('USER_FRIEND_REQUESTS').where(friendRequest);
    }

    public static async addFriendRequest(friendRequest: User.IFriendRequest) {
        return DatabaseKnex.getInstance().insert(friendRequest).into('USER_FRIEND_REQUESTS');
    }

    public static async addFriend(friend: User.IFriend) {
        return DatabaseKnex.getInstance().insert(friend).into('USER_FRIEND');
    }

    public static async deleteToken(token: User.IToken) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(token);
    }

    public static async addToken(token: User.IToken) {
        return DatabaseKnex.getInstance().insert(token).into('USER_TOKEN');
    }

    /** Transaction Queries */
    private static async getUserByFKTokenTransaction(token: User.IToken, trx: Transaction): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_TOKEN')
            .where(token)
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .transaction(trx)
            .then((tokens: User.ITokenFKUser[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    private static async updateUserTransaction(userUpdate: User.IUser, where: User.IUser, trx: Transaction) {
        return DatabaseKnex.getInstance().update(userUpdate).into('USER').where(where)
            .transaction(trx)
            .then(() => {
                return userUpdate;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static async updateUserByTokenTransaction(userUpdate: User.IUser, token: User.IToken) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {

            const tokenFKUsers: User.ITokenFKUser[] = await UserQueries.getUserByFKTokenTransaction(token, trx);
            if (tokenFKUsers.length === 0) {
                throw {
                    code: CodeError.UPDATE_USER_TRANSACTION,
                    message: MessageError.NO_USER_FOUND_BY_TOKEN,
                };
            }

            await UserQueries.updateUserTransaction(userUpdate, {
                uuid: tokenFKUsers[0]!.userUuid,
            }, trx);


        }).then((token: User.IToken) => {
            return token;
        }).catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }
}
