import {getDBConnection} from './db/db.js'

async function viewAllProducts() {
  const db = await getDBConnection()

  try { 
    const products = await db.all('SELECT * FROM products')
    
    // Neater table display
    const displayItems = products.map(({ id, title, artist, year, stock }) => {
      return { id, title, artist, year, stock }
    })
    console.table(displayItems)
  } catch (err) {
    console.error('Error fetching products:', err.message)
  } finally {
    await db.close()
  }
}

viewAllProducts()