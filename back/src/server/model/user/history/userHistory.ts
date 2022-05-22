import {IModelUserHistory} from "./iModelUserHistory";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserHistory {
    private static readonly TABLE_NAME: string = "USER_HISTORY";

    public static select(history: IModelUserHistory): Promise<IModelUserHistory[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserHistory.TABLE_NAME).select()
            .where(history);
    }

    public static insert(history: IModelUserHistory) : IModelUserHistory | never {
        return SkillzboxDatabaseKnex.getInstance()(UserHistory.TABLE_NAME).insert(history)
            .then(() => {
                return history;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
