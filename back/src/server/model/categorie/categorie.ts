import {IModelCategorie} from "./iModelCategorie";
import {SkillzboxDatabaseKnex} from "../../database/skillzboxDatabaseKnex";

export class Categorie {
    private static readonly TABLE_NAME: string = "CATEGORIE";

    public select(categorie: IModelCategorie): Promise<IModelCategorie[]> {
        return SkillzboxDatabaseKnex.getInstance().select(Categorie.TABLE_NAME)
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
