import {ErrorDatabase, SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserIp = SzBxModel.User.IModelUserIp;

export class UserIp {
    private static readonly TABLE_NAME: string = "USER_IP";

    public static select(ip: IModelUserIp): Promise<IModelUserIp[]> {
        return SkillzboxDatabaseKnex.getInstance().select().into(UserIp.TABLE_NAME)
            .where(ip)
            .then((result: IModelUserIp[]) => {
                return result;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static insert(ip: IModelUserIp) : IModelUserIp | never {
        return SkillzboxDatabaseKnex.getInstance().insert(ip).into(UserIp.TABLE_NAME)
            .then(() => {
                return ip;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static update(where: IModelUserIp, ip: IModelUserIp) : IModelUserIp | never {
        return SkillzboxDatabaseKnex.getInstance()(UserIp.TABLE_NAME).update(ip)
            .where(where)
            .then(() => {
                return ip;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }
}
