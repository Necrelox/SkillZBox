export enum MessageError {
    GET_TOKEN_BY_REFLECT = 'Token not found.',
    GET_USER_BY_REFLECT = 'User not found.',
    CHECK_SYNTAX_USERNAME = 'Username contains invalid characters. Has to be alphanumeric.',
    CHECK_LENGTH_USERNAME = 'Username length is too short or too long. (min: 4, max: 20)',
    CHECK_LENGTH_PASSWORD = 'Password length is too short or too long. (min: 6, max: 20)',
    CHECK_SYNTAX_PASSWORD = 'Password do contain one majuscule and one number minimum.',
}
