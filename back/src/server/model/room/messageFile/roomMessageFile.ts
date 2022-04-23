import {IModelRoomMessageFile} from "./iModelRoomMessageFile";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class RoomMessageFile {
    private static readonly TABLE_NAME: string = "ROOM_MESSAGE_FILE";

    public select(roomMessageFile: IModelRoomMessageFile): Promise<IModelRoomMessageFile[]> {
        return SkillzboxDatabaseKnex.getInstance().select(RoomMessageFile.TABLE_NAME)
            .where(roomMessageFile);
    }

    public static insert(roomMessageFile: IModelRoomMessageFile) : IModelRoomMessageFile | never {
        return SkillzboxDatabaseKnex.getInstance()(RoomMessageFile.TABLE_NAME).insert(roomMessageFile)
            .then(() => {
                return roomMessageFile;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
