import {IModelRoom} from "./iModelRoom";
import {SkillzboxDatabaseKnex} from "../../database/skillzboxDatabaseKnex";

export class Room {
    private static readonly TABLE_NAME: string = "ROOM";

    public static select(room: IModelRoom): Promise<IModelRoom[]> {
        return SkillzboxDatabaseKnex.getInstance()(Room.TABLE_NAME).select()
            .where(room);
    }

    public static insert(room: IModelRoom) : IModelRoom | never {
        return SkillzboxDatabaseKnex.getInstance()(Room.TABLE_NAME).insert(room)
            .then(() => {
                return room;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
