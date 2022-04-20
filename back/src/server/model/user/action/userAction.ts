import {IModelUserAction} from "./iModelUserAction";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserAction {
    private static readonly TABLE_NAME: string = "USER_ACTION";

    public select(action: IModelUserAction): Promise<IModelUserAction[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserAction.TABLE_NAME)
            .where(action);
    }

    public static insert(action: IModelUserAction) : IModelUserAction | never {
        return SkillzboxDatabaseKnex.getInstance()(UserAction.TABLE_NAME).insert(action)
            .then(() => {
                return action;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
