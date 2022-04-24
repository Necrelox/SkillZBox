import {Mailer as _mailer} from "./mail/mailer";
import {PasswordEncrypt as _PasswordEncrypt} from "./passwordEncrypt/passwordEncrypt"

export namespace SzbxTools {
    export const Mailer = _mailer;
    export const PasswordEncrypt = _PasswordEncrypt;
}
