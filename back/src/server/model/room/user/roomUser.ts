import {IModelRoomUser} from "./iModelRoomUser";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class RoomUser {
    private static readonly TABLE_NAME: string = "ROOM_USER";

    public static select(roomUser: IModelRoomUser): Promise<IModelRoomUser[]> {
        return SkillzboxDatabaseKnex.getInstance()(RoomUser.TABLE_NAME).select()
            .where(roomUser);
    }

    public static insert(roomUser: IModelRoomUser) : IModelRoomUser | never {
        return SkillzboxDatabaseKnex.getInstance()(RoomUser.TABLE_NAME).insert(roomUser)
            .then(() => {
                return roomUser;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}