export enum MessageError {
    MISSING_PARAMETER = 'Missing parameter.',
    USER_ALREADY_VERIFIED = 'User already verified.',
    USER_NOT_VERIFIED = 'User not verified.',
    USER_IS_BLACKLISTED = 'User is blacklisted.',
    INVALID_PASSWORD = 'Invalid password.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
    TOKEN_EXPIRED = 'Token expired, new token generated.',
}
