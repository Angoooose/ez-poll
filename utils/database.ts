import { Pool } from 'pg';
import pgConfig from '../postgres.config.json';

let database: Pool|undefined;

if (!database) {
    database = new Pool(pgConfig);
}

export default database as Pool;