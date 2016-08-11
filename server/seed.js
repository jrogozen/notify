import Promise from 'promise'
import path from 'path'
import chalk from 'chalk'

import { query } from './db'

function setup() {
  const promises = [
    query("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public; COMMENT ON SCHEMA public IS 'standard public schema'"),
  ]

  return Promise.all(promises)
}

function createEvents() {
  let queryString = `CREATE TABLE events(id SERIAL PRIMARY KEY not null, name TEXT, owner TEXT, type TEXT, active BOOL, start_time BIGINT, created_at BIGINT)`

  return query(queryString);
}

function createEventsUsers() {
  let queryString = `CREATE TABLE events_users(id SERIAL PRIMARY KEY not null, event_id INT REFERENCES events(id), user_email TEXT not null, attending TEXT)`

  return query(queryString)
}

function seed() {
  return Promise.all([createEvents(), createEventsUsers()])
    .then(() => console.log(chalk.blue.bold('we seeded')))
}

setup().then(() => seed()).then(() => process.exit())
