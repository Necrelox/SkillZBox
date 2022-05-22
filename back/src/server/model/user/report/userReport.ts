import {IModelUserReport} from "./iModelUserReport";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserReport {
    private static readonly TABLE_NAME: string = "USER_REPORT";

    public static select(report: IModelUserReport): Promise<IModelUserReport[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserReport.TABLE_NAME).select()
            .where(report);
    }

    public static insert(report: IModelUserReport) : IModelUserReport | never {
        return SkillzboxDatabaseKnex.getInstance()(UserReport.TABLE_NAME).insert(report)
            .then(() => {
                return report;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
