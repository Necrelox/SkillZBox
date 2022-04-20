import {IModelTag} from "./iModelTag";
import {SkillzboxDatabaseKnex} from "../../database/skillzboxDatabaseKnex";

export class Tag {
    private static readonly TABLE_NAME: string = "TAG";

    public select(tag: IModelTag): Promise<IModelTag[]> {
        return SkillzboxDatabaseKnex.getInstance().select(Tag.TABLE_NAME)
            .where(tag);
    }

    public static insert(tag: IModelTag) : IModelTag | never {
        return SkillzboxDatabaseKnex.getInstance()(Tag.TABLE_NAME).insert(tag)
            .then(() => {
                return tag;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
