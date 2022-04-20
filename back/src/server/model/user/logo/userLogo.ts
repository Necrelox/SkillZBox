import {IModelUserLogo} from "./iModelUserLogo";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserLogo {
    private static readonly TABLE_NAME: string = "USER_LOGO";

    public select(logo: IModelUserLogo): Promise<IModelUserLogo[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserLogo.TABLE_NAME)
            .where(logo);
    }

    public static insert(logo: IModelUserLogo) : IModelUserLogo | never {
        return SkillzboxDatabaseKnex.getInstance()(UserLogo.TABLE_NAME).insert(logo)
            .then(() => {
                return logo;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
