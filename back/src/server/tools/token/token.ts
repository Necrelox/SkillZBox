import {createHmac, randomUUID} from "crypto";

export class Token {
    public static readonly algo = 'sha256';

    public static generateToken(body: Buffer): string {
        const hashedUserEmail = createHmac('sha256', randomUUID())
            .update(body)
            .digest('hex');
        const token = randomUUID();
        return token + '.' + hashedUserEmail + '.' + createHmac('sha256', 'szbx')
            .update(token + hashedUserEmail)
            .digest('hex');
    }

    public static tockenChecker(token: string) {
        const [header, body, signature] = token.split('.');

        const recreateSignature = createHmac('sha256', 'szbx')
            .update(header! + body!)
            .digest('hex');
        // console.log("recreateSignature :"); // todo
        // console.log(recreateSignature);
        // console.log("signature :");
        // console.log(signature);
        return recreateSignature === signature;
    }
}
