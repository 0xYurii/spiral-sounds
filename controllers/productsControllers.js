import { getDBConnection } from '../db/db.js'

export async function getGenres(req, res) {

  try {

    const db = await getDBConnection()

    const genreRows = await db.all('SELECT DISTINCT genre FROM products')
    const genres = genreRows.map(row => row.genre)
    res.json(genres)

/*
Challenge:

1. Get all distinct genres (no repeats) from the products table.

  - Our front end code is expecting an array of genres as strings, but you will likely get an array of objects from the database. Find a solution to that!

2. Serve the array of genres and open up the mini browser to check the dropdown is populated.

hint.md for help  
*/  

  } catch (err) {

    res.status(500).json({error: 'Failed to fetch genres', details: err.message})

  }

}

export async function getProducts() {

  console.log('products')

}