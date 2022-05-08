import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserIp = SzBxModel.User.IModelUserIp;

export class UserIp {
    private static readonly TABLE_NAME: string = "USER_IP";

    public static select(ip: IModelUserIp): Promise<IModelUserIp[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserIp.TABLE_NAME).select()
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

    public static update(where: IModelUserIp, ip: IModelUserIp) : IModelUserIp | never {
        return SkillzboxDatabaseKnex.getInstance()(UserIp.TABLE_NAME).update(ip)
            .where(where)
            .then(() => {
                return ip;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
