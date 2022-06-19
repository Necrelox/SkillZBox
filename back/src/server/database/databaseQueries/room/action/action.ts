import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class Action {
    private static readonly TABLE_NAME: string = "ROOM_ACTION";

    public static select(action: Models.Room.IAction): Promise<Models.Room.IAction[]> {
        return DatabaseKnex.getInstance().select().into(Action.TABLE_NAME)
            .where(action)
            .then((actions: Models.Room.IAction[]) => {
                return actions;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(action: Models.Room.IAction) : Models.Room.IAction | never {
        return DatabaseKnex.getInstance().insert(action).into(Action.TABLE_NAME)
            .then(() => {
                return action;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IAction, action: Models.Room.IAction) : Models.Room.IAction | never {
        return DatabaseKnex.getInstance().update(action).into(Action.TABLE_NAME)
            .where(where)
            .then(() => {
                return action;
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
