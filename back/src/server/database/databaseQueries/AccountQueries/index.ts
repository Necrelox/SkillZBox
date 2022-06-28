import {DatabaseKnex, Transaction, ErrorDatabase} from '../../DatabaseKnex'
import {User} from "../../../model";
import * as Tools from "../../../tools";

export class AccountQueries {

    public static async createAccountTransaction(userReflect: User.IUser) : Promise<Transaction> {
        const knex = await DatabaseKnex.getInstance();
        return knex.transaction(async (trx: Transaction) => {
            await knex.insert(userReflect).into('USER').transacting(trx);

            const user: User.IUser[] = await knex.select().into('USER').where({
                email: userReflect.email,
                username: userReflect.username,
            }).transacting(trx);

            await knex.delete().from('USER_TOKEN').where({userUuid: user[0]!.uuid}).transacting(trx);

            await knex.insert({
                token: Tools.Token.generateToken(user[0]!.uuid!),
                userUuid: user[0]!.uuid,
                expireAt: new Date(Date.now() + (1000 * 60 * 60))
            }).into('USER_TOKEN').where({userUuid: user[0]!.uuid}).transacting(trx);

        }).then((trx: Transaction) => {
            return trx;
        }).catch((err: ErrorDatabase) => {
            throw {
                code: err?.code,
                message: DatabaseKnex.createBetterSqlMessageError(err?.code!, err?.sqlMessage!),
                sql: err?.sql,
            }
        });
    }
}
