import {ErrorDatabase, SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserMacAddress = SzBxModel.User.IModelUserMacAddress;

export class UserMacAddress {
    private static readonly TABLE_NAME: string = "USER_MACADDRESS";

    public static select(macAddress: IModelUserMacAddress): Promise<IModelUserMacAddress[]> {
        return SkillzboxDatabaseKnex.getInstance().select().into(UserMacAddress.TABLE_NAME)
            .where(macAddress)
            .then((result: IModelUserMacAddress[]) => {
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

    public static insert(macAddress: IModelUserMacAddress) : IModelUserMacAddress | never {
        return SkillzboxDatabaseKnex.getInstance().insert(macAddress).into(UserMacAddress.TABLE_NAME)
            .then(() => {
                return macAddress;
            })
            .catch((err: ErrorDatabase) => {
                throw {
                    code: err?.code,
                    message: SkillzboxDatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                    sql: err?.sql,
                };
            });
    }
    public static update(where : IModelUserMacAddress, macAddress: IModelUserMacAddress) : IModelUserMacAddress | never {
        return SkillzboxDatabaseKnex.getInstance().update(macAddress).into(UserMacAddress.TABLE_NAME)
            .where(where)
            .then(() => {
                return macAddress;
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
