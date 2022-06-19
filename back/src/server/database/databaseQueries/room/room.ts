import {DatabaseKnex, ErrorDatabase} from "../../DatabaseKnex";
import * as Models from "../../../model";

export class Room {
    private static readonly TABLE_NAME: string = "ROOM";

    public static select(room: Models.Room.IRoom): Promise<Models.Room.IRoom[]> {
        return DatabaseKnex.getInstance().select().into(Room.TABLE_NAME)
            .where(room)
            .then((rooms: Models.Room.IRoom[]) => {
                return rooms;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(room: Models.Room.IRoom) : Models.Room.IRoom | never {
        return DatabaseKnex.getInstance().insert(room).into(Room.TABLE_NAME)
            .then(() => {
                return room;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IRoom, room: Models.Room.IRoom) : Models.Room.IRoom | never {
        return DatabaseKnex.getInstance().update(room).into(Room.TABLE_NAME)
            .where(where)
            .then(() => {
                return room;
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
