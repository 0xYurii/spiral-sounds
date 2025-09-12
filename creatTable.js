
import {getDBConnection} from './db/db.js'

async function createTable() {

      const db = await getDBConnection()

      await db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  title TEXT NOT NULL, 
                  artist TEXT NOT NULL,
                  price REAL NOT NULL,
                  image TEXT NOT NULL,
                  year INTEGER,
                  genre TEXT,
                  stock INTEGER 
            )
      
      `)

      await db.close()
      console.log('table created')
}

createTable()