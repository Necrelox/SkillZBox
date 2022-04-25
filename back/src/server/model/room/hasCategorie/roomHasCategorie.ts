import {IModelRoomHasCategorie} from "./iModelRoomHasCategorie";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class RoomHasCategorie {
    private static readonly TABLE_NAME: string = "ROOM_HAS_CATEGORIE";

    public static select(roomHasCategorie: IModelRoomHasCategorie): Promise<IModelRoomHasCategorie[]> {
        return SkillzboxDatabaseKnex.getInstance()(RoomHasCategorie.TABLE_NAME).select()
            .where(roomHasCategorie);
    }

    public static insert(roomHasCategorie: IModelRoomHasCategorie) : IModelRoomHasCategorie | never {
        return SkillzboxDatabaseKnex.getInstance()(RoomHasCategorie.TABLE_NAME).insert(roomHasCategorie)
            .then(() => {
                return roomHasCategorie;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
