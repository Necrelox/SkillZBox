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
    /** Simple Queries */
    public static async getUserByFKFriendRequestOnSending(friendRequest: Partial<Models.User.IFriendRequest>): Promise<Models.User.IFriendRequestFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND_REQUESTS')
            .where(friendRequest)
            .join('USER', 'USER.uuid', '=', 'USER_FRIEND_REQUESTS.userSendingRequest')
            .then((friendRequests: Models.User.IFriendRequestFKUser[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getUserByFKFriendRequestOnRequested(friendRequest: Partial<Models.User.IFriendRequest>): Promise<Models.User.IFriendRequestFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND_REQUESTS')
            .where(friendRequest)
            .join('USER', 'USER.uuid', '=', 'USER_FRIEND_REQUESTS.userRequested')
            .then((friendRequests: Models.User.IFriendRequestFKUser[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getUserByFKToken(token: Partial<User.IToken>): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_TOKEN')
            .where(token)
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .then((tokens: User.ITokenFKUser[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFriendsByFKUserUuid(where: Buffer): Promise<User.IFriendFKUser[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND')
            .where('USER_FRIEND.user', where)
            .join('USER', 'USER.uuid', '=', 'USER_FRIEND.friend')
            .then((friends: User.IFriendFKUser[]) => {
                return friends;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFriend(friend: Partial<User.IFriend>) : Promise<User.IFriend[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND')
            .where(friend)
            .then((friends: User.IFriend[]) => {
                return friends;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async getFriendRequest(friendRequest: Partial<User.IFriendRequest>) : Promise<User.IFriendRequest[]> {
        return DatabaseKnex.getInstance().select().into('USER_FRIEND_REQUESTS')
            .where(friendRequest)
            .then((friendRequests: User.IFriendRequest[]) => {
                return friendRequests;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string),
                    sql: err?.sql,
                };
            });
    }

    public static async deleteFriend(where: Partial<User.IFriend>) {
        return DatabaseKnex.getInstance().delete().from('USER_FRIEND').where(where);
    }

    public static async deleteFriendRequest(friendRequest: Partial<User.IFriendRequest>) {
        return DatabaseKnex.getInstance().delete().from('USER_FRIEND_REQUESTS').where(friendRequest);
    }

    public static async addFriendRequest(friendRequest: Partial<User.IFriendRequest>) {
        return DatabaseKnex.getInstance().insert(friendRequest).into('USER_FRIEND_REQUESTS');
    }

    public static async addFriend(friend: Partial<User.IFriend>) {
        return DatabaseKnex.getInstance().insert(friend).into('USER_FRIEND');
    }

    public static async deleteToken(token: Partial<User.IToken>) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(token);
    }

    public static async addToken(token: Partial<User.IToken>) {
        return DatabaseKnex.getInstance().insert(token).into('USER_TOKEN');
    }

    /** Transaction Queries */
    private static async deleteTokenTransaction(where: Partial<User.IToken>, trx: Transaction) {
        return DatabaseKnex.getInstance().delete().from('USER_TOKEN').where(where).transacting(trx);
    }

    private static async getUserByFKTokenTransaction(token: Partial<User.IToken>, trx: Transaction): Promise<User.ITokenFKUser[]> {
        return DatabaseKnex.getInstance().select().from('USER_TOKEN')
            .join('USER', 'USER.uuid', '=', 'USER_TOKEN.userUuid')
            .where(token)
            .transacting(trx);
    }

    private static async updateUserTransaction(userReflect: Partial<User.IUser>, where: Partial<User.IUser>, trx: Transaction) {
        return DatabaseKnex.getInstance().update(userReflect).into('USER').where(where).transacting(trx);
    }

    public static async updateUserByTokenTransaction(userUpdate: Partial<User.IUser>, tokenForSearch: Partial<User.IToken>) {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {

            const tokenFKUsers: User.ITokenFKUser[] = await UserQueries.getUserByFKTokenTransaction(tokenForSearch, trx);
            if (tokenFKUsers.length === 0) {
                throw {
                    code: CodeError.UPDATE_USER_TRANSACTION,
                    message: MessageError.NO_USER_FOUND_BY_TOKEN,
                };
            }
            if ('password' in userUpdate)
                await UserQueries.deleteTokenTransaction({
                    token: tokenFKUsers[0]?.token,
                    userUuid: tokenFKUsers[0]?.userUuid,
                }, trx);
            await UserQueries.updateUserTransaction(userUpdate, {
                uuid: (tokenFKUsers[0] as User.ITokenFKUser).userUuid,
            }, trx);


        })
        .catch((err: ErrorDatabase) => {
            const message = DatabaseKnex.createBetterSqlMessageError(err?.code as string, err?.sqlMessage as string) ?? err?.message;
            throw {
                code: err?.code,
                message,
                sql: err?.sql,
            };
        });
    }
}
