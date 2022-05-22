import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserMacAddress = SzBxModel.User.IModelUserMacAddress;

export class UserMacAddress {
    private static readonly TABLE_NAME: string = "USER_MACADDRESS";

    public static select(macAddress: IModelUserMacAddress): Promise<IModelUserMacAddress[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserMacAddress.TABLE_NAME).select()
            .where(macAddress);
    }

    public static insert(macAddress: IModelUserMacAddress) : IModelUserMacAddress | never {
        return SkillzboxDatabaseKnex.getInstance()(UserMacAddress.TABLE_NAME).insert(macAddress)
            .then(() => {
                return macAddress;
            })
            .catch((err: any) => {
                throw err;
            });
    }
    public static update(where : IModelUserMacAddress, macAddress: IModelUserMacAddress) : IModelUserMacAddress | never {
        return SkillzboxDatabaseKnex.getInstance()(UserMacAddress.TABLE_NAME).update(macAddress)
            .where(where)
            .then(() => {
                return macAddress;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
