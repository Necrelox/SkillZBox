import {IModelUserToken} from "./iModelUserToken";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserToken {
    private static readonly TABLE_NAME: string = "USER_TOKEN";

    public static select(token: IModelUserToken): Promise<IModelUserToken[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).select()
            .where(token);
    }

    public static insert(token: IModelUserToken) : IModelUserToken | never {
        console.log(token);
        return SkillzboxDatabaseKnex.getInstance()(UserToken.TABLE_NAME).insert(token)
            .then(() => {
                return token;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
