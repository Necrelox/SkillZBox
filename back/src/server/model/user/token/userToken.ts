import {ErrorDatabase, SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserToken = SzBxModel.User.IModelUserToken;

export class UserToken {
    private static readonly TABLE_NAME: string = "USER_TOKEN";

    public static select(token: IModelUserToken): Promise<IModelUserToken[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).select()
            .where(token)
            .then((tokens: IModelUserToken[]) => {
                return tokens;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(token: IModelUserToken) : IModelUserToken | never {
        return SkillzboxDatabaseKnex.getInstance().insert(token).into(UserToken.TABLE_NAME)
            .then(() => {
                return token;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static delete(token: IModelUserToken) {
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).delete()
            .where(token)
            .then(() => {
                return token;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
}
