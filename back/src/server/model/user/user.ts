import {IModelUser} from "./iModelUser";
import {SkillzboxDatabaseKnex} from "../../database/skillzboxDatabaseKnex";

export class User {
    private static readonly TABLE_NAME: string = "USER";
    // private static instance = SkillzboxDatabaseKnex.getInstance();

    public static select(user: IModelUser): Promise<IModelUser[]> {
        return SkillzboxDatabaseKnex.getInstance()(User.TABLE_NAME).select()
            .where(user);
    }

    public static insert(user: IModelUser) : IModelUser | never {
        return SkillzboxDatabaseKnex.getInstance()(User.TABLE_NAME).insert(user)
            .then(() => {
                return user;
            })
            .catch((err: any) => {
                throw err;
            });
    }
    public static update(where : IModelUser, user: IModelUser) : IModelUser | never {
        return SkillzboxDatabaseKnex.getInstance()(User.TABLE_NAME).update(user)
            .where(where)
            .then(() => {
                return user;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
