import { Pool } from 'pg';

let database: Pool|undefined;

if (!database) {
    database = new Pool({
        host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });
}

export default database as Pool;