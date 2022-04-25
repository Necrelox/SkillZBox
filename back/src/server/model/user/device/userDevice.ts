import {IModelUserDevice} from "./iModelUserDevice";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

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
}
