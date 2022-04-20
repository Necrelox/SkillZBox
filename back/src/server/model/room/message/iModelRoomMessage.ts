export interface IModelRoomMessage {
    message: string;
    createdAt?: Date;
    hasFile?: boolean;
    roomUserUuid: string;
    uuid?: string;
}
