import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class HasTag {
    private static readonly TABLE_NAME: string = "ROOM_HAS_TAG";

    public static select(hasTag: Models.Room.IHasTag): Promise<Models.Room.IHasTag[]> {
        return DatabaseKnex.getInstance().select().into(HasTag.TABLE_NAME)
            .where(hasTag)
            .then((hasTags: Models.Room.IHasTag[]) => {
                return hasTags;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(hasTag: Models.Room.IHasTag) : Models.Room.IHasTag | never {
        return DatabaseKnex.getInstance().insert(hasTag).into(HasTag.TABLE_NAME)
            .then(() => {
                return hasTag;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IHasTag, hasTag: Models.Room.IHasTag) : Models.Room.IHasTag | never {
        return DatabaseKnex.getInstance().update(hasTag).into(HasTag.TABLE_NAME)
            .where(where)
            .then(() => {
                return hasTag;
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
