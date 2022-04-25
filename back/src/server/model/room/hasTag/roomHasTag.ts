import {IModelRoomHasTag} from "./iModelRoomHasTag";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class RoomHasTag {
    private static readonly TABLE_NAME: string = "ROOM_HAS_TAG";

    public static select(roomHasTag: IModelRoomHasTag): Promise<IModelRoomHasTag[]> {
        return SkillzboxDatabaseKnex.getInstance()(RoomHasTag.TABLE_NAME).select()
            .where(roomHasTag);
    }

    public static insert(roomHasTag: IModelRoomHasTag) : IModelRoomHasTag | never {
        return SkillzboxDatabaseKnex.getInstance()(RoomHasTag.TABLE_NAME).insert(roomHasTag)
            .then(() => {
                return roomHasTag;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
