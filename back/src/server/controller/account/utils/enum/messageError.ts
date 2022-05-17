export enum MessageError {
    MISSING_PARAMETER = 'Missing parameter.',
    USERNAME_BAD_SYNTAX = 'Username contains invalid characters. Has to be alphanumeric.',
    USER_NOT_FOUND = 'User not found.',
    USER_ALREADY_VERIFIED = 'User already verified.',
    USER_NOT_VERIFIED = 'User not verified.',
    USER_IS_BLACKLISTED = 'User is blacklisted.',
    LOGIN_INVALID_PASSWORD = 'Invalid password.',
    TOKEN_NOT_FOUND = 'Token not found.',
    TOKEN_NOT_FOUND_AFTER_GENERATE = 'Token not found after generate.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
    TOKEN_EXPIRED = 'Token expired, new token generated.',
}
