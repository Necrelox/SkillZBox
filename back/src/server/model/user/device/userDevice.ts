import {ErrorDatabase, SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserDevice = SzBxModel.User.IModelUserDevice;

export class UserDevice {
    private static readonly TABLE_NAME: string = "USER_DEVICE";

    public static select(device: IModelUserDevice): Promise<IModelUserDevice[]> {
        return SkillzboxDatabaseKnex.getInstance().select().into(UserDevice.TABLE_NAME)
            .where(device)
            .then((result: IModelUserDevice[]) => {
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

    public static insert(device: IModelUserDevice) : IModelUserDevice | never {
        return SkillzboxDatabaseKnex.getInstance().insert(device).into(UserDevice.TABLE_NAME)
            .then(() => {
                return device;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }

    public static update(where : IModelUserDevice, device: IModelUserDevice) : IModelUserDevice | never {
        return SkillzboxDatabaseKnex.getInstance().update(device).into(UserDevice.TABLE_NAME)
            .where(where)
            .then(() => {
                return device;
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
