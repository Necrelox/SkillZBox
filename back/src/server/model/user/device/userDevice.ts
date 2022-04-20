import {IModelUserDevice} from "./iModelUserDevice";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserDevice {
    private static readonly TABLE_NAME: string = "USER_DEVICE";

    public select(device: IModelUserDevice): Promise<IModelUserDevice[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserDevice.TABLE_NAME)
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
