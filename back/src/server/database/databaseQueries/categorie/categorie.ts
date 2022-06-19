import {DatabaseKnex, ErrorDatabase} from "../../DatabaseKnex";
import * as Models from "../../../model";

export class Categorie {
    private static readonly TABLE_NAME: string = "CATEGORIE";

    public static select(categorie: Models.Categorie.ICategorie): Promise<Models.Categorie.ICategorie[]> {
        return DatabaseKnex.getInstance().select().into(Categorie.TABLE_NAME)
            .where(categorie)
            .then((categories: Models.Categorie.ICategorie[]) => {
                return categories;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(categorie: Models.Categorie.ICategorie) : Models.Categorie.ICategorie | never {
        return DatabaseKnex.getInstance().insert(categorie).into(Categorie.TABLE_NAME)
            .then(() => {
                return categorie;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : Models.Categorie.ICategorie, categorie: Models.Categorie.ICategorie) : Models.Categorie.ICategorie | never {
        return DatabaseKnex.getInstance().update(categorie).into(Categorie.TABLE_NAME)
            .where(where)
            .then(() => {
                return categorie;
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
