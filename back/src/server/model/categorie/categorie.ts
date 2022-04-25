import {IModelCategorie} from "./iModelCategorie";
import {SkillzboxDatabaseKnex} from "../../database/skillzboxDatabaseKnex";

export class Categorie {
    private static readonly TABLE_NAME: string = "CATEGORIE";

    public static select(categorie: IModelCategorie): Promise<IModelCategorie[]> {
        return SkillzboxDatabaseKnex.getInstance()(Categorie.TABLE_NAME).select()
            .where(categorie);
    }

    public static insert(categorie: IModelCategorie) : IModelCategorie | never {
        return SkillzboxDatabaseKnex.getInstance()(Categorie.TABLE_NAME).insert(categorie)
            .then(() => {
                return categorie;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
