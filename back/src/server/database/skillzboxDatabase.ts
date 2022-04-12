import {createPool} from "mysql2";
import {Pool} from "mysql2/promise";

export class SkillzboxDatabase {
    private static connection: Pool;

    public static initializeDatabasePool() {
        SkillzboxDatabase.connection = createPool({
            host: process.env["DB_HOST"],
            user: process.env["DB_USER"],
            password: process.env["DB_PASSWORD"],
            database: process.env["DB_NAME"],
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }).promise();
    }

    public static async getConnection(): Promise<any> {
        return await SkillzboxDatabase.connection.getConnection();
    }

    public static async releaseConnection(connection: any) {
        connection.release();
    }

    public static async executeQuery(query: string, params: any[]): Promise<any> {
        const connection = await SkillzboxDatabase.getConnection();
        const [rows, fields] = await connection.execute(query, params);
        await SkillzboxDatabase.releaseConnection(connection);
        return [rows, fields];
    }

    public static async closeDatabasePool() {
        await SkillzboxDatabase.connection.end();
    }
}
