import {IModelUserMessage} from "./iModelUserMessage";
import {SkillzboxDatabaseKnex} from "../../../database/skillzboxDatabaseKnex";

export class UserMessage {
    private static readonly TABLE_NAME: string = "USER_MESSAGE";

    public select(message: IModelUserMessage): Promise<IModelUserMessage[]> {
        return SkillzboxDatabaseKnex.getInstance().select(UserMessage.TABLE_NAME)
            .where(message);
    }

    public static insert(message: IModelUserMessage) : IModelUserMessage | never {
        return SkillzboxDatabaseKnex.getInstance()(UserMessage.TABLE_NAME).insert(message)
            .then(() => {
                return message;
            })
            .catch((err: any) => {
                throw err;
            });
    }
}
