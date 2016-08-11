import pg from 'pg'
import { query as dbQuery } from '../utils/dbUtils'

console.log('db file is being loaded!');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/notify'
const client = new pg.Client(connectionString)

client.connect()

export const query = dbQuery(client)