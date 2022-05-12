import {knex} from 'knex';

export class SkillzboxDatabaseKnex {
    private static instance: any;

    public static initializeDatabasePool() {
        SkillzboxDatabaseKnex.instance = knex({
            client: 'mysql2',
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,

            },
            pool: {
                min: 0,
                max: 10,
            },
            acquireConnectionTimeout: 10000,
        })
    }

    public static getInstance(): any {
        return SkillzboxDatabaseKnex.instance;
    }

}
