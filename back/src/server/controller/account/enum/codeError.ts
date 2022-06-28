export enum CodeError {
    CHECK_POST_CONTAIN_MAIL_OR_USERNAME_AND_PASSWORD = 'AccountUtils::checkPostContainMailORUsernameANDPassword',
    CHECK_POST_CONTAIN_MAIL_AND_USERNAME_AND_PASSWORD = 'AccountUtils:checkPostContainMailANDUserANDPassword',
    CHECK_POST_CONTAIN_IP_AND_MACADDRESS_AND_DEVICE_TYPE = 'AccountUtils::checkPostContainIpANDMacAddressANDDeviceType',
    SET_VERIFY_USER = 'AccountUtils::setVerifyUser',
    CHECK_USER_IS_BLACKLISTED = 'AccountUtils:checkUserIsBlacklisted',
    CHECK_USER_IS_VERIFIED = 'AccountUtils:checkUserIsVerified',
    CHECK_USER_PASSWORD = 'AccountUtilsError:checkUserPassword',
    VERIFY_LOGIN_AND_RETURN_USER = 'AccountUtilsError:verifyLoginAndReturnUser',
    VERIFY_TOKEN_EXPIRATION_AND_SEND_MAIL = 'AccountUtils::verifyTokenExpirationAndSendMail',
    VERIFY_TOKEN_SIGNATURE = 'AccountUtils::verifyTokenSignature',
}
