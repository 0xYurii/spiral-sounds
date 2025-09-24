import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function createTable() {


      const dbPath = path.join('database.db')
      const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
      }) 
 
      await db.exec(`
            CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
      `)

      await db.close()
      console.log('table created')
}

createTable() 