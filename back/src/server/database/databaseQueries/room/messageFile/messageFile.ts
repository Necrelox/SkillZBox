import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class MessageFile {
    private static readonly TABLE_NAME: string = "ROOM_MESSAGE_FILE";

    public static select(messageFile: Models.Room.IMessageFile): Promise<Models.Room.IMessageFile[]> {
        return DatabaseKnex.getInstance().select().into(MessageFile.TABLE_NAME)
            .where(messageFile)
            .then((messageFiles: Models.Room.IMessageFile[]) => {
                return messageFiles;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(messageFile: Models.Room.IMessageFile) : Models.Room.IMessageFile | never {
        return DatabaseKnex.getInstance().insert(messageFile).into(MessageFile.TABLE_NAME)
            .then(() => {
                return messageFile;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IMessageFile, messageFile: Models.Room.IMessageFile) : Models.Room.IMessageFile | never {
        return DatabaseKnex.getInstance().update(messageFile).into(MessageFile.TABLE_NAME)
            .where(where)
            .then(() => {
                return messageFile;
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
