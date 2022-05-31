import {SkillzboxDatabaseKnex, ErrorDatabase} from "../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../szbxModel";
import IModelUser = SzBxModel.User.IModelUser;


export class User {
    private static readonly TABLE_NAME: string = "USER";

    public static select(user: IModelUser): Promise<IModelUser[]> {
        return SkillzboxDatabaseKnex.getInstance().select().into(User.TABLE_NAME)
            .where(user)
            .then((users: IModelUser[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }

    public static insert(user: IModelUser) : IModelUser | never {
        return SkillzboxDatabaseKnex.getInstance().insert(user).into(User.TABLE_NAME)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                }
            });
    }
    public static update(where : IModelUser, user: IModelUser) : IModelUser | never {
        return SkillzboxDatabaseKnex.getInstance().update(user).into(User.TABLE_NAME)
            .where(where)
            .then(() => {
                return user;
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
