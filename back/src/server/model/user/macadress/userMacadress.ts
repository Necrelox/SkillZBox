import {IModelUserMacAdress} from "./iModelUserMacAdress";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserMacadress {
    private static readonly TABLE_NAME: string = "USER_MACADDRESS";

    public select(macaddress: IModelUserMacAdress): Promise<IModelUserMacAdress[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserMacadress.TABLE_NAME)
            .where(macaddress);
    }

    public static insert(macaddress: IModelUserMacAdress) : IModelUserMacAdress | never {
        return SkillzboxDatabaseKnex.getInstance()(UserMacadress.TABLE_NAME).insert(macaddress)
            .then(() => {
                return macaddress;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
