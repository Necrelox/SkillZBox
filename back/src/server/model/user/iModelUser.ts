export interface IModelUser {
    email?: string;
    username?: string;
    password?: Buffer;
    isVerified?: boolean;
    role?: string;
    isConnected?: boolean;
    isBlackListed?: boolean;
    createdAt?: Date;
}
