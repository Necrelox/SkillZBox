import {Request, Response, NextFunction} from 'express';
import * as Tools from 'server/tools';
import * as Models from 'server/model';
import * as DBQueries from 'server/database';

export enum CodeError {
    GET_TOKEN_BY_REFLECT = 'BearerToken::getTokenByReflect',
    VERIFY_TOKEN_EXPIRATION = 'BearerToken::verifyExpiration',
    VERIFY_TOKEN_SIGNATURE = 'BearerToken::verifySignature',
}

export enum MessageError {
    TOKEN_NOT_FOUND = 'Token not found.',
    TOKEN_EXPIRED = 'Token expired.',
    TOKEN_INVALID_SIGNATURE = 'Token invalid signature.',
}


export class BearerToken {
    private static async getTokenByReflect(tokenReflect: string): Promise<Models.User.IToken> {
        const token: Models.User.IToken[] = await DBQueries.AccountQueries.getToken({token: tokenReflect});
        if (!token || token.length === 0)
            throw {
                code: CodeError.GET_TOKEN_BY_REFLECT,
                message: MessageError.TOKEN_NOT_FOUND
            };
        return token[0]!;
    }

    private static async verifyExpiration(token: Models.User.IToken) {
        if (token!.expireAt! < new Date())
            throw {
                code: CodeError.VERIFY_TOKEN_EXPIRATION,
                message: MessageError.TOKEN_EXPIRED
            };
    }

    private static async verifySignature(token: string) {
        if (!Tools.Token.signatureChecker(token))
            throw {
                code: CodeError.VERIFY_TOKEN_SIGNATURE,
                message: MessageError.TOKEN_INVALID_SIGNATURE
            };
    }

    public static async checkToken(req: Request, res: Response, next: NextFunction) {
        try {
            const bearerToken = (req.headers.authorization);
            await BearerToken.verifySignature(bearerToken!.split(' ')[1]!);
            const token: Models.User.IToken = await BearerToken.getTokenByReflect(bearerToken!.split(' ')[1]!);
            await BearerToken.verifyExpiration(token);
            next();
        } catch (error: any) {
            res.status(401).json({
                content: error
            });
        }
    }
}
