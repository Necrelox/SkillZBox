import {DatabaseKnex, ErrorDatabase} from "../../DatabaseKnex";
import * as Models from "../../../model";

export class Tag {
    private static readonly TABLE_NAME: string = "TAG";

    public static select(tag: Models.Tag.ITag): Promise<Models.Tag.ITag[]> {
        return DatabaseKnex.getInstance().select().into(Tag.TABLE_NAME)
            .where(tag)
            .then((tags: Models.Tag.ITag[]) => {
                return tags;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(tag: Models.Tag.ITag) : Models.Tag.ITag | never {
        return DatabaseKnex.getInstance().insert(tag).into(Tag.TABLE_NAME)
            .then(() => {
                return tag;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Tag.ITag, tag: Models.Tag.ITag) : Models.Tag.ITag | never {
        return DatabaseKnex.getInstance().update(tag).into(Tag.TABLE_NAME)
            .where(where)
            .then(() => {
                return tag;
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
