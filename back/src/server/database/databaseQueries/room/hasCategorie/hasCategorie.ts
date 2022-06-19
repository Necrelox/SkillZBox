import {DatabaseKnex, ErrorDatabase} from "../../../DatabaseKnex";
import * as Models from "../../../../model";

export class HasCategorie {
    private static readonly TABLE_NAME: string = "ROOM_HAS_CATEGORIE";

    public static select(hasCategorie: Models.Room.IHasCategorie): Promise<Models.Room.IHasCategorie[]> {
        return DatabaseKnex.getInstance().select().into(HasCategorie.TABLE_NAME)
            .where(hasCategorie)
            .then((hasCategories: Models.Room.IHasCategorie[]) => {
                return hasCategories;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(hasCategorie: Models.Room.IHasCategorie) : Models.Room.IHasCategorie | never {
        return DatabaseKnex.getInstance().insert(hasCategorie).into(HasCategorie.TABLE_NAME)
            .then(() => {
                return hasCategorie;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Room.IHasCategorie, hasCategorie: Models.Room.IHasCategorie) : Models.Room.IHasCategorie | never {
        return DatabaseKnex.getInstance().update(hasCategorie).into(HasCategorie.TABLE_NAME)
            .where(where)
            .then(() => {
                return hasCategorie;
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
