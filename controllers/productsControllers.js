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

    const params=[]
    const {genre}=req.query

    if(genre){
      query+=' WHERE genre = ?'
      params.push(genre)

      const products=await db.all(query,params)
      res.json(products)
    }else{
      const products=await db.all(query)
      res.json(products)
    }

    
    
    

/*
Challenge:
1. Detect if a query string ‘genre’ is used. 
   If it is, retrieve only products with that genre from the database and serve them. 
   If not, all products should be served.

hint.md for help

Example incoming query: '?genre=rock'
*/


  } catch (err) {

    res.status(500).json({error: 'Failed to fetch products', details: err.message})

  }

}