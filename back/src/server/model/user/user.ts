import {IModel} from "server/model/iModel";
import {IModelUser} from "./iModelUser";
import {SkillzboxDatabase} from "../../database/skillzboxDatabase";

export class User implements IModel {

    read(data: any): void {
    }

    update(data: any): void {
    }

    write(arg : IModelUser): void {
        SkillzboxDatabase.executeQuery(
            "INSERT INTO users (email, username, password, token, is_verified, role, is_connected, is_blackListed, created_at, uuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [arg.email, arg.username, arg.password, arg.token, arg.isVerified, arg.role, arg.isConnected, arg.isBlackListed, arg.createdAt, arg.uuid],
        )
    }

    delete(data: any): void {
    }
}
