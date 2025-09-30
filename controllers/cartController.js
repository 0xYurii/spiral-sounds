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
  const db = await getDBConnection();
  const result = await db.get('SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?', [req.session.userId])
  res.json({ totalItems: result?.totalItems || 0 })
/*
Challenge:

1. Write code to ensure that when a logged-in user clicks 'Add to Cart', their current cart count is shown in the header with a cart icon. The frontend has been done for you. All the backend need do is provide the following JSON on the /api/cart/cart-count endpoint: 


Ignore frontend console errors for now!
 
For testing, log in with:
Username: test
Password: test

Loads of help in hint.md
*/

  

}  
