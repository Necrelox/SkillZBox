export interface IModelUser {
    email: string;
    username: string;
    password: string;
    isVerified?: boolean;
    role?: string;
    isConnected?: boolean;
    isBlackListed?: boolean;
    createdAt?: Date;
    uuid?: Buffer;
}
