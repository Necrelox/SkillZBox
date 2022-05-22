import {Mailer as _mailer} from "./mail/mailer";
import {PasswordEncrypt as _PasswordEncrypt} from "./passwordEncrypt/passwordEncrypt";
import {Token as _Token} from "./token/token";

export namespace SzbxTools {
    export const Mailer = _mailer;
    export const PasswordEncrypt = _PasswordEncrypt;
    export const Token = _Token;
}
