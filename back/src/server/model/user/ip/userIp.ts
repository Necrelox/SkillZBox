import {IModelUserIp} from "./iModelUserIp";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserIp {
    private static readonly TABLE_NAME: string = "USER_IP";

    public select(ip: IModelUserIp): Promise<IModelUserIp[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserIp.TABLE_NAME)
            .where(ip);
    }

    public static insert(ip: IModelUserIp) : IModelUserIp | never {
        return SkillzboxDatabaseKnex.getInstance()(UserIp.TABLE_NAME).insert(ip)
            .then(() => {
                return ip;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
