export interface IModelUserToken {
    createdAt?: Date;
    expireAt?: Date;
    token?: string;
    userUuid?: Buffer;
}
