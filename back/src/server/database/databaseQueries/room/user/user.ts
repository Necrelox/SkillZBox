import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class User {
    private static readonly TABLE_NAME: string = "ROOM_USER";

    public static select(user: Models.Room.IUser): Promise<Models.Room.IUser[]> {
        return DatabaseKnex.getInstance().select().into(User.TABLE_NAME)
            .where(user)
            .then((users: Models.Room.IUser[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(user: Models.Room.IUser) : Models.Room.IUser | never {
        return DatabaseKnex.getInstance().insert(user).into(User.TABLE_NAME)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IUser, user: Models.Room.IMessage) : Models.Room.IMessage | never {
        return DatabaseKnex.getInstance().update(user).into(User.TABLE_NAME)
            .where(where)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
}
