import {IModelRoomAction} from "./iModelRoomAction";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class RoomAction {
    private static readonly TABLE_NAME: string = "ROOM_ACTION";

    public select(roomAction: IModelRoomAction): Promise<IModelRoomAction[]> {
        return SkillzboxDatabaseKnex.getInstance().select(RoomAction.TABLE_NAME)
            .where(roomAction);
    }

    public static insert(roomAction: IModelRoomAction) : IModelRoomAction | never {
        return SkillzboxDatabaseKnex.getInstance()(RoomAction.TABLE_NAME).insert(roomAction)
            .then(() => {
                return roomAction;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
