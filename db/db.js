import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { promises as fs } from 'fs'

// A singleton promise to ensure we only copy the database once
let dbCopyPromise = null

async function getDBConnection() {
  const dbPath = path.join('/tmp', 'database.db')
  const sourceDbPath = path.join(process.cwd(), 'database.db')

  if (!dbCopyPromise) {
    dbCopyPromise = fs.copyFile(sourceDbPath, dbPath)
      .then(() => console.log('Database copied to /tmp'))
      .catch((err) => {
        console.error('Error copying database:', err)
        // If copying fails, we need to reset the promise to allow retries
        dbCopyPromise = null 
        // Re-throw the error to fail the connection attempt
        throw err 
      })
  }
  
  // Wait for the copy operation to complete if it's in progress
  await dbCopyPromise

  // Open the database from the /tmp directory
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  })
}

export { getDBConnection }