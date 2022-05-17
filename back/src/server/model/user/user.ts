import {SkillzboxDatabaseKnex, ErrorDatabase} from "../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../szbxModel";
import IModelUser = SzBxModel.User.IModelUser;


export class User {
    private static readonly TABLE_NAME: string = "USER";

    public static select(user: IModelUser): Promise<IModelUser[]> {
        return SkillzboxDatabaseKnex.getInstance()(User.TABLE_NAME).select()
            .where(user)
            .then((users: IModelUser[]) => {
                return users;
            }).catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: err?.message,
                }
            });
    }

    public static insert(user: IModelUser) : IModelUser | never {
        return SkillzboxDatabaseKnex.getInstance()(User.TABLE_NAME).insert(user)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: err?.message,
                }
            });
    }
    public static update(where : IModelUser, user: IModelUser) : IModelUser | never {
        return SkillzboxDatabaseKnex.getInstance()(User.TABLE_NAME).update(user)
            .where(where)
            .then(() => {
                return user;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: err?.message,
                }
            });
    }
}
