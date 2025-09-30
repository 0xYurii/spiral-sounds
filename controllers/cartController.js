import { getDBConnection } from '../db/db.js'

export async function addToCart(req, res) {
 const db = await getDBConnection()

 const productId = parseInt(req.body.productId, 10)

 if (isNaN(productId)) {
  return res.status(400).json({ error: 'Invalid product ID'})
 }

 const userId = req.session.userId

 const existing = await db.get('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId])

 if (existing) {
  await db.run('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?', [existing.id])
 } else {
  await db.run('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)', [userId, productId])
 }

 res.json({ message: 'Added to cart' })

}

export async function getCartCount(req, res) {
  const db = await getDBConnection()

  const result = await db.get(`SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?`, [req.session.userId])

  res.json({ totalItems: result.totalItems || 0 })
}  


export async function getAll(req, res) {

// Don't touch this code!
  if (!req.session.userId) {
    return res.json({err: 'not logged in'})
  }

  const db = await getDBConnection()
  const items=await db.all('SELECT CI.id AS cartItemId,CI.quantity,P.title,P.artist,P.price FROM cart_items CI JOIN products P ON CI.product_id=P.id WHERE user_id = ?',[req.session.userId])
  res.json({ items: items })



/*
Challenge: 

1. When a logged-in user clicks the cart icon, they will be redirected to the cart.html page. To render the user's cart, the frontend needs to get an array of objects similar to the example below when it makes a GET request to the /api/cart endpoint. Important: this array should be sent in a JSON object with the key 'items'.

[
  {
    cartItemId: 4,
    quantity: 2,
    title: 'Selling Dogma',
    artist: 'The Clouds',
    price: 44.99
  },
  {
    cartItemId: 5,
    quantity: 1,
    title: 'Midnight Parallels',
    artist: 'Neon Grove',
    price: 40.99
  }
]

The frontend JS has been done for you.

Ignore frontend console errors for now!
 
For testing, log in with:
Username: test
Password: test

Then click the cart icon to go to the cart page. You should see the user’s items.

Loads of help in hint.md
*/
} 
