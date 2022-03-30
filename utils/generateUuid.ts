import database from './database';

export default async function generateUuid(table: 'users'|'polls'): Promise<string> {
    const uuid: string = Math.random().toString(36).substr(2, 9);
    const existQueury = await database.query(`SELECT * FROM ${table} WHERE id = $1`, [uuid]);
    if (existQueury.rowCount === 0) {
        return uuid;
    } else {
        return generateUuid(table);
    }
}