import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Message {
    private static readonly TABLE_NAME: string = "ROOM_MESSAGE";

    public static select(message: Models.Room.IMessage): Promise<Models.Room.IMessage[]> {
        return DatabaseKnex.getInstance().select().into(Message.TABLE_NAME)
            .where(message)
            .then((messages: Models.Room.IMessage[]) => {
                return messages;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(message: Models.Room.IMessage) : Models.Room.IMessage | never {
        return DatabaseKnex.getInstance().insert(message).into(Message.TABLE_NAME)
            .then(() => {
                return message;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IMessage, message: Models.Room.IMessage) : Models.Room.IMessage | never {
        return DatabaseKnex.getInstance().update(message).into(Message.TABLE_NAME)
            .where(where)
            .then(() => {
                return message;
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
