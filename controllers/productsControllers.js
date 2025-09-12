import { getDBConnection } from '../db/db.js'

export async function getGenres(req, res) {

  try {

    const db = await getDBConnection()

    const genreRows = await db.all('SELECT DISTINCT genre FROM products')
    const genres = genreRows.map(row => row.genre)
    res.json(genres)


  } catch (err) {

    res.status(500).json({error: 'Failed to fetch genres', details: err.message})

  }

}

export async function getProducts(req, res) {

  try {

    const db = await getDBConnection()

    let query='SELECT * FROM products'

    const productsAll=await db.all(query)
    
    res.json(productsAll)

/*
Challenge:
1. Write logic in getProducts() so all products display on page load.
	 
   As we will need to modify it in the next challenge, store the SQL query in a let and pass it into the all() method.
*/



  } catch (err) {

    res.status(500).json({error: 'Failed to fetch products', details: err.message})

  }

}