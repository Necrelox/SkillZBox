import {randomBytes, pbkdf2Sync} from 'crypto';

export class PasswordEncrypt {
    public static encrypt(password: string): string {
        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return salt + hash;
    }

    public static compare(password: string, hashedPassword: string): boolean {
        const salt = hashedPassword.substring(0, 16);
        const hash2 = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return hashedPassword === salt + hash2;
    }
}
