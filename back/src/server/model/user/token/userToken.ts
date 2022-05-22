import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserToken = SzBxModel.User.IModelUserToken;

export class UserToken {
    private static readonly TABLE_NAME: string = "USER_TOKEN";

    public static select(token: IModelUserToken): Promise<IModelUserToken[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).select()
            .where(token);
    }

    public static insert(token: IModelUserToken) : IModelUserToken | never {
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).insert(token)
            .then(() => {
                return token;
            })
            .catch((err: any) => {
                throw err;
            });
    }

    public static delete(token: IModelUserToken) {
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).delete()
            .where(token)
            .catch((err: any) => {
                throw err;
            });
    }
}
