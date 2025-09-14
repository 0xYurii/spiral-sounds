import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export async function getDBConnection() {
  // Use the /tmp directory for the database file on Vercel
  const dbPath = path.join('/tmp', 'database.db')

  return open({
    filename: dbPath,
    driver: sqlite3.Database
  })
}