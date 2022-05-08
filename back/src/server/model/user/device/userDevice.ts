import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";
import {SzBxModel} from "../../szbxModel";
import IModelUserDevice = SzBxModel.User.IModelUserDevice;

export class UserDevice {
    private static readonly TABLE_NAME: string = "USER_DEVICE";

    public static select(device: IModelUserDevice): Promise<IModelUserDevice[]> {
        return SkillzboxDatabaseKnex.getInstance()(UserDevice.TABLE_NAME).select()
            .where(device);
    }

    public static insert(device: IModelUserDevice) : IModelUserDevice | never {
        return SkillzboxDatabaseKnex.getInstance()(UserDevice.TABLE_NAME).insert(device)
            .then(() => {
                return device;
            })
            .catch((err: any) => {
                throw err;
            });
    }

    public static update(where : IModelUserDevice, device: IModelUserDevice) : IModelUserDevice | never {
        return SkillzboxDatabaseKnex.getInstance()(UserDevice.TABLE_NAME).update(device)
            .where(where)
            .then(() => {
                return device;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
