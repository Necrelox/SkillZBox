import {IModelUserFriend} from "./iModelUserFriend";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserFriend {
    private static readonly TABLE_NAME: string = "USER_FRIEND";

    public select(friend: IModelUserFriend): Promise<IModelUserFriend[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserFriend.TABLE_NAME)
            .where(friend);
    }

    public static insert(friend: IModelUserFriend) : IModelUserFriend | never {
        return SkillzboxDatabaseKnex.getInstance()(UserFriend.TABLE_NAME).insert(friend)
            .then(() => {
                return friend;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
