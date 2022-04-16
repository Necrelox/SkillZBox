export interface IModelUser {
    email?: string;
    username?: string;
    password?: string;
    token?: string;
    isVerified?: boolean;
    role?: string;
    isConnected?: boolean;
    isBlackListed?: boolean;
    createdAt?: string;
    uuid?: string;
}
