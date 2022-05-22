import {IModelRoomMessage} from "./iModelRoomMessage";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class RoomMessage {
    private static readonly TABLE_NAME: string = "ROOM_MESSAGE";

    public static select(roomMessage: IModelRoomMessage): Promise<IModelRoomMessage[]> {
        return SkillzboxDatabaseKnex.getInstance()(RoomMessage.TABLE_NAME).select()
            .where(roomMessage);
    }

    public static insert(roomMessage: IModelRoomMessage) : IModelRoomMessage | never {
        return SkillzboxDatabaseKnex.getInstance()(RoomMessage.TABLE_NAME).insert(roomMessage)
            .then(() => {
                return roomMessage;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
